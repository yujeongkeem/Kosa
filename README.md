# Kosa Design System

테스트용 React 디자인 시스템.
웹과 모바일을 함께 다루고, 토큰만 바꿔서 라이트/다크 · 웹/모바일 · 라운드/각진 톤을 전환한다.

Wanted Montage, Toss TDS의 문서 구조(Foundations / Components)를 레퍼런스로 삼았고, 토큰·컴포넌트·문서는 AI(Claude)와 함께 처음부터 새로 설계했다.

문서 사이트: https://yujeongkeem.github.io/Kosa/

## 실행

```bash
npm install
npm run dev       # 문서 사이트 http://localhost:5173
npm run build     # 타입체크 + 정적 빌드 (dist/)
```

## 구조

```
src/
  kosa/                     ← 디자인 시스템 본체
    tokens/
      palette.json|css      ← 프리미티브 (scripts/palette.mjs가 생성)
      semantic.css          ← 의미 토큰, 라이트/다크 매핑
      foundation.css        ← 타입·간격·라운드·그림자·모션·플랫폼 변형
      base.css              ← 리셋 + 타이포 클래스
    components/<Name>/      ← 컴포넌트 (tsx + css)
    index.ts                ← 공개 API
  docs/                     ← 문서 사이트 (해시 라우팅)
scripts/palette.mjs         ← OKLCH 팔레트 생성 + 대비 검사
```

## 전역 모드 (html 속성)

| 속성 | 값 | 효과 |
| --- | --- | --- |
| `data-theme` | `light` / `dark` | 시맨틱 컬러 매핑 |
| `data-platform` | `desktop` / `mobile` (없으면 화면 폭) | 타입 스케일, 컨트롤 높이, 그리드 |
| `data-shape` | `round` / `sharp` | 역할 radius 토큰 |

세 속성 모두 하위 요소에도 지정할 수 있다 (예: 모바일 프레임 미리보기).

## 원칙

1. 컴포넌트 CSS는 시맨틱/역할 토큰만 참조한다. 팔레트 값은 `semantic.css`에서만 쓴다.
2. 경계는 배경 대비로 먼저, 선은 레이아웃 구조상 필요한 곳에만.
3. 브랜드 원색(sakura-50)은 대비 3.4:1이라 그래픽 전용. 버튼·링크는 sakura-45(4.6:1).

## 로드맵

- [x] 1차 — Foundations 8종, 핵심 컴포넌트 14종, 문서 사이트, 모바일/웹 프로토타입
- [ ] 2차 — 나머지 컴포넌트 (Select, Tooltip, Avatar, Skeleton, Pagination, Accordion, DatePicker …)
- [ ] 3차 — Utilities (layout primitives, a11y 헬퍼, 훅), 라이브러리 빌드 배포
