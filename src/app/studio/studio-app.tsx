"use client";

import { useEffect, useRef, useState } from "react";
import {
  ANGLES,
  CAMERAS,
  CAPTION_STYLES,
  CONCEPTS,
  FORMATS,
  FRAMES,
  GRADES,
  MOVEMENTS,
  TRANSITIONS,
  findById,
  type CameraSettings,
  type Concept,
  type Grade,
  type HudType,
} from "@/lib/studio/presets";
import {
  defaultProject,
  locate,
  renderFrame,
  syncVideos,
  totalDuration,
  type Guides,
  type MediaItem,
  type Project,
  type Shot,
} from "@/lib/studio/renderer";
import { createDemoMedia } from "@/lib/studio/demo";

type Tab = "concept" | "color" | "camera" | "frame";
type Music = { url: string; name: string };
type ExportResult = { url: string; ext: string; size: number };

const uid = () => Math.random().toString(36).slice(2, 10);
const CLOSE_ANGLES = new Set(["mcu", "cu", "ecu", "ots"]);

function pickMedia(pool: MediaItem[], i: number, angle: string) {
  if (!pool.length) return null;
  const allDemo = pool.every((m) => m.kind === "demo");
  if (allDemo) {
    const portrait = pool.find((m) => m.id === "demo-portrait");
    const wide = pool.filter((m) => m.id !== "demo-portrait");
    if (CLOSE_ANGLES.has(angle) && portrait) return portrait;
    return wide[i % wide.length] ?? pool[0];
  }
  return pool[i % pool.length];
}

function applyConcept(project: Project, concept: Concept, media: MediaItem[], withShots: boolean): Project {
  const grade = findById(GRADES, concept.grade);
  const camera = findById(CAMERAS, concept.camera);
  const next: Project = {
    ...project,
    format: concept.format,
    frame: concept.frame,
    gradeId: grade.id,
    grade: { ...grade.grade },
    cameraId: camera.id,
    camera: { ...camera.settings },
    captionStyle: concept.caption,
  };
  if (!withShots) return next;
  const own = media.filter((m) => m.kind !== "demo");
  const pool = own.length ? own : media;
  next.shots = concept.shots.map((tpl, i) => {
    const item = pickMedia(pool, i, tpl.angle);
    return {
      id: uid(),
      mediaId: item?.id ?? null,
      angle: tpl.angle,
      movement: tpl.movement,
      duration: tpl.duration,
      transition: i === 0 ? "cut" : tpl.transition,
      caption: tpl.caption ?? "",
      focusX: item?.focusX ?? 0.5,
      focusY: item?.focusY ?? 0.5,
      intensity: tpl.intensity ?? 1,
    };
  });
  return next;
}

function pickMimeType() {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = [
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
}

const fmtTime = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;

function downloadBlob(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// ---------------------------------------------------------------------------

export default function StudioApp() {
  const [initial] = useState(() => {
    const demo = createDemoMedia();
    return { demo, project: applyConcept(defaultProject(), CONCEPTS[0], demo, true) };
  });
  const [media, setMedia] = useState<MediaItem[]>(initial.demo);
  const [project, setProject] = useState<Project>(initial.project);
  const [selectedId, setSelectedId] = useState<string | null>(initial.project.shots[0]?.id ?? null);
  const [conceptId, setConceptId] = useState<string>(CONCEPTS[0].id);
  const [tab, setTab] = useState<Tab>("concept");
  const [guides, setGuides] = useState<Guides>({ thirds: true, center: false, safe: false, info: true });
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [time, setTime] = useState(0);
  const [music, setMusic] = useState<Music | null>(null);
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef(project);
  const mediaMapRef = useRef(new Map<string, MediaItem>());
  const guidesRef = useRef(guides);
  const playingRef = useRef(playing);
  const loopRef = useRef(loop);
  const timeRef = useRef(0);
  const dirtyRef = useRef(true);
  const exportingRef = useRef(false);
  const cancelExportRef = useRef(false);
  const fontRef = useRef("system-ui, sans-serif");
  const previewAudioRef = useRef<HTMLAudioElement>(null);

  const format = findById(FORMATS, project.format);
  const total = totalDuration(project.shots);
  const selected = project.shots.find((s) => s.id === selectedId) ?? null;
  const concept = findById(CONCEPTS, conceptId);

  useEffect(() => {
    projectRef.current = project;
    dirtyRef.current = true;
  }, [project]);
  useEffect(() => {
    mediaMapRef.current = new Map(media.map((m) => [m.id, m]));
    dirtyRef.current = true;
  }, [media]);
  useEffect(() => {
    guidesRef.current = guides;
    dirtyRef.current = true;
  }, [guides]);
  useEffect(() => {
    playingRef.current = playing;
    loopRef.current = loop;
    const audio = previewAudioRef.current;
    if (audio) {
      if (playing) {
        audio.currentTime = timeRef.current;
        void audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }
  }, [playing, loop]);
  useEffect(() => {
    if (previewAudioRef.current) previewAudioRef.current.volume = musicVolume;
  }, [musicVolume, music]);

  // Vòng lặp xem trước.
  useEffect(() => {
    if (rootRef.current) fontRef.current = getComputedStyle(rootRef.current).fontFamily || fontRef.current;
    let raf = 0;
    let last = performance.now();
    let lastUi = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (exportingRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const proj = projectRef.current;
      const fmt = findById(FORMATS, proj.format);
      if (canvas.width !== fmt.width || canvas.height !== fmt.height) {
        canvas.width = fmt.width;
        canvas.height = fmt.height;
        dirtyRef.current = true;
      }
      const dur = totalDuration(proj.shots);
      const isPlaying = playingRef.current;
      if (isPlaying) {
        timeRef.current += dt;
        if (timeRef.current >= dur) {
          if (loopRef.current && dur > 0) {
            timeRef.current = 0;
            if (previewAudioRef.current) previewAudioRef.current.currentTime = 0;
          } else {
            timeRef.current = dur;
            playingRef.current = false;
            setPlaying(false);
          }
        }
        if (now - lastUi > 80) {
          lastUi = now;
          setTime(timeRef.current);
        }
      } else if (timeRef.current > dur) {
        timeRef.current = dur;
        setTime(dur);
        dirtyRef.current = true;
      }
      syncVideos(proj, timeRef.current, mediaMapRef.current, isPlaying);
      if (!isPlaying && !dirtyRef.current) return;
      dirtyRef.current = false;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      renderFrame(ctx, proj, timeRef.current, mediaMapRef.current, {
        guides: guidesRef.current,
        fontFamily: fontRef.current,
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phím tắt: Space để phát / dừng.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (exportingRef.current) return;
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- Thao tác dự án ----

  const seek = (t: number) => {
    timeRef.current = Math.max(0, Math.min(t, totalDuration(projectRef.current.shots)));
    setTime(timeRef.current);
    if (previewAudioRef.current) previewAudioRef.current.currentTime = timeRef.current;
    dirtyRef.current = true;
  };

  const shotStart = (id: string) => {
    let start = 0;
    for (const s of project.shots) {
      if (s.id === id) return start;
      start += s.duration;
    }
    return 0;
  };

  const selectShot = (id: string) => {
    setSelectedId(id);
    const shot = project.shots.find((s) => s.id === id);
    if (shot) seek(shotStart(id) + Math.min(shot.duration * 0.5, 1));
  };

  const updateProject = (patch: Partial<Project>) => setProject((p) => ({ ...p, ...patch }));
  const updateGrade = (patch: Partial<Grade>) => setProject((p) => ({ ...p, grade: { ...p.grade, ...patch } }));
  const updateCamera = (patch: Partial<CameraSettings>) => setProject((p) => ({ ...p, camera: { ...p.camera, ...patch } }));
  const updateShot = (id: string, patch: Partial<Shot>) =>
    setProject((p) => ({ ...p, shots: p.shots.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));

  const addShot = () => {
    const base = selected;
    const item = (base?.mediaId && media.find((m) => m.id === base.mediaId)) || media[0];
    const shot: Shot = {
      id: uid(),
      mediaId: item?.id ?? null,
      angle: "ms",
      movement: "push",
      duration: 2.5,
      transition: project.shots.length ? "fade" : "cut",
      caption: "",
      focusX: base?.focusX ?? item?.focusX ?? 0.5,
      focusY: base?.focusY ?? item?.focusY ?? 0.5,
      intensity: 1,
    };
    setProject((p) => {
      const idx = base ? p.shots.findIndex((s) => s.id === base.id) : p.shots.length - 1;
      const shots = [...p.shots];
      shots.splice(idx + 1, 0, shot);
      return { ...p, shots };
    });
    setSelectedId(shot.id);
  };

  const duplicateShot = (id: string) => {
    const copy = { ...project.shots.find((s) => s.id === id)!, id: uid() };
    setProject((p) => {
      const idx = p.shots.findIndex((s) => s.id === id);
      const shots = [...p.shots];
      shots.splice(idx + 1, 0, copy);
      return { ...p, shots };
    });
    setSelectedId(copy.id);
  };

  const removeShot = (id: string) => {
    const idx = project.shots.findIndex((s) => s.id === id);
    const rest = project.shots.filter((s) => s.id !== id);
    setProject((p) => ({ ...p, shots: p.shots.filter((s) => s.id !== id) }));
    setSelectedId(rest[Math.min(idx, rest.length - 1)]?.id ?? null);
  };

  const moveShot = (id: string, dir: -1 | 1) =>
    setProject((p) => {
      const idx = p.shots.findIndex((s) => s.id === id);
      const to = idx + dir;
      if (to < 0 || to >= p.shots.length) return p;
      const shots = [...p.shots];
      [shots[idx], shots[to]] = [shots[to], shots[idx]];
      return { ...p, shots };
    });

  const chooseConcept = (c: Concept, withShots: boolean) => {
    const next = applyConcept(project, c, media, withShots);
    setProject(next);
    setConceptId(c.id);
    if (withShots) {
      setSelectedId(next.shots[0]?.id ?? null);
      seek(0);
    }
    setNotice(withShots ? `Đã áp dụng concept “${c.name}” với ${next.shots.length} shot.` : `Đã lấy màu & máy quay của “${c.name}”.`);
  };

  // ---- Tư liệu ----

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    const added: MediaItem[] = [];
    const markDirty = () => {
      dirtyRef.current = true;
    };
    for (const file of Array.from(files)) {
      const url = URL.createObjectURL(file);
      try {
        if (file.type.startsWith("video/")) {
          const v = document.createElement("video");
          v.src = url;
          v.muted = true;
          v.playsInline = true;
          v.preload = "auto";
          await new Promise<void>((resolve, reject) => {
            v.addEventListener("loadeddata", () => resolve(), { once: true });
            v.addEventListener("error", () => reject(new Error("video")), { once: true });
          });
          v.addEventListener("seeked", markDirty);
          v.addEventListener("loadeddata", markDirty);
          const thumbCanvas = document.createElement("canvas");
          thumbCanvas.width = 320;
          thumbCanvas.height = Math.round((320 * v.videoHeight) / Math.max(1, v.videoWidth));
          thumbCanvas.getContext("2d")!.drawImage(v, 0, 0, thumbCanvas.width, thumbCanvas.height);
          added.push({ id: uid(), name: file.name, kind: "video", el: v, url, thumb: thumbCanvas.toDataURL("image/jpeg", 0.7), focusX: 0.5, focusY: 0.45 });
        } else if (file.type.startsWith("image/")) {
          const img = new Image();
          img.src = url;
          await img.decode();
          added.push({ id: uid(), name: file.name, kind: "image", el: img, url, thumb: url, focusX: 0.5, focusY: 0.45 });
        } else {
          URL.revokeObjectURL(url);
        }
      } catch {
        URL.revokeObjectURL(url);
        setNotice(`Không đọc được tệp “${file.name}”.`);
      }
    }
    if (added.length) {
      setMedia((m) => [...added, ...m]);
      setNotice(`Đã thêm ${added.length} tư liệu. Bấm “Áp dụng toàn bộ” ở một concept để dựng nhanh bằng tư liệu của bạn.`);
    }
  };

  const removeMedia = (id: string) => {
    const item = media.find((m) => m.id === id);
    if (item?.url) URL.revokeObjectURL(item.url);
    if (item?.el instanceof HTMLVideoElement) item.el.pause();
    setMedia((m) => m.filter((x) => x.id !== id));
    setProject((p) => ({ ...p, shots: p.shots.map((s) => (s.mediaId === id ? { ...s, mediaId: null } : s)) }));
  };

  const onMusic = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (music) URL.revokeObjectURL(music.url);
    setMusic({ url: URL.createObjectURL(file), name: file.name });
  };

  // ---- Xuất ----

  const snapshot = () => {
    const c = document.createElement("canvas");
    c.width = format.width;
    c.height = format.height;
    const ctx = c.getContext("2d")!;
    renderFrame(ctx, project, timeRef.current, mediaMapRef.current, { fontFamily: fontRef.current });
    c.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      downloadBlob(url, `khung-hinh-${Date.now()}.png`);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, "image/png");
  };

  const exportVideo = async () => {
    if (!project.shots.length) return;
    const mime = pickMimeType();
    const probe = document.createElement("canvas");
    if (mime === null || typeof probe.captureStream !== "function") {
      setNotice("Trình duyệt này chưa hỗ trợ quay video từ canvas. Hãy dùng Chrome, Edge hoặc Firefox bản mới.");
      return;
    }
    setPlaying(false);
    playingRef.current = false;
    previewAudioRef.current?.pause();
    exportingRef.current = true;
    cancelExportRef.current = false;
    setExportProgress(0);
    if (exportResult) {
      URL.revokeObjectURL(exportResult.url);
      setExportResult(null);
    }

    const proj = projectRef.current;
    const mediaMap = mediaMapRef.current;
    const fmt = findById(FORMATS, proj.format);
    const duration = totalDuration(proj.shots);
    const canvas = document.createElement("canvas");
    canvas.width = fmt.width;
    canvas.height = fmt.height;
    const ctx = canvas.getContext("2d")!;
    renderFrame(ctx, proj, 0, mediaMap, { fontFamily: fontRef.current });

    const stream = canvas.captureStream(30);
    let audioCtx: AudioContext | null = null;
    let audioEl: HTMLAudioElement | null = null;
    let gain: GainNode | null = null;
    if (music) {
      audioEl = new Audio(music.url);
      audioCtx = new AudioContext();
      const src = audioCtx.createMediaElementSource(audioEl);
      gain = audioCtx.createGain();
      gain.gain.value = musicVolume;
      const dest = audioCtx.createMediaStreamDestination();
      src.connect(gain);
      gain.connect(dest);
      gain.connect(audioCtx.destination);
      dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t));
      const fadeAt = Math.max(0, duration - 1);
      gain.gain.setValueAtTime(musicVolume, audioCtx.currentTime + fadeAt);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    }

    const recorder = new MediaRecorder(stream, {
      ...(mime ? { mimeType: mime } : {}),
      videoBitsPerSecond: 8_000_000,
    });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    const stopped = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    // Cho video nguồn về đúng vị trí đầu trước khi bắt đầu quay.
    syncVideos(proj, 0, mediaMap, false);
    await new Promise((r) => setTimeout(r, 250));

    recorder.start(250);
    if (audioEl) void audioEl.play().catch(() => {});
    const preview = canvasRef.current?.getContext("2d") ?? null;
    const t0 = performance.now();
    let lastUi = 0;

    await new Promise<void>((resolve) => {
      const step = (now: number) => {
        const t = (now - t0) / 1000;
        if (cancelExportRef.current || t >= duration) {
          renderFrame(ctx, proj, Math.min(t, duration - 0.001), mediaMap, { fontFamily: fontRef.current });
          resolve();
          return;
        }
        syncVideos(proj, t, mediaMap, true);
        renderFrame(ctx, proj, t, mediaMap, { fontFamily: fontRef.current });
        if (preview) {
          if (preview.canvas.width !== canvas.width || preview.canvas.height !== canvas.height) {
            preview.canvas.width = canvas.width;
            preview.canvas.height = canvas.height;
          }
          preview.drawImage(canvas, 0, 0);
        }
        if (now - lastUi > 120) {
          lastUi = now;
          setExportProgress(t / duration);
        }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });

    // Giữ khung cuối thêm một nhịp để bộ mã hóa ghi đủ.
    await new Promise((r) => setTimeout(r, 200));
    recorder.stop();
    await stopped;
    audioEl?.pause();
    void audioCtx?.close();
    stream.getTracks().forEach((t) => t.stop());
    syncVideos(proj, timeRef.current, mediaMap, false);
    exportingRef.current = false;
    dirtyRef.current = true;
    setExportProgress(null);

    if (cancelExportRef.current) {
      setNotice("Đã huỷ xuất video.");
      return;
    }
    const type = (mime || recorder.mimeType || "video/webm").split(";")[0];
    const blob = new Blob(chunks, { type });
    setExportResult({ url: URL.createObjectURL(blob), ext: type.includes("mp4") ? "mp4" : "webm", size: blob.size });
  };

  // ---- Giao diện ----

  const current = project.shots.length ? locate(project.shots, time) : null;

  return (
    <div ref={rootRef} className="min-h-screen bg-[#0c0c0f] font-sans text-zinc-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-rose-600 text-sm font-bold text-black">
            CS
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">Cine Studio</h1>
            <p className="text-xs text-zinc-400">Đặt góc máy kiểu phim · chỉnh màu · chọn máy quay · xuất video ngắn</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={snapshot} className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white/40">
            Lưu khung hình
          </button>
          <button
            onClick={exportVideo}
            disabled={!project.shots.length || exportProgress !== null}
            className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-300 disabled:opacity-40"
          >
            Xuất video ({total.toFixed(1)}s)
          </button>
        </div>
      </header>

      {notice && (
        <div className="mx-4 mt-3 flex items-start justify-between gap-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-100 md:mx-6">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-amber-200/70 hover:text-amber-100" aria-label="Đóng">
            ✕
          </button>
        </div>
      )}

      <div className="grid gap-4 p-4 md:p-6 xl:grid-cols-[340px_minmax(0,1fr)_360px]">
        {/* Cột trái: concept / màu / máy / khung */}
        <aside className="order-2 rounded-2xl border border-white/10 bg-white/[0.03] xl:order-1">
          <div className="grid grid-cols-4 border-b border-white/10 text-xs">
            {(
              [
                ["concept", "Concept"],
                ["color", "Màu sắc"],
                ["camera", "Máy quay"],
                ["frame", "Khung"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`px-2 py-3 font-medium ${tab === id ? "border-b-2 border-amber-400 text-amber-300" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="max-h-[calc(100vh-11rem)] overflow-y-auto p-4">
            {tab === "concept" && (
              <ConceptPanel selectedId={conceptId} onSelect={setConceptId} concept={concept} onApply={chooseConcept} />
            )}
            {tab === "color" && (
              <ColorPanel
                gradeId={project.gradeId}
                grade={project.grade}
                onPreset={(id) => updateProject({ gradeId: id, grade: { ...findById(GRADES, id).grade } })}
                onChange={updateGrade}
              />
            )}
            {tab === "camera" && (
              <CameraPanel
                cameraId={project.cameraId}
                camera={project.camera}
                onPreset={(id) => updateProject({ cameraId: id, camera: { ...findById(CAMERAS, id).settings } })}
                onChange={updateCamera}
              />
            )}
            {tab === "frame" && (
              <FramePanel project={project} guides={guides} onProject={updateProject} onGuides={setGuides} />
            )}
          </div>
        </aside>

        {/* Giữa: màn hình xem trước + timeline */}
        <section className="order-1 flex min-w-0 flex-col gap-3 xl:order-2">
          <div className="relative flex h-[46vh] min-h-[280px] md:h-[58vh] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
            <canvas
              ref={canvasRef}
              width={format.width}
              height={format.height}
              className="h-auto max-h-full w-auto max-w-full"
            />
            {exportProgress !== null && (
              <div className="absolute inset-x-0 bottom-0 bg-black/70 p-4 backdrop-blur">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>
                    <span className="mr-2 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                    Đang quay video… {Math.round(exportProgress * 100)}% — giữ tab này mở
                  </span>
                  <button onClick={() => (cancelExportRef.current = true)} className="text-zinc-300 hover:text-white">
                    Huỷ
                  </button>
                </div>
                <div className="h-1.5 overflow-hidden rounded bg-white/15">
                  <div className="h-full bg-red-500" style={{ width: `${exportProgress * 100}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <button
              onClick={() => {
                if (!playing && time >= total - 0.05) seek(0);
                setPlaying(!playing);
              }}
              disabled={exportProgress !== null || !project.shots.length}
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-black disabled:opacity-40"
              aria-label={playing ? "Tạm dừng" : "Phát"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button onClick={() => seek(0)} className="text-sm text-zinc-400 hover:text-white" aria-label="Về đầu">
              ⏮
            </button>
            <span className="w-24 font-mono text-xs text-zinc-400">
              {fmtTime(time)} / {fmtTime(total)}
            </span>
            <input
              type="range"
              min={0}
              max={Math.max(0.01, total)}
              step={0.01}
              value={Math.min(time, total)}
              onChange={(e) => seek(Number(e.target.value))}
              className="min-w-[160px] flex-1 accent-amber-400"
            />
            <label className="flex items-center gap-1.5 text-xs text-zinc-400">
              <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} className="accent-amber-400" />
              Lặp lại
            </label>
          </div>

          <Timeline
            shots={project.shots}
            media={media}
            selectedId={selectedId}
            currentIndex={current?.index ?? -1}
            onSelect={selectShot}
            onAdd={addShot}
          />
        </section>

        {/* Cột phải: chỉnh shot + tư liệu */}
        <aside className="order-3 flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            {selected ? (
              <ShotEditor
                shot={selected}
                index={project.shots.findIndex((s) => s.id === selected.id)}
                count={project.shots.length}
                media={media}
                onChange={(patch) => updateShot(selected.id, patch)}
                onDuplicate={() => duplicateShot(selected.id)}
                onRemove={() => removeShot(selected.id)}
                onMove={(d) => moveShot(selected.id, d)}
              />
            ) : (
              <div className="text-sm text-zinc-400">
                Chưa có shot nào.{" "}
                <button onClick={addShot} className="text-amber-300 underline">
                  Thêm shot
                </button>{" "}
                hoặc chọn một concept bên trái.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Tư liệu</h3>
              <label className="cursor-pointer rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
                + Tải ảnh / video
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    void onUpload(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {media.map((m) => (
                <div key={m.id} className="group relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.thumb} alt={m.name} className="aspect-square w-full rounded-md object-cover" />
                  <span className="absolute left-1 top-1 rounded bg-black/70 px-1 text-[10px] uppercase">
                    {m.kind === "video" ? "Video" : m.kind === "demo" ? "Mẫu" : "Ảnh"}
                  </span>
                  {m.kind !== "demo" && (
                    <button
                      onClick={() => removeMedia(m.id)}
                      className="absolute right-1 top-1 hidden rounded bg-black/70 px-1.5 text-xs group-hover:block"
                      aria-label={`Xoá ${m.name}`}
                    >
                      ✕
                    </button>
                  )}
                  <p className="mt-1 truncate text-[11px] text-zinc-400">{m.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Nhạc nền</h3>
                <label className="cursor-pointer rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
                  {music ? "Đổi nhạc" : "+ Chọn nhạc"}
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      onMusic(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              {music ? (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-300">
                    <span className="truncate">♪ {music.name}</span>
                    <button
                      onClick={() => {
                        URL.revokeObjectURL(music.url);
                        setMusic(null);
                      }}
                      className="text-zinc-500 hover:text-white"
                    >
                      Bỏ
                    </button>
                  </div>
                  <Slider label="Âm lượng" value={musicVolume} min={0} max={1} step={0.05} onChange={setMusicVolume} />
                  <audio ref={previewAudioRef} src={music.url} preload="auto" />
                </div>
              ) : (
                <p className="mt-2 text-xs text-zinc-500">
                  Gợi ý cho concept này: {concept.music}. Nhạc sẽ tự nhỏ dần ở giây cuối khi xuất.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {exportResult && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141418] p-5">
            <h2 className="text-lg font-semibold">Video đã sẵn sàng 🎬</h2>
            <video src={exportResult.url} controls playsInline className="mt-3 max-h-[60vh] w-full rounded-lg bg-black" />
            <p className="mt-2 text-xs text-zinc-400">
              Định dạng {exportResult.ext.toUpperCase()} · {(exportResult.size / 1024 / 1024).toFixed(1)} MB
              {exportResult.ext === "webm" && " — nếu nền tảng không nhận WebM, hãy đổi sang MP4 bằng ứng dụng chuyển đổi."}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  URL.revokeObjectURL(exportResult.url);
                  setExportResult(null);
                }}
                className="rounded-full border border-white/15 px-4 py-2 text-sm"
              >
                Đóng
              </button>
              <button
                onClick={() => downloadBlob(exportResult.url, `cine-studio-${Date.now()}.${exportResult.ext}`)}
                className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black"
              >
                Tải xuống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Các khối giao diện con

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span className="font-mono text-zinc-300">
          {Number.isInteger(step) ? value : value.toFixed(2)}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-amber-400"
      />
    </label>
  );
}

function Chip({ active, onClick, children, title }: { active: boolean; onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-colors ${
        active ? "border-amber-400 bg-amber-400/15 text-amber-100" : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}

function Swatch({ colors }: { colors: [string, string, string] }) {
  return <span className="block h-8 w-full rounded-md" style={{ background: `linear-gradient(90deg, ${colors.join(", ")})` }} />;
}

function ConceptPanel({
  selectedId,
  onSelect,
  concept,
  onApply,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  concept: Concept;
  onApply: (c: Concept, withShots: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400">Chọn một concept để xem gợi ý góc máy, màu và máy quay. Áp dụng để dựng sẵn cả kịch bản shot.</p>
      <div className="grid grid-cols-2 gap-2">
        {CONCEPTS.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`rounded-xl border p-2 text-left transition-colors ${
              c.id === selectedId ? "border-amber-400 bg-amber-400/10" : "border-white/10 hover:border-white/30"
            }`}
          >
            <Swatch colors={findById(GRADES, c.grade).swatch} />
            <p className="mt-2 text-xs font-semibold leading-snug">{c.name}</p>
            <p className="mt-0.5 text-[11px] text-zinc-500">{c.tags.join(" · ")}</p>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
        <h3 className="font-semibold">{concept.name}</h3>
        <p className="mt-1 text-xs text-zinc-400">{concept.desc}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          <dt className="text-zinc-500">Màu</dt>
          <dd>{findById(GRADES, concept.grade).label}</dd>
          <dt className="text-zinc-500">Máy quay</dt>
          <dd>{findById(CAMERAS, concept.camera).label}</dd>
          <dt className="text-zinc-500">Khung</dt>
          <dd>
            {findById(FORMATS, concept.format).label} · {findById(FRAMES, concept.frame).label}
          </dd>
          <dt className="text-zinc-500">Nhạc gợi ý</dt>
          <dd>{concept.music}</dd>
        </dl>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Kịch bản shot</p>
        <ol className="mt-1 space-y-0.5 text-[11px] text-zinc-300">
          {concept.shots.map((s, i) => {
            const a = findById(ANGLES, s.angle);
            return (
              <li key={i}>
                {i + 1}. <span className="font-mono text-amber-300">{a.short}</span> {a.label} · {findById(MOVEMENTS, s.movement).label} · {s.duration}s
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Mẹo quay</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-zinc-300">
          {concept.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => onApply(concept, true)} className="rounded-full bg-amber-400 px-3 py-2 text-xs font-semibold text-black hover:bg-amber-300">
            Áp dụng toàn bộ
          </button>
          <button onClick={() => onApply(concept, false)} className="rounded-full border border-white/15 px-3 py-2 text-xs hover:border-white/40">
            Chỉ lấy màu & máy
          </button>
        </div>
      </div>
    </div>
  );
}

function ColorPanel({
  gradeId,
  grade,
  onPreset,
  onChange,
}: {
  gradeId: string;
  grade: Grade;
  onPreset: (id: string) => void;
  onChange: (patch: Partial<Grade>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {GRADES.map((p) => (
          <Chip key={p.id} active={p.id === gradeId} onClick={() => onPreset(p.id)} title={p.desc}>
            <Swatch colors={p.swatch} />
            <span className="mt-1.5 block font-medium">{p.label}</span>
            <span className="block text-[10px] text-zinc-500">{p.desc}</span>
          </Chip>
        ))}
      </div>
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Chỉnh tay</h3>
          <button onClick={() => onPreset(gradeId)} className="text-xs text-zinc-400 hover:text-white">
            Đặt lại
          </button>
        </div>
        <Slider label="Độ sáng" value={grade.brightness} min={0.5} max={1.5} step={0.01} onChange={(v) => onChange({ brightness: v })} />
        <Slider label="Tương phản" value={grade.contrast} min={0.5} max={1.8} step={0.01} onChange={(v) => onChange({ contrast: v })} />
        <Slider label="Độ bão hòa" value={grade.saturation} min={0} max={2} step={0.01} onChange={(v) => onChange({ saturation: v })} />
        <Slider label="Nhiệt độ màu (lạnh ↔ ấm)" value={grade.temperature} min={-1} max={1} step={0.01} onChange={(v) => onChange({ temperature: v })} />
        <Slider label="Tint (xanh lá ↔ hồng)" value={grade.tint} min={-1} max={1} step={0.01} onChange={(v) => onChange({ tint: v })} />
        <Slider label="Xoay màu" value={grade.hue} min={-180} max={180} step={1} suffix="°" onChange={(v) => onChange({ hue: v })} />
        <Slider label="Sepia" value={grade.sepia} min={0} max={1} step={0.01} onChange={(v) => onChange({ sepia: v })} />
        <Slider label="Nâng nền đen (phim bạc màu)" value={grade.fade} min={0} max={0.5} step={0.01} onChange={(v) => onChange({ fade: v })} />
        <Slider label="Tách tông" value={grade.split} min={0} max={1} step={0.01} onChange={(v) => onChange({ split: v })} />
        <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
          <label className="flex items-center gap-2">
            <input type="color" value={grade.shadows} onChange={(e) => onChange({ shadows: e.target.value })} className="h-7 w-9 cursor-pointer rounded bg-transparent" />
            Màu vùng tối
          </label>
          <label className="flex items-center gap-2">
            <input type="color" value={grade.highlights} onChange={(e) => onChange({ highlights: e.target.value })} className="h-7 w-9 cursor-pointer rounded bg-transparent" />
            Màu vùng sáng
          </label>
        </div>
      </div>
    </div>
  );
}

const HUD_OPTIONS: { id: HudType; label: string }[] = [
  { id: "none", label: "Không" },
  { id: "cinema", label: "Monitor phim trường" },
  { id: "camcorder", label: "Camcorder REC" },
  { id: "disposable", label: "Dấu ngày cam" },
  { id: "cctv", label: "Camera an ninh" },
  { id: "phone", label: "Điện thoại" },
];

function CameraPanel({
  cameraId,
  camera,
  onPreset,
  onChange,
}: {
  cameraId: string;
  camera: CameraSettings;
  onPreset: (id: string) => void;
  onChange: (patch: Partial<CameraSettings>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {CAMERAS.map((c) => (
          <button
            key={c.id}
            onClick={() => onPreset(c.id)}
            className={`block w-full rounded-xl border p-3 text-left transition-colors ${
              c.id === cameraId ? "border-amber-400 bg-amber-400/10" : "border-white/10 hover:border-white/30"
            }`}
          >
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold">{c.label}</span>
              <span className="font-mono text-[10px] text-amber-300/80">{c.spec}</span>
            </span>
            <span className="mt-1 block text-[11px] text-zinc-400">{c.desc}</span>
          </button>
        ))}
      </div>
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3">
        <h3 className="text-sm font-semibold">Ống kính & chất liệu</h3>
        <Slider label="Hạt phim" value={camera.grain} min={0} max={1} step={0.01} onChange={(v) => onChange({ grain: v })} />
        <Slider label="Tối góc (vignette)" value={camera.vignette} min={0} max={1} step={0.01} onChange={(v) => onChange({ vignette: v })} />
        <Slider label="Độ mềm ống kính" value={camera.softness} min={0} max={2} step={0.05} onChange={(v) => onChange({ softness: v })} />
        <Slider label="Rung khung phim" value={camera.weave} min={0} max={2} step={0.05} onChange={(v) => onChange({ weave: v })} />
        <Slider label="Chập chờn sáng" value={camera.flicker} min={0} max={1} step={0.01} onChange={(v) => onChange({ flicker: v })} />
        <Slider label="Lóa sáng (light leak)" value={camera.leak} min={0} max={1} step={0.01} onChange={(v) => onChange({ leak: v })} />
        <Slider label="Sọc quét" value={camera.scanlines} min={0} max={1} step={0.01} onChange={(v) => onChange({ scanlines: v })} />
        <Slider label="Nhòe màu băng từ" value={camera.bleed} min={0} max={1} step={0.01} onChange={(v) => onChange({ bleed: v })} />
        <div>
          <p className="mb-1 text-xs text-zinc-400">Tốc độ khung hình</p>
          <div className="grid grid-cols-4 gap-1.5">
            {[12, 18, 24, 30].map((f) => (
              <Chip key={f} active={camera.fps === f} onClick={() => onChange({ fps: f })}>
                <span className="block text-center">{f} fps</span>
              </Chip>
            ))}
          </div>
        </div>
        <label className="block text-xs text-zinc-400">
          Giao diện máy
          <select
            value={camera.hud}
            onChange={(e) => onChange({ hud: e.target.value as HudType })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black px-2 py-2 text-zinc-100"
          >
            {HUD_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {camera.hud !== "none" && (
          <label className="block text-xs text-zinc-400">
            Chữ trên giao diện (ngày, tên máy…)
            <input
              value={camera.hudText}
              onChange={(e) => onChange({ hudText: e.target.value })}
              placeholder="Để trống dùng mặc định"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black px-2 py-2 text-zinc-100"
            />
          </label>
        )}
        <div className="flex flex-wrap gap-4 text-xs text-zinc-300">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={camera.super8Gate} onChange={(e) => onChange({ super8Gate: e.target.checked })} className="accent-amber-400" />
            Khung bo góc Super 8
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={camera.dust} onChange={(e) => onChange({ dust: e.target.checked })} className="accent-amber-400" />
            Bụi & xước phim
          </label>
        </div>
      </div>
    </div>
  );
}

function FramePanel({
  project,
  guides,
  onProject,
  onGuides,
}: {
  project: Project;
  guides: Guides;
  onProject: (patch: Partial<Project>) => void;
  onGuides: (g: Guides) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Khổ video</h3>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((f) => (
            <Chip key={f.id} active={project.format === f.id} onClick={() => onProject({ format: f.id })}>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block border border-current"
                  style={{ width: 22 * Math.min(1, f.width / f.height), height: 22 * Math.min(1, f.height / f.width) }}
                />
                <span>
                  <span className="block font-semibold">{f.label}</span>
                  <span className="block text-[10px] text-zinc-500">{f.hint}</span>
                </span>
              </span>
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Khung điện ảnh</h3>
        <div className="grid grid-cols-2 gap-2">
          {FRAMES.map((f) => (
            <Chip key={f.id} active={project.frame === f.id} onClick={() => onProject({ frame: f.id })}>
              <span className="block font-semibold">{f.label}</span>
              <span className="block text-[10px] text-zinc-500">{f.hint}</span>
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Kiểu chữ chú thích</h3>
        <select
          value={project.captionStyle}
          onChange={(e) => onProject({ captionStyle: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-black px-2 py-2 text-sm"
        >
          {CAPTION_STYLES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Đường gióng (chỉ hiện khi xem trước)</h3>
        <div className="space-y-2 text-xs text-zinc-300">
          {(
            [
              ["thirds", "Lưới 1/3 (rule of thirds)"],
              ["center", "Dấu tâm khung"],
              ["safe", "Vùng an toàn chữ / hành động"],
              ["info", "Nhãn thông tin shot"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={guides[key]}
                onChange={(e) => onGuides({ ...guides, [key]: e.target.checked })}
                className="accent-amber-400"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function Timeline({
  shots,
  media,
  selectedId,
  currentIndex,
  onSelect,
  onAdd,
}: {
  shots: Shot[];
  media: MediaItem[];
  selectedId: string | null;
  currentIndex: number;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">Phân cảnh · {shots.length} shot</h3>
        <button onClick={onAdd} className="rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
          + Thêm shot
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {shots.map((s, i) => {
          const m = media.find((x) => x.id === s.mediaId);
          const a = findById(ANGLES, s.angle);
          return (
            <div key={s.id} className="flex shrink-0 items-center gap-2">
              {i > 0 && (
                <span className="text-[10px] text-zinc-500" title={findById(TRANSITIONS, s.transition).label}>
                  {s.transition === "cut" ? "│" : "⟩"}
                </span>
              )}
              <button
                onClick={() => onSelect(s.id)}
                className={`relative w-28 overflow-hidden rounded-lg border text-left ${
                  s.id === selectedId ? "border-amber-400" : i === currentIndex ? "border-white/40" : "border-white/10"
                }`}
              >
                {m ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.thumb} alt="" className="h-16 w-full object-cover" />
                ) : (
                  <span className="grid h-16 w-full place-items-center bg-black text-[10px] text-zinc-500">Màn đen</span>
                )}
                <span className="absolute left-1 top-1 rounded bg-black/75 px-1 font-mono text-[10px] text-amber-300">{a.short}</span>
                <span className="absolute right-1 top-1 rounded bg-black/75 px-1 font-mono text-[10px]">{s.duration}s</span>
                <span className="block truncate px-1.5 py-1 text-[11px]">
                  {i + 1}. {findById(MOVEMENTS, s.movement).label}
                </span>
                {i === currentIndex && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShotEditor({
  shot,
  index,
  count,
  media,
  onChange,
  onDuplicate,
  onRemove,
  onMove,
}: {
  shot: Shot;
  index: number;
  count: number;
  media: MediaItem[];
  onChange: (patch: Partial<Shot>) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const item = media.find((m) => m.id === shot.mediaId);
  const angle = findById(ANGLES, shot.angle);
  const movement = findById(MOVEMENTS, shot.movement);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Shot {index + 1}
          <span className="text-zinc-500">/{count}</span>
        </h3>
        <div className="flex gap-1 text-xs">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="rounded px-2 py-1 hover:bg-white/10 disabled:opacity-30" aria-label="Lên trước">
            ←
          </button>
          <button onClick={() => onMove(1)} disabled={index === count - 1} className="rounded px-2 py-1 hover:bg-white/10 disabled:opacity-30" aria-label="Ra sau">
            →
          </button>
          <button onClick={onDuplicate} className="rounded px-2 py-1 hover:bg-white/10">
            Nhân bản
          </button>
          <button onClick={onRemove} className="rounded px-2 py-1 text-rose-300 hover:bg-rose-500/20">
            Xoá
          </button>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs text-zinc-400">Hình nguồn</p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => onChange({ mediaId: null })}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-md border bg-black text-[9px] ${shot.mediaId === null ? "border-amber-400" : "border-white/10"}`}
          >
            Màn đen
          </button>
          {media.map((m) => (
            <button
              key={m.id}
              onClick={() => onChange({ mediaId: m.id, focusX: m.focusX, focusY: m.focusY })}
              className={`h-12 w-12 shrink-0 overflow-hidden rounded-md border ${shot.mediaId === m.id ? "border-amber-400" : "border-white/10"}`}
              title={m.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.thumb} alt={m.name} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {item && (
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Điểm lấy nét — bấm vào chủ thể để máy hướng về đó</p>
          <div
            className="relative cursor-crosshair overflow-hidden rounded-lg"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              onChange({
                focusX: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
                focusY: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
              });
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.thumb} alt="" className="block max-h-44 w-full object-contain" draggable={false} />
            <span
              className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-400 shadow-[0_0_0_2px_rgba(0,0,0,0.5)]"
              style={{ left: `${shot.focusX * 100}%`, top: `${shot.focusY * 100}%` }}
            />
          </div>
        </div>
      )}

      <div>
        <p className="mb-1.5 text-xs text-zinc-400">Góc máy</p>
        <div className="grid grid-cols-3 gap-1.5">
          {ANGLES.map((a) => (
            <Chip key={a.id} active={shot.angle === a.id} onClick={() => onChange({ angle: a.id })} title={a.desc}>
              <span className="block font-mono text-[10px] text-amber-300/90">{a.short}</span>
              <span className="block leading-tight">{a.label}</span>
            </Chip>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-zinc-500">{angle.desc}</p>
      </div>

      <div>
        <p className="mb-1.5 text-xs text-zinc-400">Chuyển động máy</p>
        <div className="grid grid-cols-2 gap-1.5">
          {MOVEMENTS.map((m) => (
            <Chip key={m.id} active={shot.movement === m.id} onClick={() => onChange({ movement: m.id })} title={m.desc}>
              {m.label}
            </Chip>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-zinc-500">{movement.desc}</p>
      </div>

      <Slider label="Thời lượng" value={shot.duration} min={0.8} max={8} step={0.1} suffix="s" onChange={(v) => onChange({ duration: v })} />
      <Slider label="Cường độ chuyển động" value={shot.intensity} min={0} max={2} step={0.05} onChange={(v) => onChange({ intensity: v })} />

      {index > 0 && (
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Chuyển cảnh vào shot này</p>
          <div className="grid grid-cols-3 gap-1.5">
            {TRANSITIONS.map((t) => (
              <Chip key={t.id} active={shot.transition === t.id} onClick={() => onChange({ transition: t.id })}>
                {t.label}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <label className="block text-xs text-zinc-400">
        Chữ trên màn hình
        <textarea
          value={shot.caption}
          onChange={(e) => onChange({ caption: e.target.value })}
          rows={2}
          placeholder="VD: MỘT NGÀY KHÔNG NHƯ MỌI NGÀY"
          className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-black px-2 py-2 text-sm text-zinc-100"
        />
      </label>
    </div>
  );
}
