// Kosa palette generator — OKLCH 기반 스케일 생성 + WCAG 대비 검사
// node scripts/palette.mjs  → src/kosa/tokens/palette.json
import { writeFileSync } from 'node:fs';

const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const rgbToHex = (rgb) =>
  '#' + rgb.map((c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();

function rgbToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}
function oklchToLinRgb(L, C, H) {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const inGamut = (rgb) => rgb.every((c) => c >= -1e-4 && c <= 1 + 1e-4);
function oklchToHex(L, C, H) {
  // 채도 최대 유지: 목표 C에서 sRGB 밖이면 C만 줄인다 (hue/L 고정)
  let lo = 0, hi = C;
  if (inGamut(oklchToLinRgb(L, C, H))) return rgbToHex(oklchToLinRgb(L, C, H).map(toGam));
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    inGamut(oklchToLinRgb(L, mid, H)) ? (lo = mid) : (hi = mid);
  }
  return rgbToHex(oklchToLinRgb(L, lo, H).map(toGam));
}
export const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map(toLin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// 스텝 이름 = 대략적인 명도(Montage 방식). 숫자가 작을수록 어둡다.
const STEPS = [5, 10, 20, 30, 40, 45, 50, 60, 70, 80, 90, 95, 99];
const L_OF = { 5: 0.2, 10: 0.27, 20: 0.36, 30: 0.45, 40: 0.54, 45: 0.585, 50: 0.62, 60: 0.7, 70: 0.78, 80: 0.86, 90: 0.93, 95: 0.965, 99: 0.99 };

// 밝은 단계의 채도 감쇠 (상태색이 형광처럼 뜨지 않게). 브랜드는 감쇠 없음
const TAPER = { 80: 0.7, 90: 0.45, 95: 0.3, 99: 0.15 };

function scale(seedHex, { chroma, anchor, hueShift = 0, taper = true } = {}) {
  const [Ls, Cs, Hs] = rgbToOklch(seedHex);
  const out = {};
  for (const s of STEPS) {
    const L = s === anchor ? Ls : L_OF[s];
    // 밝은 쪽은 hue를 살짝 따뜻하게(옐로 방향) 돌려 탁해지지 않게
    const H = Hs + hueShift * ((L - Ls) / 0.4);
    const C = (chroma ?? Cs) * (taper && TAPER[s] ? TAPER[s] : 1);
    out[s] = s === anchor ? seedHex.toUpperCase() : oklchToHex(L, C, H);
  }
  return out;
}

const palette = {
  // 브랜드: 고사쿠라 오렌지 #FF4500 (OKLCH L≈0.66) → 50 스텝에 고정
  sakura: scale('#FF4500', { anchor: 50, hueShift: 8, taper: false }),
  // 쿨 뉴트럴: 메탈릭한 차가운 회색 (아주 약한 블루 틴트)
  neutral: scale('#6B7280', { chroma: 0.012 }),
  // 상태색 — 브랜드(오렌지레드)와 구분되도록 레드는 로즈 쪽, 경고는 앰버
  red: scale('#E0185C', { anchor: 45 }),
  green: scale('#00A86B', { anchor: 50 }),
  blue: scale('#2563EB', { anchor: 40 }),
  amber: scale('#F59E0B', { anchor: 70 }),
};
// 순수 흑백 뉴트럴 엔드포인트
palette.common = { 0: '#000000', 100: '#FFFFFF' };

writeFileSync(new URL('../src/kosa/tokens/palette.json', import.meta.url), JSON.stringify(palette, null, 2) + '\n');

const W = '#FFFFFF';
for (const [name, sc] of Object.entries(palette)) {
  if (name === 'common') continue;
  console.log(`\n${name}`);
  for (const [k, v] of Object.entries(sc)) {
    console.log(`  ${String(k).padStart(2)} ${v}  on white ${contrast(v, W).toFixed(2)}  on #111 ${contrast(v, '#111114').toFixed(2)}`);
  }
}

// CSS 프리미티브 변수 출력
let css = '/* 자동 생성 파일 — scripts/palette.mjs 를 수정하고 다시 실행할 것 */\n:root {\n';
for (const [name, sc] of Object.entries(palette)) {
  for (const [k, v] of Object.entries(sc)) css += `  --kosa-${name}-${k}: ${v};\n`;
}
css += '}\n';
writeFileSync(new URL('../src/kosa/tokens/palette.css', import.meta.url), css);
