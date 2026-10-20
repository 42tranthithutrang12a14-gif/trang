// Bộ dựng hình cho Cine Studio: vẽ một khung hình tại thời điểm bất kỳ của dự án
// lên canvas 2D. Dùng chung cho cả xem trước lẫn xuất video.

import {
  ANGLES,
  CAMERAS,
  FORMATS,
  FRAMES,
  GRADES,
  MOVEMENTS,
  findById,
  type CameraSettings,
  type Grade,
} from "./presets";

export type MediaItem = {
  id: string;
  name: string;
  kind: "image" | "video" | "demo";
  el: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
  url?: string;
  thumb: string;
  focusX: number;
  focusY: number;
};

export type Shot = {
  id: string;
  mediaId: string | null;
  angle: string;
  movement: string;
  duration: number;
  transition: string;
  caption: string;
  focusX: number;
  focusY: number;
  intensity: number;
};

export type Project = {
  format: string;
  frame: string;
  gradeId: string;
  grade: Grade;
  cameraId: string;
  camera: CameraSettings;
  captionStyle: string;
  shots: Shot[];
};

export type Guides = {
  thirds: boolean;
  center: boolean;
  safe: boolean;
  info: boolean;
};

export type RenderOptions = {
  guides?: Guides;
  fontFamily?: string;
};

export const TRANSITION_TIME = 0.5;

export const defaultProject = (): Project => ({
  format: FORMATS[0].id,
  frame: FRAMES[0].id,
  gradeId: GRADES[0].id,
  grade: { ...GRADES[0].grade },
  cameraId: CAMERAS[0].id,
  camera: { ...CAMERAS[0].settings },
  captionStyle: "cinema",
  shots: [],
});

export function totalDuration(shots: Shot[]) {
  return shots.reduce((sum, s) => sum + s.duration, 0);
}

export function locate(shots: Shot[], time: number) {
  let start = 0;
  for (let i = 0; i < shots.length; i++) {
    const end = start + shots[i].duration;
    if (time < end || i === shots.length - 1) {
      return { index: i, local: Math.max(0, Math.min(time - start, shots[i].duration)), start };
    }
    start = end;
  }
  return { index: -1, local: 0, start: 0 };
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function mediaSize(el: MediaItem["el"]) {
  if (el instanceof HTMLVideoElement) return { w: el.videoWidth, h: el.videoHeight, ready: el.readyState >= 2 };
  if (el instanceof HTMLImageElement) return { w: el.naturalWidth, h: el.naturalHeight, ready: el.complete && el.naturalWidth > 0 };
  return { w: el.width, h: el.height, ready: true };
}

// ---- Bộ đệm canvas phụ (tạo một lần, dùng lại theo kích thước) ----

const buffers = new Map<string, HTMLCanvasElement>();
function buffer(name: string, w: number, h: number) {
  let c = buffers.get(name);
  if (!c) {
    c = document.createElement("canvas");
    buffers.set(name, c);
  }
  if (c.width !== w || c.height !== h) {
    c.width = w;
    c.height = h;
  }
  return c;
}

let grainTile: HTMLCanvasElement | null = null;
function getGrainTile() {
  if (grainTile) return grainTile;
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d")!;
  const img = x.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  grainTile = c;
  return c;
}

let scanTile: HTMLCanvasElement | null = null;
function getScanTile() {
  if (scanTile) return scanTile;
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 4;
  const x = c.getContext("2d")!;
  x.fillStyle = "#000";
  x.fillRect(0, 0, 4, 1);
  x.fillRect(0, 1, 4, 1);
  scanTile = c;
  return c;
}

// ---- Vẽ một shot (ảnh/video + góc máy + chuyển động) vào layer ----

type ShotExtra = { zoom: number; offsetX: number; alpha: number };

function drawShot(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  shot: Shot,
  local: number,
  media: Map<string, MediaItem>,
  cam: CameraSettings,
  extra: ShotExtra,
) {
  const item = shot.mediaId ? media.get(shot.mediaId) : undefined;
  ctx.save();
  ctx.globalAlpha = extra.alpha;
  if (!item) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    return;
  }
  const { w: iw, h: ih, ready } = mediaSize(item.el);
  if (!ready || !iw || !ih) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    return;
  }

  const angle = findById(ANGLES, shot.angle);
  const mov = findById(MOVEMENTS, shot.movement);
  const t = clamp(local / Math.max(0.01, shot.duration));
  const m = mov.sample(t, shot.intensity);
  const u = Math.min(W, H) / 720;

  const shake = (m.shake + (angle.shake ?? 0)) * 9 * u;
  const sx = shake * (Math.sin(local * 7.3) + 0.5 * Math.sin(local * 13.1 + 1.3));
  const sy = shake * (Math.cos(local * 6.1) + 0.5 * Math.sin(local * 11.7 + 0.4));
  const weaveSeed = Math.floor(local * 24);
  const wx = cam.weave * 3 * u * (rnd(weaveSeed) - 0.5);
  const wy = cam.weave * 3 * u * (rnd(weaveSeed + 0.5) - 0.5);

  const deg = angle.rotate + m.rotate + (m.shake + (angle.shake ?? 0)) * 0.4 * Math.sin(local * 5.1);
  const th = (deg * Math.PI) / 180;
  const c = Math.abs(Math.cos(th));
  const s = Math.abs(Math.sin(th));
  const coverW = W * c + H * s;
  const coverH = W * s + H * c;
  const coverRot = Math.max(coverW / W, coverH / H);
  const k = angle.keystone;
  const fmin = 1 - Math.abs(k) / 2;

  const base = Math.max(W / iw, H / ih);
  const scale = (base * angle.zoom * m.zoom * extra.zoom * coverRot) / fmin;
  const dw = iw * scale;
  const dh = ih * scale;

  const tx = (angle.targetX - 0.5 + m.dx) * W;
  const ty = (angle.targetY - 0.5 + m.dy) * H;
  let x0 = tx - shot.focusX * dw;
  let y0 = ty - shot.focusY * dh;
  x0 = clamp(x0, coverW / (2 * fmin) - dw, -coverW / (2 * fmin));
  y0 = clamp(y0, coverH / 2 - dh, -coverH / 2);

  ctx.translate(W / 2 + sx + wx + extra.offsetX, H / 2 + sy + wy);
  ctx.rotate(th);
  if (k === 0) {
    ctx.drawImage(item.el, x0, y0, dw, dh);
  } else {
    // Mô phỏng phối cảnh góc thấp/cao bằng cách vẽ từng dải ngang với độ rộng khác nhau.
    // Dải mỏng (~3px) để cạnh dọc không bị răng cưa; bỏ qua dải nằm ngoài khung.
    const N = Math.ceil(dh / (3 * Math.max(1, H / 720)));
    const stripH = dh / N;
    for (let j = 0; j < N; j++) {
      const dy = y0 + j * stripH;
      if (dy + stripH < -coverH / 2 || dy > coverH / 2) continue;
      const v = clamp((dy + stripH / 2 + coverH / 2) / coverH);
      const f = 1 + k * (v - 0.5);
      ctx.drawImage(item.el, 0, (j * ih) / N, iw, ih / N, x0 * f, dy, dw * f, stripH + 1);
    }
  }
  ctx.restore();

  if (angle.overShoulder) {
    // Bờ vai mờ của nhân vật đối diện ở tiền cảnh.
    ctx.save();
    ctx.globalAlpha = extra.alpha;
    ctx.translate(W * 0.08 + extra.offsetX + sx * 1.5, H * 0.95 + sy);
    ctx.scale(W * 0.42, H * 0.62);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    grad.addColorStop(0, "rgba(8,8,10,0.97)");
    grad.addColorStop(0.62, "rgba(8,8,10,0.9)");
    grad.addColorStop(1, "rgba(8,8,10,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ---- Màu sắc ----

function gradeFilter(gr: Grade, blurPx: number) {
  const parts = [
    `brightness(${gr.brightness})`,
    `contrast(${gr.contrast})`,
    `saturate(${gr.saturation})`,
  ];
  if (gr.hue) parts.push(`hue-rotate(${gr.hue}deg)`);
  if (gr.sepia) parts.push(`sepia(${gr.sepia})`);
  if (blurPx > 0.05) parts.push(`blur(${blurPx.toFixed(2)}px)`);
  return parts.join(" ");
}

function applyColorOverlays(ctx: CanvasRenderingContext2D, W: number, H: number, gr: Grade, filterOk: boolean) {
  ctx.save();
  if (!filterOk && gr.saturation < 1) {
    ctx.globalCompositeOperation = "saturation";
    ctx.globalAlpha = clamp(1 - gr.saturation);
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, W, H);
  }
  if (gr.temperature) {
    ctx.globalCompositeOperation = "soft-light";
    ctx.globalAlpha = Math.abs(gr.temperature) * 0.6;
    ctx.fillStyle = gr.temperature > 0 ? "#ff9a3c" : "#3c8dff";
    ctx.fillRect(0, 0, W, H);
  }
  if (gr.tint) {
    ctx.globalCompositeOperation = "soft-light";
    ctx.globalAlpha = Math.abs(gr.tint) * 0.5;
    ctx.fillStyle = gr.tint > 0 ? "#ff3cc8" : "#3cff7a";
    ctx.fillRect(0, 0, W, H);
  }
  if (gr.split > 0) {
    // Screen ảnh hưởng mạnh vùng tối, multiply ảnh hưởng mạnh vùng sáng → tách tông.
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = gr.split * 0.35;
    ctx.fillStyle = gr.shadows;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = gr.split * 0.3;
    ctx.fillStyle = gr.highlights;
    ctx.fillRect(0, 0, W, H);
  }
  if (gr.fade > 0) {
    ctx.globalCompositeOperation = "lighten";
    ctx.globalAlpha = 1;
    const v = Math.round(gr.fade * 90);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
}

// ---- Hiệu ứng thân máy / ống kính ----

function applyCameraTexture(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  cam: CameraSettings,
  time: number,
  frameSeed: number,
) {
  const u = Math.min(W, H) / 720;

  if (cam.bleed > 0 || cam.scanlines > 0) {
    const scratch = buffer("scratch", W, H);
    const sctx = scratch.getContext("2d")!;
    sctx.clearRect(0, 0, W, H);
    sctx.drawImage(ctx.canvas, 0, 0);
    if (cam.bleed > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "lighten";
      ctx.globalAlpha = cam.bleed * 0.45;
      ctx.drawImage(scratch, 5 * u, 0);
      ctx.globalAlpha = cam.bleed * 0.25;
      ctx.drawImage(scratch, -3 * u, 0);
      ctx.restore();
      // Dải nhiễu "tracking" chạy dọc màn hình.
      const bandY = (((time * 0.23) % 1.4) - 0.2) * H;
      const bandH = 0.035 * H;
      if (bandY > -bandH && bandY < H) {
        const shift = 14 * u * Math.sin(time * 40);
        ctx.drawImage(scratch, 0, Math.max(0, bandY), W, bandH, shift, Math.max(0, bandY), W, bandH);
        ctx.save();
        ctx.globalAlpha = 0.25 * cam.bleed;
        ctx.fillStyle = "#fff";
        for (let i = 0; i < 6; i++) {
          ctx.fillRect(rnd(frameSeed + i) * W, bandY + rnd(frameSeed + i + 9) * bandH, 30 * u + rnd(i) * 80 * u, 1.5 * u);
        }
        ctx.restore();
      }
    }
    if (cam.scanlines > 0) {
      ctx.save();
      ctx.globalAlpha = cam.scanlines * 0.45;
      const pat = ctx.createPattern(getScanTile(), "repeat");
      if (pat) {
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.restore();
    }
  }

  if (cam.leak > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const pulse = 0.55 + 0.45 * Math.sin(time * 1.3);
    const lx = W * (0.85 + 0.15 * Math.sin(time * 0.7));
    const ly = H * (0.25 + 0.3 * Math.sin(time * 0.43));
    const r = Math.max(W, H) * 0.75;
    const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, r);
    grad.addColorStop(0, `rgba(255,140,50,${0.6 * cam.leak * pulse})`);
    grad.addColorStop(0.45, `rgba(255,60,30,${0.25 * cam.leak * pulse})`);
    grad.addColorStop(1, "rgba(255,40,20,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  if (cam.flicker > 0) {
    const f = (rnd(frameSeed * 1.7) - 0.5) * cam.flicker * 0.25;
    ctx.save();
    ctx.globalAlpha = Math.abs(f);
    ctx.fillStyle = f > 0 ? "#fff" : "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  if (cam.vignette > 0) {
    ctx.save();
    const r = Math.hypot(W, H) / 2;
    const grad = ctx.createRadialGradient(W / 2, H / 2, r * (0.75 - cam.vignette * 0.4), W / 2, H / 2, r);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, `rgba(0,0,0,${clamp(cam.vignette * 1.1)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  if (cam.grain > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = cam.grain * 0.55;
    const pat = ctx.createPattern(getGrainTile(), "repeat");
    if (pat) {
      ctx.translate(-rnd(frameSeed) * 256, -rnd(frameSeed + 3) * 256);
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, W + 256, H + 256);
    }
    ctx.restore();
  }

  if (cam.dust) {
    ctx.save();
    const count = Math.floor(rnd(frameSeed + 11) * 4);
    for (let i = 0; i < count; i++) {
      const x = rnd(frameSeed + i * 3.1) * W;
      const y = rnd(frameSeed + i * 5.7) * H;
      const light = rnd(frameSeed + i) > 0.5;
      ctx.fillStyle = light ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)";
      if (rnd(frameSeed + i * 2.3) > 0.7) {
        ctx.fillRect(x, y, 1.2 * u, (20 + rnd(i + frameSeed) * 60) * u);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, (1 + rnd(frameSeed + i * 9) * 2.5) * u, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  if (cam.super8Gate) {
    ctx.save();
    ctx.fillStyle = "#050505";
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    const inset = 14 * u;
    roundRectPath(ctx, inset, inset, W - inset * 2, H - inset * 2, 46 * u);
    ctx.fill("evenodd");
    ctx.restore();
  }
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

type Rect = { x: number; y: number; w: number; h: number };

function drawLetterbox(ctx: CanvasRenderingContext2D, W: number, H: number, ratio: number | null): Rect {
  if (!ratio) return { x: 0, y: 0, w: W, h: H };
  ctx.save();
  ctx.fillStyle = "#000";
  const a = W / H;
  let rect: Rect;
  if (ratio > a) {
    const bh = (H - W / ratio) / 2;
    ctx.fillRect(0, 0, W, bh);
    ctx.fillRect(0, H - bh, W, bh);
    rect = { x: 0, y: bh, w: W, h: H - bh * 2 };
  } else {
    const bw = (W - H * ratio) / 2;
    ctx.fillRect(0, 0, bw, H);
    ctx.fillRect(W - bw, 0, bw, H);
    rect = { x: bw, y: 0, w: W - bw * 2, h: H };
  }
  ctx.restore();
  return rect;
}

const pad2 = (n: number) => String(Math.floor(n)).padStart(2, "0");

function drawHud(ctx: CanvasRenderingContext2D, r: Rect, cam: CameraSettings, time: number, font: string) {
  if (cam.hud === "none") return;
  const u = Math.min(r.w, r.h) / 720;
  const m = 34 * u;
  const blink = Math.floor(time * 1.6) % 2 === 0;
  const mono = `"Courier New", ui-monospace, monospace`;
  ctx.save();
  ctx.textBaseline = "top";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 4 * u;

  if (cam.hud === "camcorder") {
    ctx.font = `bold ${30 * u}px ${mono}`;
    ctx.fillStyle = "#fff";
    if (blink) {
      ctx.fillStyle = "#ff2a2a";
      ctx.beginPath();
      ctx.arc(r.x + m + 10 * u, r.y + m + 14 * u, 10 * u, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#fff";
    ctx.fillText("REC", r.x + m + 28 * u, r.y + m);
    ctx.font = `bold ${24 * u}px ${mono}`;
    ctx.fillText("SP", r.x + m, r.y + m + 44 * u);
    // Pin
    const bx = r.x + r.w - m - 64 * u;
    const by = r.y + m + 2 * u;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3 * u;
    ctx.strokeRect(bx, by, 56 * u, 26 * u);
    ctx.fillRect(bx + 56 * u, by + 8 * u, 6 * u, 10 * u);
    ctx.fillRect(bx + 5 * u, by + 5 * u, 30 * u, 16 * u);
    ctx.textBaseline = "bottom";
    ctx.font = `bold ${26 * u}px ${mono}`;
    ctx.fillText(`0:${pad2(time / 60)}:${pad2(time % 60)}`, r.x + m, r.y + r.h - m);
    ctx.textAlign = "right";
    ctx.fillText(cam.hudText || "OCT 20 1998", r.x + r.w - m, r.y + r.h - m - 34 * u);
    ctx.fillText("PM 4:20", r.x + r.w - m, r.y + r.h - m);
  } else if (cam.hud === "cinema") {
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 2 * u;
    const L = 36 * u;
    const ix = r.x + m;
    const iy = r.y + m + 10 * u;
    const iw = r.w - m * 2;
    const ih = r.h - m * 2 - 20 * u;
    ctx.beginPath();
    for (const [cx, cy, dx, dy] of [
      [ix, iy, 1, 1],
      [ix + iw, iy, -1, 1],
      [ix, iy + ih, 1, -1],
      [ix + iw, iy + ih, -1, -1],
    ]) {
      ctx.moveTo(cx + dx * L, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + dy * L);
    }
    ctx.moveTo(r.x + r.w / 2 - 12 * u, r.y + r.h / 2);
    ctx.lineTo(r.x + r.w / 2 + 12 * u, r.y + r.h / 2);
    ctx.moveTo(r.x + r.w / 2, r.y + r.h / 2 - 12 * u);
    ctx.lineTo(r.x + r.w / 2, r.y + r.h / 2 + 12 * u);
    ctx.stroke();
    ctx.font = `600 ${17 * u}px ${font}`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.textAlign = "center";
    ctx.fillText(cam.hudText || "A-CAM   ISO 800   24 FPS   180°   5600K   T2.8", r.x + r.w / 2, r.y + 12 * u);
    ctx.textBaseline = "bottom";
    const frames = Math.floor((time * 24) % 24);
    ctx.font = `600 ${20 * u}px ${mono}`;
    ctx.fillText(`TC 01:00:${pad2(time)}:${pad2(frames)}`, r.x + r.w / 2, r.y + r.h - 10 * u);
    if (blink) {
      ctx.fillStyle = "#ff2a2a";
      ctx.textAlign = "left";
      ctx.fillText("● REC", r.x + m, r.y + r.h - 10 * u);
    }
  } else if (cam.hud === "disposable") {
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.font = `bold ${34 * u}px ${mono}`;
    ctx.shadowColor = "rgba(255,120,20,0.9)";
    ctx.shadowBlur = 10 * u;
    ctx.fillStyle = "#ff8c1a";
    ctx.fillText(cam.hudText || "'98 10 20", r.x + r.w - m * 1.4, r.y + r.h - m * 1.4);
  } else if (cam.hud === "cctv") {
    ctx.font = `bold ${24 * u}px ${mono}`;
    ctx.fillStyle = "#fff";
    ctx.fillText(cam.hudText || "CAM 03", r.x + m, r.y + m);
    const d = new Date(2026, 9, 20, 23, 41, 7 + Math.floor(time));
    const stamp = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
    ctx.textAlign = "right";
    ctx.fillText(stamp, r.x + r.w - m, r.y + m);
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    if (blink) {
      ctx.fillStyle = "#ff2a2a";
      ctx.fillText("● REC", r.x + m, r.y + r.h - m);
    }
  } else if (cam.hud === "phone") {
    const label = `${pad2(time / 60)}:${pad2(time % 60)}`;
    ctx.font = `600 ${22 * u}px ${font}`;
    const tw = ctx.measureText(label).width;
    const pw = tw + 30 * u;
    const ph = 36 * u;
    const px = r.x + r.w / 2 - pw / 2;
    const py = r.y + m;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#e5262b";
    ctx.beginPath();
    roundRectPath(ctx, px, py, pw, ph, ph / 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, r.x + r.w / 2, py + ph / 2 + 1 * u);
    ctx.textAlign = "right";
    ctx.font = `600 ${18 * u}px ${font}`;
    ctx.shadowBlur = 4 * u;
    ctx.fillText(cam.hudText || "4K · 30", r.x + r.w - m, py + ph / 2);
  }
  ctx.restore();
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const out: string[] = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > maxW && line) {
        out.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    out.push(line);
  }
  return out;
}

function drawCaption(
  ctx: CanvasRenderingContext2D,
  r: Rect,
  text: string,
  style: string,
  local: number,
  duration: number,
  font: string,
) {
  if (!text.trim()) return;
  const u = Math.min(r.w, r.h) / 720;
  const alpha = clamp(local / 0.45) * clamp((duration - local) / 0.3);
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const maxW = r.w * 0.84;
  let size = 34 * u;
  let y = r.y + r.h * 0.8;
  let shown = text;

  if (style === "cinema") {
    size = 34 * u;
    ctx.font = `300 ${size}px ${font}`;
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${6 * u}px`;
    ctx.fillStyle = "#f5f1e8";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 12 * u;
    y = r.y + r.h * 0.5;
  } else if (style === "subtitle") {
    size = 32 * u;
    ctx.font = `500 ${size}px ${font}`;
    ctx.fillStyle = "#ffd60a";
    ctx.strokeStyle = "rgba(0,0,0,0.85)";
    ctx.lineWidth = 6 * u;
    ctx.lineJoin = "round";
    y = r.y + r.h * 0.86;
  } else if (style === "bold") {
    size = 52 * u;
    ctx.font = `800 ${size}px ${font}`;
    shown = text.toUpperCase();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10 * u;
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowOffsetY = 6 * u;
    y = r.y + r.h * 0.68;
    const pop = 1 + 0.15 * (1 - clamp(local / 0.2));
    ctx.translate(r.x + r.w / 2, y);
    ctx.scale(pop, pop);
    ctx.translate(-(r.x + r.w / 2), -y);
  } else if (style === "mono") {
    size = 28 * u;
    ctx.font = `bold ${size}px "Courier New", ui-monospace, monospace`;
    ctx.fillStyle = "#f1f1f1";
    const chars = Math.floor(local * 22);
    shown = text.slice(0, chars);
    y = r.y + r.h * 0.84;
  } else if (style === "neon") {
    size = 46 * u;
    ctx.font = `700 ${size}px ${font}`;
    ctx.fillStyle = "#ffe9fb";
    ctx.shadowColor = "#ff2bd6";
    ctx.shadowBlur = 24 * u;
    y = r.y + r.h * 0.5;
  }

  const lines = wrapLines(ctx, shown, maxW);
  const lh = size * 1.3;
  const top = y - ((lines.length - 1) * lh) / 2;
  if (style === "mono") {
    const fullLines = wrapLines(ctx, text, maxW);
    const boxW = Math.max(...fullLines.map((l) => ctx.measureText(l).width)) + 36 * u;
    const boxH = fullLines.length * lh + 20 * u;
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(r.x + r.w / 2 - boxW / 2, top - lh / 2 - 10 * u, boxW, boxH);
    ctx.fillStyle = "#f1f1f1";
  }
  lines.forEach((line, i) => {
    const ly = top + i * lh;
    if (style === "subtitle" || style === "bold") ctx.strokeText(line, r.x + r.w / 2, ly);
    ctx.fillText(line, r.x + r.w / 2, ly);
    if (style === "neon") {
      ctx.shadowBlur = 8 * u;
      ctx.fillText(line, r.x + r.w / 2, ly);
      ctx.shadowBlur = 24 * u;
    }
  });
  ctx.restore();
}

function drawGuides(ctx: CanvasRenderingContext2D, r: Rect, guides: Guides, info: string, font: string) {
  const u = Math.min(r.w, r.h) / 720;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = Math.max(1, 1.5 * u);
  if (guides.thirds) {
    ctx.beginPath();
    for (const f of [1 / 3, 2 / 3]) {
      ctx.moveTo(r.x + r.w * f, r.y);
      ctx.lineTo(r.x + r.w * f, r.y + r.h);
      ctx.moveTo(r.x, r.y + r.h * f);
      ctx.lineTo(r.x + r.w, r.y + r.h * f);
    }
    ctx.stroke();
  }
  if (guides.center) {
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    ctx.beginPath();
    ctx.moveTo(cx - 20 * u, cy);
    ctx.lineTo(cx + 20 * u, cy);
    ctx.moveTo(cx, cy - 20 * u);
    ctx.lineTo(cx, cy + 20 * u);
    ctx.stroke();
  }
  if (guides.safe) {
    ctx.setLineDash([8 * u, 6 * u]);
    ctx.strokeStyle = "rgba(255,214,10,0.6)";
    for (const f of [0.9, 0.8]) {
      ctx.strokeRect(r.x + (r.w * (1 - f)) / 2, r.y + (r.h * (1 - f)) / 2, r.w * f, r.h * f);
    }
    ctx.setLineDash([]);
  }
  if (guides.info && info) {
    ctx.font = `600 ${16 * u}px ${font}`;
    const tw = ctx.measureText(info).width;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(r.x + 10 * u, r.y + r.h - 40 * u, tw + 20 * u, 28 * u);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.fillText(info, r.x + 20 * u, r.y + r.h - 26 * u);
  }
  ctx.restore();
}

// ---- Khung hình hoàn chỉnh ----

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  project: Project,
  time: number,
  media: Map<string, MediaItem>,
  opts: RenderOptions = {},
) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const font = opts.fontFamily || "system-ui, sans-serif";
  const cam = project.camera;
  const fps = Math.max(1, cam.fps || 30);
  const qt = Math.floor(time * fps) / fps;
  const frameSeed = Math.floor(time * fps) + 1;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = "none";
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);

  const shots = project.shots;
  if (!shots.length) {
    ctx.restore();
    return;
  }

  const { index, local, start } = locate(shots, qt);
  const shot = shots[index];
  const qlocal = Math.max(0, qt - start);

  // 1. Vẽ nội dung (chưa chỉnh màu) vào layer.
  const layer = buffer("layer", W, H);
  const lctx = layer.getContext("2d")!;
  lctx.setTransform(1, 0, 0, 1, 0, 0);
  lctx.globalAlpha = 1;
  lctx.globalCompositeOperation = "source-over";
  lctx.fillStyle = "#000";
  lctx.fillRect(0, 0, W, H);

  const prev = index > 0 ? shots[index - 1] : null;
  const inTransition = prev && shot.transition !== "cut" && qlocal < TRANSITION_TIME;
  const p = inTransition ? clamp(qlocal / TRANSITION_TIME) : 1;
  let whipBlur = 0;
  const one: ShotExtra = { zoom: 1, offsetX: 0, alpha: 1 };

  if (inTransition && prev) {
    const prevLocal = prev.duration + qlocal;
    switch (shot.transition) {
      case "fade":
        drawShot(lctx, W, H, prev, prevLocal, media, cam, one);
        drawShot(lctx, W, H, shot, qlocal, media, cam, { ...one, alpha: p });
        break;
      case "black":
        if (p < 0.5) drawShot(lctx, W, H, prev, prevLocal, media, cam, one);
        else drawShot(lctx, W, H, shot, qlocal, media, cam, one);
        lctx.globalAlpha = 1 - Math.abs(p - 0.5) * 2;
        lctx.fillStyle = "#000";
        lctx.fillRect(0, 0, W, H);
        lctx.globalAlpha = 1;
        break;
      case "flash":
        drawShot(lctx, W, H, shot, qlocal, media, cam, one);
        lctx.globalAlpha = 1 - p;
        lctx.fillStyle = "#fff";
        lctx.fillRect(0, 0, W, H);
        lctx.globalAlpha = 1;
        break;
      case "whip": {
        const e = p * p * (3 - 2 * p);
        drawShot(lctx, W, H, prev, prevLocal, media, cam, { ...one, offsetX: -e * W });
        drawShot(lctx, W, H, shot, qlocal, media, cam, { ...one, offsetX: (1 - e) * W });
        whipBlur = Math.sin(p * Math.PI) * 18 * (W / 1280);
        break;
      }
      case "zoom":
        drawShot(lctx, W, H, prev, prevLocal, media, cam, { ...one, zoom: 1 + p * 0.8 });
        drawShot(lctx, W, H, shot, qlocal, media, cam, { ...one, zoom: 1 + (1 - p) * 0.5, alpha: p });
        whipBlur = Math.sin(p * Math.PI) * 6 * (W / 1280);
        break;
      default:
        drawShot(lctx, W, H, shot, qlocal, media, cam, one);
    }
  } else {
    drawShot(lctx, W, H, shot, qlocal, media, cam, one);
  }

  // 2. Chỉnh màu + độ mềm ống kính khi đưa layer lên khung chính.
  const filterOk = typeof ctx.filter === "string";
  const blurPx = cam.softness * 1.1 * (W / 1280) + whipBlur;
  if (filterOk) ctx.filter = gradeFilter(project.grade, blurPx);
  ctx.drawImage(layer, 0, 0);
  ctx.filter = "none";
  applyColorOverlays(ctx, W, H, project.grade, filterOk);

  // 3. Chất liệu máy quay.
  applyCameraTexture(ctx, W, H, cam, qt, frameSeed);

  // 4. Khung điện ảnh, giao diện máy, chữ.
  const rect = drawLetterbox(ctx, W, H, findById(FRAMES, project.frame).ratio);
  drawHud(ctx, rect, cam, time, font);
  drawCaption(ctx, rect, shot.caption, project.captionStyle, local, shot.duration, font);

  if (opts.guides) {
    const angle = findById(ANGLES, shot.angle);
    const mov = findById(MOVEMENTS, shot.movement);
    const info = `SHOT ${index + 1}/${shots.length} · ${angle.short} ${angle.label} · ${mov.label}`;
    drawGuides(ctx, rect, opts.guides, info, font);
  }
  ctx.restore();
}

// Đồng bộ thời gian các video nguồn với thời điểm đang xem.
export function syncVideos(project: Project, time: number, media: Map<string, MediaItem>, playing: boolean) {
  const shots = project.shots;
  const wanted = new Map<HTMLVideoElement, number>();
  if (shots.length) {
    const { index, local } = locate(shots, time);
    const consider = (shot: Shot | undefined, t: number) => {
      const item = shot?.mediaId ? media.get(shot.mediaId) : undefined;
      if (item && item.el instanceof HTMLVideoElement) {
        const d = item.el.duration || 1;
        wanted.set(item.el, t % d);
      }
    };
    if (index > 0 && local < TRANSITION_TIME) consider(shots[index - 1], shots[index - 1].duration + local);
    consider(shots[index], local);
  }
  for (const item of media.values()) {
    if (!(item.el instanceof HTMLVideoElement)) continue;
    const v = item.el;
    const target = wanted.get(v);
    if (target === undefined) {
      if (!v.paused) v.pause();
      continue;
    }
    if (playing) {
      if (Math.abs(v.currentTime - target) > 0.35) v.currentTime = target;
      if (v.paused) void v.play().catch(() => {});
    } else {
      if (!v.paused) v.pause();
      if (!v.seeking && Math.abs(v.currentTime - target) > 0.04) v.currentTime = target;
    }
  }
}
