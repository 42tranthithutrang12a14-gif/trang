// Cảnh mẫu vẽ bằng code để người dùng thử ngay khi chưa tải ảnh/video lên.

import type { MediaItem } from "./renderer";

function person(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, color: string) {
  const head = h * 0.13;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y - h + head, head, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - h * 0.2, y);
  ctx.quadraticCurveTo(x - h * 0.24, y - h * 0.62, x - h * 0.05, y - h * 0.74);
  ctx.lineTo(x + h * 0.05, y - h * 0.74);
  ctx.quadraticCurveTo(x + h * 0.24, y - h * 0.62, x + h * 0.2, y);
  ctx.closePath();
  ctx.fill();
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function cityNight() {
  const c = document.createElement("canvas");
  c.width = 1600;
  c.height = 1100;
  const x = c.getContext("2d")!;
  const r = seeded(7);
  const sky = x.createLinearGradient(0, 0, 0, c.height);
  sky.addColorStop(0, "#090a1f");
  sky.addColorStop(0.6, "#2b1846");
  sky.addColorStop(1, "#5c2a4f");
  x.fillStyle = sky;
  x.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 120; i++) {
    x.fillStyle = `rgba(255,255,255,${r() * 0.7})`;
    x.fillRect(r() * c.width, r() * 450, 2, 2);
  }
  let bx = -20;
  while (bx < c.width) {
    const bw = 90 + r() * 160;
    const bh = 300 + r() * 520;
    const top = c.height - 120 - bh;
    x.fillStyle = `hsl(${250 + r() * 30}, 30%, ${8 + r() * 8}%)`;
    x.fillRect(bx, top, bw, bh + 120);
    for (let wy = top + 20; wy < c.height - 150; wy += 28) {
      for (let wx = bx + 12; wx < bx + bw - 16; wx += 22) {
        if (r() > 0.55) {
          x.fillStyle = r() > 0.85 ? "#7cf6ff" : `rgba(255,${190 + r() * 50},120,${0.5 + r() * 0.5})`;
          x.fillRect(wx, wy, 10, 14);
        }
      }
    }
    bx += bw + 6;
  }
  const signs = [
    { t: "BAR", x: 260, y: 520, c: "#ff2bd6" },
    { t: "HOTEL", x: 1180, y: 440, c: "#2bf0ff" },
    { t: "24H", x: 760, y: 610, c: "#ffd23f" },
  ];
  for (const s of signs) {
    x.save();
    x.font = "bold 64px sans-serif";
    x.shadowColor = s.c;
    x.shadowBlur = 30;
    x.fillStyle = s.c;
    x.fillText(s.t, s.x, s.y);
    x.restore();
  }
  const street = x.createLinearGradient(0, c.height - 140, 0, c.height);
  street.addColorStop(0, "#1a1026");
  street.addColorStop(1, "#3a1c3a");
  x.fillStyle = street;
  x.fillRect(0, c.height - 140, c.width, 140);
  x.fillStyle = "rgba(255,43,214,0.25)";
  x.fillRect(200, c.height - 120, 300, 8);
  x.fillStyle = "rgba(43,240,255,0.2)";
  x.fillRect(1050, c.height - 90, 380, 6);
  person(x, 800, c.height - 40, 420, "#07060c");
  return c;
}

function sunsetHill() {
  const c = document.createElement("canvas");
  c.width = 1600;
  c.height = 1100;
  const x = c.getContext("2d")!;
  const sky = x.createLinearGradient(0, 0, 0, c.height);
  sky.addColorStop(0, "#2d3a8c");
  sky.addColorStop(0.45, "#f28f3b");
  sky.addColorStop(0.7, "#ffd27f");
  sky.addColorStop(1, "#c8553d");
  x.fillStyle = sky;
  x.fillRect(0, 0, c.width, c.height);
  const sun = x.createRadialGradient(1050, 620, 0, 1050, 620, 260);
  sun.addColorStop(0, "rgba(255,250,220,1)");
  sun.addColorStop(0.3, "rgba(255,220,150,0.9)");
  sun.addColorStop(1, "rgba(255,180,90,0)");
  x.fillStyle = sun;
  x.fillRect(0, 0, c.width, c.height);
  const layers = [
    { y: 640, amp: 90, color: "#a04a4a" },
    { y: 760, amp: 70, color: "#6b2f45" },
    { y: 880, amp: 50, color: "#3a1a33" },
  ];
  layers.forEach((l, li) => {
    x.fillStyle = l.color;
    x.beginPath();
    x.moveTo(0, c.height);
    for (let px = 0; px <= c.width; px += 20) {
      x.lineTo(px, l.y - Math.sin(px / (180 + li * 70) + li) * l.amp - Math.sin(px / 57) * 12);
    }
    x.lineTo(c.width, c.height);
    x.fill();
  });
  x.fillStyle = "#1c0d1d";
  x.beginPath();
  x.moveTo(0, c.height);
  x.quadraticCurveTo(560, 860, 1100, 960);
  x.quadraticCurveTo(1400, 1010, 1600, 1000);
  x.lineTo(1600, 1100);
  x.fill();
  person(x, 620, 930, 330, "#120812");
  for (let i = 0; i < 5; i++) {
    x.strokeStyle = "#2a1426";
    x.lineWidth = 4;
    x.beginPath();
    const bx = 300 + i * 70;
    const by = 260 + (i % 2) * 40;
    x.moveTo(bx - 18, by - 6);
    x.quadraticCurveTo(bx - 8, by - 14, bx, by);
    x.quadraticCurveTo(bx + 8, by - 14, bx + 18, by - 6);
    x.stroke();
  }
  return c;
}

function portrait() {
  const c = document.createElement("canvas");
  c.width = 1100;
  c.height = 1400;
  const x = c.getContext("2d")!;
  const r = seeded(42);
  const bg = x.createLinearGradient(0, 0, c.width, c.height);
  bg.addColorStop(0, "#1b2a41");
  bg.addColorStop(1, "#324a5f");
  x.fillStyle = bg;
  x.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 26; i++) {
    const rad = 30 + r() * 90;
    const g = x.createRadialGradient(0, 0, 0, 0, 0, rad);
    const hue = r() > 0.5 ? "255,200,120" : "140,200,255";
    g.addColorStop(0, `rgba(${hue},${0.35 + r() * 0.3})`);
    g.addColorStop(1, `rgba(${hue},0)`);
    x.save();
    x.translate(r() * c.width, r() * c.height * 0.8);
    x.fillStyle = g;
    x.beginPath();
    x.arc(0, 0, rad, 0, Math.PI * 2);
    x.fill();
    x.restore();
  }
  // Vai và cổ
  x.fillStyle = "#2b1b17";
  x.beginPath();
  x.moveTo(140, c.height);
  x.quadraticCurveTo(180, 1000, 450, 960);
  x.lineTo(650, 960);
  x.quadraticCurveTo(920, 1000, 960, c.height);
  x.fill();
  x.fillStyle = "#c98b6b";
  x.fillRect(480, 820, 140, 170);
  // Mặt
  const skin = x.createRadialGradient(500, 600, 40, 550, 640, 260);
  skin.addColorStop(0, "#f2c4a0");
  skin.addColorStop(1, "#b97a5a");
  x.fillStyle = skin;
  x.beginPath();
  x.ellipse(550, 630, 190, 240, 0, 0, Math.PI * 2);
  x.fill();
  // Tóc
  x.fillStyle = "#1a1210";
  x.beginPath();
  x.ellipse(550, 480, 215, 150, 0, Math.PI, Math.PI * 2);
  x.quadraticCurveTo(780, 620, 740, 760);
  x.quadraticCurveTo(720, 560, 600, 470);
  x.quadraticCurveTo(450, 520, 370, 760);
  x.quadraticCurveTo(320, 600, 335, 480);
  x.fill();
  // Mắt, mũi, môi
  for (const ex of [475, 625]) {
    x.fillStyle = "#fff";
    x.beginPath();
    x.ellipse(ex, 620, 34, 16, 0, 0, Math.PI * 2);
    x.fill();
    x.fillStyle = "#3b2416";
    x.beginPath();
    x.arc(ex, 620, 14, 0, Math.PI * 2);
    x.fill();
    x.fillStyle = "#fff";
    x.beginPath();
    x.arc(ex + 5, 615, 4, 0, Math.PI * 2);
    x.fill();
    x.strokeStyle = "#1a1210";
    x.lineWidth = 7;
    x.beginPath();
    x.moveTo(ex - 40, 575);
    x.quadraticCurveTo(ex, 560, ex + 40, 572);
    x.stroke();
  }
  x.strokeStyle = "rgba(120,60,40,0.6)";
  x.lineWidth = 5;
  x.beginPath();
  x.moveTo(550, 640);
  x.quadraticCurveTo(535, 700, 560, 712);
  x.stroke();
  x.fillStyle = "#b5524c";
  x.beginPath();
  x.ellipse(550, 775, 52, 18, 0, 0, Math.PI * 2);
  x.fill();
  // Viền sáng (rim light)
  x.strokeStyle = "rgba(255,210,150,0.55)";
  x.lineWidth = 10;
  x.beginPath();
  x.ellipse(550, 630, 194, 244, 0, -0.9, 0.6);
  x.stroke();
  return c;
}

export function createDemoMedia(): MediaItem[] {
  const scenes = [
    { id: "demo-city", name: "Phố đêm (mẫu)", el: cityNight(), focusX: 0.5, focusY: 0.72 },
    { id: "demo-sunset", name: "Hoàng hôn (mẫu)", el: sunsetHill(), focusX: 0.39, focusY: 0.75 },
    { id: "demo-portrait", name: "Chân dung (mẫu)", el: portrait(), focusX: 0.5, focusY: 0.46 },
  ];
  return scenes.map((s) => ({
    ...s,
    kind: "demo" as const,
    thumb: s.el.toDataURL("image/jpeg", 0.6),
  }));
}
