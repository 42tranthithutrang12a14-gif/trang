// Bộ preset cho Cine Studio: khổ video, khung điện ảnh, góc máy, chuyển động máy,
// chuyển cảnh, màu sắc (grade), mẫu máy quay và các concept gợi ý sẵn.

export type OutputFormat = {
  id: string;
  label: string;
  hint: string;
  width: number;
  height: number;
};

export const FORMATS: OutputFormat[] = [
  { id: "9x16", label: "9:16", hint: "TikTok · Reels · Shorts", width: 720, height: 1280 },
  { id: "16x9", label: "16:9", hint: "YouTube · màn hình ngang", width: 1280, height: 720 },
  { id: "1x1", label: "1:1", hint: "Bài đăng vuông", width: 1080, height: 1080 },
  { id: "4x5", label: "4:5", hint: "Feed Instagram", width: 864, height: 1080 },
];

export type FrameRatio = {
  id: string;
  label: string;
  hint: string;
  ratio: number | null;
};

// Khung điện ảnh: viền đen (letterbox / pillarbox) theo tỉ lệ khung hình phim.
export const FRAMES: FrameRatio[] = [
  { id: "none", label: "Không viền", hint: "Toàn khung", ratio: null },
  { id: "2.39", label: "2.39:1", hint: "CinemaScope — bom tấn", ratio: 2.39 },
  { id: "2.76", label: "2.76:1", hint: "Ultra Panavision 70", ratio: 2.76 },
  { id: "2.00", label: "2:1", hint: "Univisium — phim truyền hình", ratio: 2 },
  { id: "1.85", label: "1.85:1", hint: "Flat — phim chiếu rạp", ratio: 1.85 },
  { id: "1.33", label: "4:3", hint: "Academy — phim cổ điển", ratio: 4 / 3 },
  { id: "1.00", label: "1:1", hint: "Khung vuông nghệ thuật", ratio: 1 },
];

export type Angle = {
  id: string;
  label: string;
  short: string;
  desc: string;
  zoom: number;
  // Vị trí chủ thể trong khung (0..1).
  targetX: number;
  targetY: number;
  rotate: number;
  // Hiệu ứng phối cảnh: > 0 là nhìn từ dưới lên, < 0 là nhìn từ trên xuống.
  keystone: number;
  overShoulder?: boolean;
  shake?: number;
};

export const ANGLES: Angle[] = [
  { id: "ews", label: "Toàn cảnh", short: "EWS", desc: "Thiết lập bối cảnh, nhân vật nhỏ giữa không gian rộng.", zoom: 1, targetX: 0.5, targetY: 0.5, rotate: 0, keystone: 0 },
  { id: "ws", label: "Toàn", short: "WS", desc: "Thấy toàn thân nhân vật và môi trường xung quanh.", zoom: 1.15, targetX: 0.5, targetY: 0.5, rotate: 0, keystone: 0 },
  { id: "ms", label: "Trung", short: "MS", desc: "Từ eo trở lên — góc kể chuyện phổ biến nhất.", zoom: 1.6, targetX: 0.5, targetY: 0.45, rotate: 0, keystone: 0 },
  { id: "mcu", label: "Cận trung", short: "MCU", desc: "Từ ngực trở lên, thấy rõ biểu cảm.", zoom: 2.1, targetX: 0.5, targetY: 0.42, rotate: 0, keystone: 0 },
  { id: "cu", label: "Cận", short: "CU", desc: "Khuôn mặt chiếm khung, nhấn mạnh cảm xúc.", zoom: 2.8, targetX: 0.5, targetY: 0.42, rotate: 0, keystone: 0 },
  { id: "ecu", label: "Đặc tả", short: "ECU", desc: "Chi tiết cực gần: mắt, tay, đồ vật.", zoom: 4.2, targetX: 0.5, targetY: 0.5, rotate: 0, keystone: 0 },
  { id: "eye", label: "Ngang tầm mắt", short: "EYE", desc: "Trung tính, khán giả ngang hàng với nhân vật.", zoom: 1.35, targetX: 0.5, targetY: 0.45, rotate: 0, keystone: 0 },
  { id: "low", label: "Góc thấp", short: "LOW", desc: "Máy đặt thấp nhìn lên — nhân vật quyền lực, uy nghi.", zoom: 1.45, targetX: 0.5, targetY: 0.38, rotate: 0, keystone: 0.32 },
  { id: "worm", label: "Sát đất", short: "WORM", desc: "Góc con sâu, phóng đại chiều cao cực mạnh.", zoom: 1.5, targetX: 0.5, targetY: 0.32, rotate: 0, keystone: 0.55 },
  { id: "high", label: "Góc cao", short: "HIGH", desc: "Nhìn từ trên xuống — nhân vật nhỏ bé, yếu thế.", zoom: 1.45, targetX: 0.5, targetY: 0.58, rotate: 0, keystone: -0.32 },
  { id: "bird", label: "Mắt chim", short: "TOP", desc: "Thẳng từ trên cao, bố cục như bản đồ.", zoom: 1.3, targetX: 0.5, targetY: 0.5, rotate: 0, keystone: -0.5 },
  { id: "dutch", label: "Nghiêng (Dutch)", short: "DUTCH", desc: "Khung nghiêng gây bất an, căng thẳng.", zoom: 1.55, targetX: 0.5, targetY: 0.45, rotate: 13, keystone: 0 },
  { id: "ots", label: "Qua vai", short: "OTS", desc: "Nhìn qua vai nhân vật khác — cảnh đối thoại.", zoom: 1.9, targetX: 0.64, targetY: 0.42, rotate: 0, keystone: 0, overShoulder: true },
  { id: "pov", label: "Góc nhìn nhân vật", short: "POV", desc: "Khán giả nhìn bằng mắt nhân vật, máy rung nhẹ.", zoom: 1.5, targetX: 0.5, targetY: 0.5, rotate: 0, keystone: 0, shake: 0.6 },
];

export type MotionSample = { zoom: number; dx: number; dy: number; rotate: number; shake: number };

export type Movement = {
  id: string;
  label: string;
  desc: string;
  sample: (t: number, k: number) => MotionSample;
};

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const still = (): MotionSample => ({ zoom: 1, dx: 0, dy: 0, rotate: 0, shake: 0 });

// t chạy từ 0 → 1 trong thời lượng của shot, k là cường độ (0..2).
export const MOVEMENTS: Movement[] = [
  { id: "static", label: "Đứng yên", desc: "Máy cố định trên chân máy.", sample: still },
  { id: "push", label: "Đẩy vào (Push in)", desc: "Tiến chậm về phía chủ thể, tăng căng thẳng.", sample: (t, k) => ({ ...still(), zoom: 1 + 0.25 * k * ease(t) }) },
  { id: "pull", label: "Kéo ra (Pull out)", desc: "Lùi xa dần, hé lộ bối cảnh.", sample: (t, k) => ({ ...still(), zoom: 1 + 0.25 * k * (1 - ease(t)) }) },
  { id: "pan-l", label: "Lia trái (Pan)", desc: "Quét ngang sang trái.", sample: (t, k) => ({ ...still(), zoom: 1.25, dx: 0.12 * k * (ease(t) - 0.5) }) },
  { id: "pan-r", label: "Lia phải (Pan)", desc: "Quét ngang sang phải.", sample: (t, k) => ({ ...still(), zoom: 1.25, dx: -0.12 * k * (ease(t) - 0.5) }) },
  { id: "tilt-u", label: "Ngước lên (Tilt up)", desc: "Từ dưới lia lên trên.", sample: (t, k) => ({ ...still(), zoom: 1.25, dy: 0.12 * k * (ease(t) - 0.5) }) },
  { id: "tilt-d", label: "Cúi xuống (Tilt down)", desc: "Từ trên lia xuống dưới.", sample: (t, k) => ({ ...still(), zoom: 1.25, dy: -0.12 * k * (ease(t) - 0.5) }) },
  { id: "kenburns", label: "Ken Burns", desc: "Vừa đẩy vào vừa trượt chéo — kiểu phim tài liệu.", sample: (t, k) => ({ ...still(), zoom: 1.08 + 0.18 * k * t, dx: -0.05 * k * (t - 0.5), dy: -0.03 * k * (t - 0.5) }) },
  { id: "crash", label: "Zoom giật (Crash zoom)", desc: "Phóng to đột ngột — hài hước hoặc kịch tính.", sample: (t, k) => ({ ...still(), zoom: 1 + 0.6 * k * easeOut(Math.min(1, t * 5)) }) },
  { id: "roll", label: "Xoay trục (Roll)", desc: "Khung xoay chậm, cảm giác mơ hồ, mất phương hướng.", sample: (t, k) => ({ ...still(), zoom: 1.2, rotate: 10 * k * (ease(t) - 0.5) }) },
  { id: "handheld", label: "Cầm tay (Handheld)", desc: "Rung tự nhiên, chân thực như phóng sự.", sample: (_t, k) => ({ ...still(), zoom: 1.08, shake: 1 * k }) },
  { id: "vertigo", label: "Vertigo (Dolly zoom)", desc: "Nền co giãn quanh chủ thể — choáng váng.", sample: (t, k) => ({ ...still(), zoom: 1 + 0.35 * k * Math.sin(t * Math.PI), rotate: 1.5 * k * Math.sin(t * Math.PI * 2) }) },
];

export type Transition = { id: string; label: string };

export const TRANSITIONS: Transition[] = [
  { id: "cut", label: "Cắt thẳng" },
  { id: "fade", label: "Hòa tan" },
  { id: "black", label: "Mờ qua đen" },
  { id: "flash", label: "Chớp trắng" },
  { id: "whip", label: "Lia nhanh (Whip)" },
  { id: "zoom", label: "Zoom xuyên" },
];

export type Grade = {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  sepia: number;
  temperature: number;
  tint: number;
  fade: number;
  shadows: string;
  highlights: string;
  split: number;
};

export type GradePreset = { id: string; label: string; desc: string; swatch: [string, string, string]; grade: Grade };

const baseGrade: Grade = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  hue: 0,
  sepia: 0,
  temperature: 0,
  tint: 0,
  fade: 0,
  shadows: "#000000",
  highlights: "#ffffff",
  split: 0,
};

const g = (over: Partial<Grade>): Grade => ({ ...baseGrade, ...over });

export const GRADES: GradePreset[] = [
  { id: "none", label: "Gốc", desc: "Không chỉnh màu", swatch: ["#555", "#999", "#ddd"], grade: g({}) },
  { id: "teal-orange", label: "Teal & Orange", desc: "Màu bom tấn Hollywood", swatch: ["#0f4c5c", "#e36414", "#fb8b24"], grade: g({ contrast: 1.15, saturation: 1.15, shadows: "#0e5a6b", highlights: "#ffb070", split: 0.55, temperature: 0.1 }) },
  { id: "noir", label: "Film Noir", desc: "Đen trắng tương phản gắt", swatch: ["#000", "#555", "#eee"], grade: g({ saturation: 0, contrast: 1.45, brightness: 0.95 }) },
  { id: "portra", label: "Kodak Portra", desc: "Da ấm, bóng tối mềm", swatch: ["#7a5c45", "#e8b48a", "#f5e3c8"], grade: g({ contrast: 0.95, saturation: 0.9, temperature: 0.25, fade: 0.12, shadows: "#3b2a20", highlights: "#ffe7c4", split: 0.3 }) },
  { id: "chrome", label: "Classic Chrome", desc: "Nhạt màu, xanh lạnh tài liệu", swatch: ["#2f3e46", "#84a98c", "#cad2c5"], grade: g({ contrast: 1.1, saturation: 0.7, temperature: -0.1, fade: 0.08, shadows: "#1d3340", split: 0.3 }) },
  { id: "hk-neon", label: "Hong Kong 90s", desc: "Xanh lục – đỏ, ẩm và mơ màng", swatch: ["#0b3d2e", "#c1121f", "#fcbf49"], grade: g({ contrast: 1.2, saturation: 1.3, tint: -0.25, shadows: "#0d4d36", highlights: "#ffcf8a", split: 0.55 }) },
  { id: "pastel", label: "Pastel đối xứng", desc: "Hồng – vàng kẹo ngọt", swatch: ["#f4a7b9", "#f9dc8c", "#9ad1d4"], grade: g({ brightness: 1.08, contrast: 0.92, saturation: 1.15, fade: 0.15, shadows: "#8e4a5d", highlights: "#fff1c9", split: 0.35, temperature: 0.1 }) },
  { id: "cyberpunk", label: "Cyberpunk", desc: "Neon tím – xanh lơ", swatch: ["#240046", "#ff006e", "#00f5d4"], grade: g({ contrast: 1.25, saturation: 1.4, shadows: "#3a0ca3", highlights: "#ff4fd8", split: 0.6, tint: 0.3, temperature: -0.2 }) },
  { id: "matrix", label: "Ma trận", desc: "Ám xanh lục lạnh", swatch: ["#031d0c", "#2d6a4f", "#b7e4c7"], grade: g({ contrast: 1.2, saturation: 0.75, tint: -0.6, shadows: "#04361b", split: 0.45 }) },
  { id: "bleach", label: "Bleach bypass", desc: "Bạc màu, gai góc kiểu phim chiến tranh", swatch: ["#22252a", "#7d8590", "#e5e7eb"], grade: g({ contrast: 1.4, saturation: 0.45, brightness: 0.97 }) },
  { id: "horror", label: "Kinh dị lạnh", desc: "Xanh xám u ám, thiếu sức sống", swatch: ["#0b1320", "#3e5c76", "#a3b1c2"], grade: g({ brightness: 0.85, contrast: 1.25, saturation: 0.55, temperature: -0.45, shadows: "#081a2b", split: 0.4 }) },
  { id: "golden", label: "Giờ vàng", desc: "Nắng hoàng hôn rực rỡ", swatch: ["#6a2c0f", "#f77f00", "#fcbf49"], grade: g({ brightness: 1.03, contrast: 1.08, saturation: 1.2, temperature: 0.55, highlights: "#ffc46b", split: 0.3 }) },
  { id: "moonlight", label: "Ánh trăng", desc: "Tím – xanh dương đêm", swatch: ["#10002b", "#5a189a", "#4cc9f0"], grade: g({ brightness: 0.92, contrast: 1.15, saturation: 1.1, temperature: -0.35, tint: 0.35, shadows: "#240046", highlights: "#a2d2ff", split: 0.5 }) },
  { id: "vhs", label: "VHS 90s", desc: "Màu băng từ phai, bệt", swatch: ["#3d348b", "#e15a97", "#f7b801"], grade: g({ contrast: 0.9, saturation: 1.25, fade: 0.18, tint: 0.15, temperature: 0.1 }) },
  { id: "anime", label: "Hè mộng mơ", desc: "Trời xanh trong, nắng ấm kiểu anime", swatch: ["#48cae4", "#ade8f4", "#ffd6a5"], grade: g({ brightness: 1.08, contrast: 1.05, saturation: 1.3, fade: 0.06, highlights: "#fff3d6", split: 0.25, temperature: 0.05 }) },
];

export type HudType = "none" | "camcorder" | "cinema" | "disposable" | "cctv" | "phone";

export type CameraSettings = {
  grain: number;
  vignette: number;
  softness: number;
  weave: number;
  flicker: number;
  scanlines: number;
  bleed: number;
  leak: number;
  fps: number;
  hud: HudType;
  hudText: string;
  super8Gate: boolean;
  dust: boolean;
};

export type CameraPreset = { id: string; label: string; spec: string; desc: string; settings: CameraSettings };

const baseCam: CameraSettings = {
  grain: 0,
  vignette: 0,
  softness: 0,
  weave: 0,
  flicker: 0,
  scanlines: 0,
  bleed: 0,
  leak: 0,
  fps: 30,
  hud: "none",
  hudText: "",
  super8Gate: false,
  dust: false,
};

const cam = (over: Partial<CameraSettings>): CameraSettings => ({ ...baseCam, ...over });

export const CAMERAS: CameraPreset[] = [
  { id: "clean", label: "Kỹ thuật số sạch", spec: "Không hiệu ứng", desc: "Giữ nguyên hình ảnh gốc.", settings: cam({}) },
  { id: "cinema-digital", label: "Cinema Digital", spec: "Kiểu ARRI Alexa · 24fps · ISO 800", desc: "Dải tương phản rộng, mịn, hạt rất nhẹ — chuẩn phim chiếu rạp.", settings: cam({ grain: 0.08, vignette: 0.25, fps: 24 }) },
  { id: "cinema-monitor", label: "Màn hình đạo diễn", spec: "Giao diện monitor · REC · timecode", desc: "Hiện thông số máy quay như đang xem trên phim trường.", settings: cam({ grain: 0.06, vignette: 0.2, fps: 24, hud: "cinema" }) },
  { id: "film35", label: "Phim nhựa 35mm", spec: "Kodak Vision3 · 24fps", desc: "Hạt phim tự nhiên, khung hơi rung, ánh sáng chập chờn nhẹ.", settings: cam({ grain: 0.3, vignette: 0.35, weave: 0.4, flicker: 0.15, softness: 0.3, fps: 24, dust: true }) },
  { id: "film16", label: "Phim 16mm", spec: "Kiểu Bolex · 24fps", desc: "Hạt to, viền tối, chất phim tài liệu – indie.", settings: cam({ grain: 0.55, vignette: 0.5, weave: 0.7, flicker: 0.25, softness: 0.5, fps: 24, dust: true }) },
  { id: "super8", label: "Super 8 gia đình", spec: "18fps · khung bo góc", desc: "Thước phim kỷ niệm: giật nhẹ, lóa sáng, bo góc.", settings: cam({ grain: 0.65, vignette: 0.55, weave: 1.2, flicker: 0.4, softness: 0.9, leak: 0.5, fps: 18, super8Gate: true, dust: true }) },
  { id: "vhs", label: "Máy quay VHS", spec: "Camcorder 1998 · SP", desc: "Sọc quét, nhòe màu, chữ REC và ngày tháng.", settings: cam({ grain: 0.25, vignette: 0.2, softness: 0.8, scanlines: 0.45, bleed: 0.5, fps: 30, hud: "camcorder", hudText: "OCT 20 1998" }) },
  { id: "disposable", label: "Máy dùng một lần", spec: "Flash · dấu ngày cam", desc: "Ảnh chụp kỷ niệm với dấu ngày màu cam ở góc.", settings: cam({ grain: 0.35, vignette: 0.45, softness: 0.4, leak: 0.25, fps: 24, hud: "disposable", hudText: "'98 10 20" }) },
  { id: "cctv", label: "Camera an ninh", spec: "CAM 03 · 15fps", desc: "Góc giám sát lạnh lùng, sọc quét, đồng hồ chạy. Hợp với màu Film Noir.", settings: cam({ grain: 0.4, vignette: 0.3, softness: 0.6, scanlines: 0.35, fps: 15, hud: "cctv", hudText: "CAM 03" }) },
  { id: "phone", label: "Điện thoại vlog", spec: "Quay dọc · 30fps", desc: "Sắc nét, đời thường, có khung ghi hình điện thoại.", settings: cam({ vignette: 0.1, fps: 30, hud: "phone" }) },
];

export type CaptionStyle = { id: string; label: string };

export const CAPTION_STYLES: CaptionStyle[] = [
  { id: "cinema", label: "Điện ảnh (chữ mảnh, giãn)" },
  { id: "subtitle", label: "Phụ đề vàng" },
  { id: "bold", label: "Vlog chữ đậm" },
  { id: "mono", label: "Máy đánh chữ" },
  { id: "neon", label: "Neon phát sáng" },
];

export type ShotTemplate = {
  angle: string;
  movement: string;
  duration: number;
  transition: string;
  caption?: string;
  intensity?: number;
};

export type Concept = {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  grade: string;
  camera: string;
  frame: string;
  format: string;
  caption: string;
  music: string;
  tips: string[];
  shots: ShotTemplate[];
};

export const CONCEPTS: Concept[] = [
  {
    id: "blockbuster",
    name: "Bom tấn hành động",
    desc: "Màu teal-orange, khung CinemaScope, nhịp dồn dập.",
    tags: ["Hành động", "Kịch tính"],
    grade: "teal-orange",
    camera: "cinema-digital",
    frame: "2.39",
    format: "16x9",
    caption: "cinema",
    music: "Trống trầm, nhạc nền epic tăng dần",
    tips: ["Mở bằng cảnh toàn để thiết lập không gian", "Dùng góc thấp cho nhân vật chính", "Crash zoom vào cao trào, kết bằng kéo ra"],
    shots: [
      { angle: "ews", movement: "push", duration: 3, transition: "cut", caption: "MỘT NGÀY KHÔNG NHƯ MỌI NGÀY" },
      { angle: "low", movement: "static", duration: 2, transition: "whip" },
      { angle: "dutch", movement: "handheld", duration: 1.6, transition: "cut" },
      { angle: "cu", movement: "crash", duration: 1.4, transition: "flash" },
      { angle: "ecu", movement: "push", duration: 1.5, transition: "cut" },
      { angle: "ws", movement: "pull", duration: 3, transition: "black", caption: "SẮP RA MẮT" },
    ],
  },
  {
    id: "hongkong",
    name: "Tình yêu Hong Kong",
    desc: "Xanh lục – đỏ, chậm rãi, cô đơn giữa phố đêm.",
    tags: ["Lãng mạn", "Hoài niệm"],
    grade: "hk-neon",
    camera: "film35",
    frame: "1.85",
    format: "16x9",
    caption: "subtitle",
    music: "Saxophone, bossa nova chậm",
    tips: ["Để nhân vật lệch về một bên khung", "Dùng góc qua vai cho khoảnh khắc đối thoại", "Chuyển cảnh hòa tan để tạo cảm giác ký ức"],
    shots: [
      { angle: "ms", movement: "kenburns", duration: 3, transition: "cut", caption: "Có những người chỉ gặp một lần..." },
      { angle: "ots", movement: "static", duration: 2.5, transition: "fade" },
      { angle: "mcu", movement: "handheld", duration: 2, transition: "cut", intensity: 0.5 },
      { angle: "dutch", movement: "roll", duration: 2.5, transition: "fade" },
      { angle: "cu", movement: "push", duration: 3, transition: "fade", caption: "...nhưng nhớ cả đời." },
    ],
  },
  {
    id: "pastel",
    name: "Đối xứng pastel",
    desc: "Bố cục cân đối tuyệt đối, màu kẹo ngọt, nhịp hài hước.",
    tags: ["Nghệ thuật", "Dễ thương"],
    grade: "pastel",
    camera: "film35",
    frame: "1.85",
    format: "1x1",
    caption: "cinema",
    music: "Đàn balalaika, nhạc cụ gõ vui tai",
    tips: ["Đặt chủ thể đúng chính giữa khung", "Ưu tiên máy đứng yên và lia ngang dứt khoát", "Góc mắt chim cho cảnh bàn ăn, đồ vật"],
    shots: [
      { angle: "ws", movement: "static", duration: 2.5, transition: "cut", caption: "CHƯƠNG MỘT" },
      { angle: "ms", movement: "pan-r", duration: 2, transition: "whip" },
      { angle: "cu", movement: "static", duration: 1.8, transition: "cut" },
      { angle: "bird", movement: "static", duration: 2, transition: "cut" },
      { angle: "ews", movement: "pull", duration: 2.5, transition: "flash", caption: "HẾT" },
    ],
  },
  {
    id: "noir",
    name: "Trinh thám Film Noir",
    desc: "Đen trắng, bóng đổ gắt, khung 4:3 cổ điển.",
    tags: ["Bí ẩn", "Cổ điển"],
    grade: "noir",
    camera: "film16",
    frame: "1.33",
    format: "16x9",
    caption: "mono",
    music: "Jazz trầm, kèn trumpet",
    tips: ["Góc thấp và góc nghiêng tạo sự đe dọa", "Đặc tả đồ vật: ly rượu, khẩu súng, lá thư", "Kết cảnh bằng mờ qua đen"],
    shots: [
      { angle: "high", movement: "push", duration: 3, transition: "cut", caption: "Thành phố này chưa bao giờ ngủ." },
      { angle: "low", movement: "static", duration: 2.2, transition: "black" },
      { angle: "dutch", movement: "push", duration: 2.2, transition: "cut" },
      { angle: "ecu", movement: "static", duration: 1.6, transition: "cut" },
      { angle: "cu", movement: "pull", duration: 3, transition: "black", caption: "Và tôi cũng vậy." },
    ],
  },
  {
    id: "super8",
    name: "Thước phim Super 8",
    desc: "Kỷ niệm gia đình, nắng ấm, khung bo góc, lóa sáng.",
    tags: ["Kỷ niệm", "Ấm áp"],
    grade: "portra",
    camera: "super8",
    frame: "none",
    format: "4x5",
    caption: "mono",
    music: "Guitar mộc, tiếng máy chiếu lạch cạch",
    tips: ["Quay cầm tay, đừng sợ rung", "Mỗi shot ngắn 2–3 giây như cuộn phim thật", "Hòa tan giữa các cảnh để gợi ký ức"],
    shots: [
      { angle: "ws", movement: "handheld", duration: 2.5, transition: "cut", caption: "Mùa hè năm ấy" },
      { angle: "ms", movement: "handheld", duration: 2.5, transition: "fade" },
      { angle: "cu", movement: "kenburns", duration: 2.5, transition: "fade" },
      { angle: "eye", movement: "handheld", duration: 2.5, transition: "fade" },
    ],
  },
  {
    id: "vhs",
    name: "Băng VHS 90s",
    desc: "Camcorder gia đình, chữ REC, nhòe màu sọc quét.",
    tags: ["Retro", "Vui nhộn"],
    grade: "vhs",
    camera: "vhs",
    frame: "none",
    format: "16x9",
    caption: "bold",
    music: "Synth-pop, nhạc thập niên 90",
    tips: ["Zoom giật như người quay nghiệp dư", "Thêm chữ chú thích kiểu viết tay", "Góc POV để khán giả như đang cầm máy"],
    shots: [
      { angle: "pov", movement: "handheld", duration: 2.5, transition: "cut", caption: "TẾT 1998!!" },
      { angle: "ms", movement: "crash", duration: 1.8, transition: "cut" },
      { angle: "ws", movement: "pan-l", duration: 2.5, transition: "cut" },
      { angle: "cu", movement: "handheld", duration: 2, transition: "cut" },
    ],
  },
  {
    id: "cyberpunk",
    name: "Đêm Cyberpunk",
    desc: "Neon tím – xanh, góc máy thấp, phố tương lai.",
    tags: ["Viễn tưởng", "Ngầu"],
    grade: "cyberpunk",
    camera: "cinema-monitor",
    frame: "2.39",
    format: "16x9",
    caption: "neon",
    music: "Synthwave, bass nặng",
    tips: ["Góc sát đất cho tòa nhà và nhân vật", "Xoay trục để tạo cảm giác ảo giác", "Chớp trắng khi đổi nhịp nhạc"],
    shots: [
      { angle: "worm", movement: "tilt-u", duration: 2.5, transition: "cut", caption: "NEO SÀI GÒN 2077" },
      { angle: "dutch", movement: "roll", duration: 2, transition: "flash" },
      { angle: "mcu", movement: "vertigo", duration: 2.2, transition: "zoom" },
      { angle: "ecu", movement: "crash", duration: 1.2, transition: "flash" },
      { angle: "ews", movement: "pull", duration: 2.8, transition: "black" },
    ],
  },
  {
    id: "horror",
    name: "Kinh dị",
    desc: "Lạnh lẽo, đẩy máy chậm, góc nhìn rình rập.",
    tags: ["Rùng rợn", "Căng thẳng"],
    grade: "horror",
    camera: "film16",
    frame: "none",
    format: "9x16",
    caption: "cinema",
    music: "Drone âm trầm, tiếng tim đập",
    tips: ["Đẩy máy cực chậm vào khoảng tối", "POV cầm tay như có ai đang theo dõi", "Mờ qua đen thật lâu giữa các cảnh"],
    shots: [
      { angle: "ews", movement: "push", duration: 3.5, transition: "cut", intensity: 0.6, caption: "Đừng quay lại." },
      { angle: "pov", movement: "handheld", duration: 2.5, transition: "black" },
      { angle: "dutch", movement: "static", duration: 2, transition: "cut" },
      { angle: "ecu", movement: "push", duration: 2.5, transition: "black" },
    ],
  },
  {
    id: "travel",
    name: "Vlog du lịch điện ảnh",
    desc: "Nắng giờ vàng, chuyển cảnh lia nhanh, chữ đậm.",
    tags: ["Du lịch", "Năng động"],
    grade: "golden",
    camera: "phone",
    frame: "none",
    format: "9x16",
    caption: "bold",
    music: "Indie pop, nhịp 120 BPM",
    tips: ["Mỗi cảnh 1.5–2 giây theo nhịp nhạc", "Nối cảnh bằng lia nhanh cùng hướng", "Kết bằng cảnh toàn kéo ra"],
    shots: [
      { angle: "ews", movement: "kenburns", duration: 2, transition: "cut", caption: "ĐÀ LẠT 3N2Đ" },
      { angle: "ms", movement: "pan-r", duration: 1.6, transition: "whip" },
      { angle: "cu", movement: "push", duration: 1.6, transition: "whip" },
      { angle: "low", movement: "tilt-u", duration: 1.8, transition: "whip" },
      { angle: "ws", movement: "pull", duration: 2.4, transition: "fade", caption: "Hẹn gặp lại!" },
    ],
  },
  {
    id: "documentary",
    name: "Phim tài liệu",
    desc: "Chân thực, màu trầm, Ken Burns và cầm tay.",
    tags: ["Chân thực", "Kể chuyện"],
    grade: "chrome",
    camera: "film16",
    frame: "1.85",
    format: "16x9",
    caption: "subtitle",
    music: "Piano tối giản",
    tips: ["Ken Burns cho ảnh tư liệu", "Cận mặt nhân vật khi họ kể chuyện", "Giữ màu trung tính, đừng bão hòa"],
    shots: [
      { angle: "ews", movement: "kenburns", duration: 3.5, transition: "cut", caption: "Ông tôi làm nghề này đã 40 năm." },
      { angle: "mcu", movement: "handheld", duration: 3, transition: "fade", intensity: 0.4 },
      { angle: "ecu", movement: "kenburns", duration: 3, transition: "fade" },
      { angle: "ws", movement: "static", duration: 3, transition: "black" },
    ],
  },
  {
    id: "anime",
    name: "Hè mộng mơ",
    desc: "Trời xanh, nắng ấm, gió nhẹ — như phim hoạt hình.",
    tags: ["Trong trẻo", "Thanh xuân"],
    grade: "anime",
    camera: "clean",
    frame: "none",
    format: "16x9",
    caption: "cinema",
    music: "Piano + dây, giai điệu trong sáng",
    tips: ["Nhiều khoảng trời trong khung", "Ngước máy từ nhân vật lên bầu trời", "Chuyển cảnh hòa tan mềm mại"],
    shots: [
      { angle: "ews", movement: "tilt-u", duration: 3, transition: "cut", caption: "Mùa hè năm 17 tuổi" },
      { angle: "ms", movement: "push", duration: 2.5, transition: "fade" },
      { angle: "low", movement: "static", duration: 2.5, transition: "fade" },
      { angle: "ws", movement: "pull", duration: 3, transition: "fade" },
    ],
  },
];

export const findById = <T extends { id: string }>(list: T[], id: string): T => list.find((x) => x.id === id) ?? list[0];
