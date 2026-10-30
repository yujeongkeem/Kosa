import { useState } from 'react';
import { Button, Card, Icon, icons, useToast, type IconName } from '@kosa';
import palette from '../../kosa/tokens/palette.json';
import { contrast, grade } from '../contrast';
import { Callout, Code, InlineCode, P, PageHeader, Preview, Section, Table } from '../ui/Doc';

type Scale = Record<string, string>;
const SCALES = palette as unknown as Record<string, Scale>;
const ANCHORS: Record<string, string> = { sakura: '50', red: '40', green: '50', blue: '40', amber: '70' };
const SCALE_DESC: Record<string, string> = {
  sakura: '브랜드 · 오렌지레드 (#FF4500 = 50)',
  neutral: '쿨 뉴트럴 · 아주 약한 블루 틴트의 메탈릭 그레이',
  red: 'Negative · 브랜드와 구분되도록 로즈 방향',
  green: 'Positive',
  blue: 'Info',
  amber: 'Caution',
};

function useCopy() {
  const toast = useToast();
  return (text: string) =>
    navigator.clipboard?.writeText(text).then(
      () => toast({ message: `${text} 복사됨`, tone: 'positive', duration: 1800 }),
      () => toast({ message: '복사하지 못했어요', tone: 'negative' }),
    );
}

/* ------------------------------------------------------------------ Color */
const SEMANTIC: [string, string][] = [
  ['brand', '브랜드 원색 #FF4500'],
  ['bg-base', '페이지 기본 배경'],
  ['bg-subtle', '섹션 구분 배경'],
  ['bg-muted', '카드·그룹 배경'],
  ['bg-elevated', '회색 배경 위의 흰 면 (카드, 다이얼로그, 시트)'],
  ['fill-primary', '주요 버튼·선택 상태'],
  ['fill-primary-subtle', '보조 버튼, 선택 배경'],
  ['fill-neutral', '입력창·칩·3순위 버튼'],
  ['fill-strong', '선택된 칩, 강한 반전 면'],
  ['text-strong', '제목'],
  ['text-normal', '본문'],
  ['text-alternative', '보조 설명'],
  ['text-assistive', '플레이스홀더, 캡션'],
  ['text-disabled', '비활성'],
  ['text-primary', '링크, 강조 텍스트'],
  ['line-normal', '레이아웃 구분선'],
  ['line-focus', '포커스 링'],
  ['negative', '오류'],
  ['positive', '성공'],
  ['caution', '주의'],
  ['info', '정보'],
];

const PAIRS: [string, string, string, string][] = [
  ['흰 글자 / sakura-50 (fill-primary)', palette.common['100'], palette.sakura['50'], '주요 버튼 — 굵은 라벨'],
  ['sakura-50 / 흰 배경 (text-primary)', palette.sakura['50'], palette.common['100'], '강조·링크 — 긴 본문엔 쓰지 않음'],
  ['sakura-60 / 다크 배경 (text-primary)', palette.sakura['60'], '#0E1014', '다크 링크'],
  ['neutral-45 / 흰 배경 (text-assistive)', palette.neutral['45'], palette.common['100'], '캡션'],
  ['neutral-30 / 흰 배경 (text-alternative)', palette.neutral['30'], palette.common['100'], '보조 설명'],
];

export function ColorPage() {
  const copy = useCopy();
  return (
    <>
      <PageHeader group="Foundations" title="Color">
        팔레트(원재료) → 시맨틱(의미) 두 단계로 나뉘어요. 컴포넌트는 시맨틱 토큰만 쓰기 때문에, 다크 모드는 매핑만 바꿔서 만들어요.
      </PageHeader>

      <Section title="Brand" description="브랜드 컬러 #FF4500. 채도는 최대로 유지하고 명도만 단계별로 조정한 OKLCH 스케일이에요.">
        <div className="doc-hero__sw" style={{ height: 120, borderRadius: 'var(--kosa-radius-card)' }}>
          <span style={{ background: palette.sakura['50'], display: 'flex', alignItems: 'flex-end', padding: 20, color: '#fff', fontWeight: 700 }}>
            #FF4500 · sakura-50
          </span>
          <span style={{ background: palette.sakura['45'], display: 'flex', alignItems: 'flex-end', padding: 20, color: '#fff', fontWeight: 700, flex: 0.6 }}>
            45
          </span>
          <span style={{ background: palette.sakura['40'], flex: 0.35 }} />
          <span style={{ background: palette.sakura['95'], flex: 0.35 }} />
        </div>
      </Section>

      <Section title="Palette" description="숫자는 대략적인 명도예요 (5 = 가장 어두움, 99 = 가장 밝음). 테두리가 있는 칸은 기준색이고, 칸을 누르면 CSS 변수명이 복사돼요.">
        {Object.entries(SCALES)
          .filter(([n]) => n !== 'common')
          .map(([name, scale]) => (
            <div key={name}>
              <p className="doc-scale-name">
                {name} <span style={{ fontWeight: 400, color: 'var(--kosa-color-text-assistive)' }}>— {SCALE_DESC[name]}</span>
              </p>
              <div className="doc-swatch-row">
                {Object.entries(scale).map(([step, hex]) => {
                  const onWhite = contrast(hex, '#FFFFFF');
                  const fg = onWhite >= 4.5 ? '#FFFFFF' : '#13161C';
                  return (
                    <button
                      key={step}
                      type="button"
                      className="doc-swatch"
                      style={{ background: hex, color: fg }}
                      data-anchor={ANCHORS[name] === step || undefined}
                      onClick={() => copy(`var(--kosa-${name}-${step})`)}
                      title={`--kosa-${name}-${step}`}
                    >
                      <strong>{step}</strong>
                      <span>{hex.slice(1)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
      </Section>

      <Section title="Semantic" description="현재 테마 값이 실시간으로 표시돼요. 우측 상단에서 다크 모드로 바꿔 보세요.">
        <Table
          head={['', '토큰', '용도']}
          rows={SEMANTIC.map(([name, use]) => [
            <span className="doc-color-chip" style={{ background: `var(--kosa-color-${name})` }} />,
            <InlineCode>--kosa-color-{name}</InlineCode>,
            use,
          ])}
        />
      </Section>

      <Section title="대비 검증" description="주요 조합의 WCAG 2.1 대비율이에요. 채도를 지키려고 버튼·링크에도 원색을 그대로 써요. 원색 위 흰 글자(3.4:1)는 큰 텍스트·UI 기준(3:1)만 통과하니 라벨은 SemiBold 이상으로 써요.">
        <Table
          head={['조합', '미리보기', '대비', '등급', '용도']}
          rows={PAIRS.map(([label, fg, bg, use]) => {
            const r = contrast(fg, bg);
            return [
              label,
              <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 6, background: bg, color: fg, fontWeight: 600 }}>가나다 Aa</span>,
              <strong>{r.toFixed(2)}:1</strong>,
              <span style={{ color: r >= 4.5 ? 'var(--kosa-color-positive)' : r >= 3 ? 'var(--kosa-color-caution)' : 'var(--kosa-color-negative)', fontWeight: 600 }}>{grade(r)}</span>,
              use,
            ];
          })}
        />
        <Callout>
          팔레트는 <InlineCode>scripts/palette.mjs</InlineCode>가 OKLCH 공간에서 hue를 고정하고 sRGB 범위 안에서 채도를 최대로 잡아 생성해요. 값을
          바꾸려면 스크립트를 고치고 <InlineCode>node scripts/palette.mjs</InlineCode>를 다시 실행하세요.
        </Callout>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------- Typography */
const TYPE: [string, string, string, string, string, string][] = [
  ['display1', '56', '40', 'tight 1.2', 'Bold', '랜딩 히어로'],
  ['display2', '40', '32', 'tight 1.2', 'Bold', '섹션 히어로'],
  ['title1', '32', '26', 'normal 1.4', 'Bold', '페이지 제목'],
  ['title2', '28', '24', 'normal 1.4', 'Bold', ''],
  ['title3', '24', '22', 'normal 1.4', 'Bold', '모바일 화면 제목'],
  ['heading1', '20', '19', 'normal 1.4', 'SemiBold', '섹션 제목, 다이얼로그'],
  ['heading2', '18', '17', 'normal 1.4', 'SemiBold', '카드 제목'],
  ['body1', '16', '16', 'relaxed 1.6', 'Regular', '기본 본문'],
  ['body2', '15', '15', 'relaxed 1.6', 'Regular', '버튼, 보조 본문'],
  ['label1', '14', '14', 'normal 1.4', 'Medium', '라벨, 칩'],
  ['label2', '13', '13', 'normal 1.4', 'Medium', '헬퍼 텍스트'],
  ['caption1', '12', '12', 'normal 1.4', 'Regular', '캡션, 배지'],
  ['caption2', '11', '11', 'normal 1.4', 'Regular', '최소 크기'],
];

const LEADING: [string, string, string][] = [
  ['leading-tight', '1.2', 'display — 큰 글자, 한두 줄'],
  ['leading-normal', '1.4', 'title · heading · label · caption — UI 텍스트'],
  ['leading-relaxed', '1.6', 'body — 여러 줄 읽는 본문'],
];

export function TypographyPage() {
  return (
    <>
      <PageHeader group="Foundations" title="Typography">
        Pretendard 하나로 13단계 스케일을 써요. 큰 글자일수록 자간을 좁히고, 모바일에서는 display·title 크기가 한 단계씩 줄어들어요.
      </PageHeader>
      <Section title="Scale" description="상단 플랫폼 토글을 Mobile로 바꾸면 아래 견본이 모바일 값으로 다시 렌더링돼요.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '24px 0' }}>
          {TYPE.map(([name]) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, alignItems: 'baseline' }}>
              <InlineCode>{name}</InlineCode>
              <span className={`kosa-${name}`} style={{ color: 'var(--kosa-color-text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                다람쥐 헌 쳇바퀴에 타고파
              </span>
            </div>
          ))}
        </div>
        <Table head={['토큰', 'Web (px)', 'Mobile (px)', 'Line height', 'Weight', '용도']} rows={TYPE.map((r) => r.map((c, i) => (i === 0 ? <InlineCode>{c}</InlineCode> : c)))} />
      </Section>
      <Section title="Line height" description="행간은 글자 크기마다 따로 정하지 않고 비율 3단계 중 역할에 맞는 것을 골라요. 비율이라 글자 크기가 바뀌어도 그대로 따라가요.">
        <Table head={['토큰', '비율', '용도']} rows={LEADING.map(([k, v, u]) => [<InlineCode>--kosa-{k}</InlineCode>, v, u])} />
      </Section>
      <Section title="사용">
        <Code>{`/* 클래스 */
<h1 class="kosa-title1">제목</h1>

/* CSS 토큰 — font 단축 속성 + 자간 */
.my-title {
  font: var(--kosa-type-title1);
  letter-spacing: var(--kosa-type-title1-ls);
  font-weight: var(--kosa-weight-bold);
}`}</Code>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------- Spacing */
const SPACES = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];

export function SpacingPage() {
  return (
    <>
      <PageHeader group="Foundations" title="Spacing">
        4px 그리드 기반이고, 아이콘 주변처럼 촘촘한 곳에만 2px·6px 보조 단계를 써요. 토큰 번호는 크기가 아니라 순서예요.
      </PageHeader>
      <Section title="Scale">
        <Table
          head={['토큰', '값', '']}
          rows={SPACES.map((v, i) => [
            <InlineCode>--kosa-space-{i}</InlineCode>,
            `${v}px`,
            <span style={{ display: 'block', width: v, height: 16, background: 'var(--kosa-color-fill-primary)', borderRadius: 2 }} />,
          ])}
        />
      </Section>
      <Section title="가이드">
        <Table
          head={['상황', '권장']}
          rows={[
            ['아이콘 ↔ 라벨', 'space-2 ~ space-3 (4–6px)'],
            ['같은 그룹 내 요소', 'space-4 ~ space-5 (8–12px)'],
            ['카드 내부 패딩', 'space-7 (20px)'],
            ['모바일 좌우 여백', 'space-7 (20px) = grid-margin'],
            ['섹션 간격', 'space-10 ~ space-12 (40–64px)'],
          ]}
        />
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- Radius */
export function RadiusPage() {
  return (
    <>
      <PageHeader group="Foundations" title="Radius">
        스케일 토큰 위에 역할 토큰을 하나 더 둬요. 컴포넌트는 역할 토큰만 보기 때문에, 상단의 형태 버튼처럼 톤 전체를 한 번에 바꿀 수 있어요.
      </PageHeader>
      <Section title="Scale">
        <Preview>
          {['xs', 'sm', 'md', 'lg', 'xl', 'full'].map((k) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: `var(--kosa-radius-${k})`, background: 'var(--kosa-color-fill-primary-subtle)', boxShadow: 'inset 0 0 0 1.5px var(--kosa-color-fill-primary)' }} />
              <p className="kosa-caption1" style={{ margin: '8px 0 0', color: 'var(--kosa-color-text-assistive)' }}>
                {k}
              </p>
            </div>
          ))}
        </Preview>
        <Table head={['토큰', '값']} rows={[['xs', '4px'], ['sm', '6px'], ['md', '10px'], ['lg', '14px'], ['xl', '20px'], ['full', '9999px']].map(([k, v]) => [<InlineCode>--kosa-radius-{k}</InlineCode>, v])} />
      </Section>
      <Section title="Role" description="data-shape=&quot;sharp&quot;를 지정하면 역할 토큰이 2–4px로 바뀌어 각진 메탈 톤이 돼요.">
        <Table
          head={['역할 토큰', '기본', 'sharp', '사용처']}
          rows={[
            ['control', 'md 10px', '2px', 'Button, TextField, Segmented'],
            ['control-sm', 'sm 6px', '2px', '작은 버튼'],
            ['card', 'lg 14px', '2px', 'Card, Toast, xl 버튼'],
            ['dialog', 'xl 20px', '4px', 'Dialog'],
            ['sheet', 'xl 20px', '4px', 'BottomSheet 상단'],
            ['pill', 'full', 'full', 'Chip, Switch, IconButton'],
          ].map(([k, ...r]) => [<InlineCode>--kosa-radius-{k}</InlineCode>, ...r])}
        />
        <Preview>
          <div data-shape="round" style={{ display: 'flex', gap: 12 }}>
            <Button>Round</Button>
          </div>
          <div data-shape="sharp" style={{ display: 'flex', gap: 12 }}>
            <Button variant="tertiary">Sharp</Button>
          </div>
        </Preview>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------- Elevation */
export function ElevationPage() {
  return (
    <>
      <PageHeader group="Foundations" title="Elevation">
        그림자는 최소한만 써요. 카드·다이얼로그·시트는 배경색 대비(회색 배경 위 흰 면)와 딤으로 구분하고, 그림자는 화면 위에 떠서 움직이는 작은 요소에만 둬요.
      </PageHeader>
      <Section title="Level">
        <Preview>
          {[1, 2].map((n) => (
            <div key={n} style={{ width: 132, height: 96, display: 'grid', placeItems: 'center', borderRadius: 'var(--kosa-radius-card)', background: 'var(--kosa-color-bg-elevated)', boxShadow: `var(--kosa-shadow-${n})` }}>
              <span className="kosa-label1">shadow-{n}</span>
            </div>
          ))}
        </Preview>
        <Table
          head={['토큰', '사용처']}
          rows={[
            ['shadow-1', 'Segmented 선택 면, 스위치 손잡이'],
            ['shadow-2', 'Toast, 플로팅 버튼, 드롭다운'],
          ].map(([k, v]) => [<InlineCode>--kosa-{k}</InlineCode>, v])}
        />
        <Callout>Card·Dialog·BottomSheet에는 그림자가 없어요. Dialog와 BottomSheet는 뒤의 딤이 면을 분리해 주고, 다크 모드에서는 면의 밝기(bg-elevated)로 높이를 표현해요.</Callout>
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- Layout */
export function LayoutPage() {
  return (
    <>
      <PageHeader group="Foundations" title="Layout & Platform">
        웹과 모바일은 같은 토큰 이름을 쓰고 값만 달라요. 실제 기기에서는 화면 폭으로, 문서·프로토타입에서는 data-platform 속성으로 결정돼요.
      </PageHeader>
      <Section title="Breakpoint & Grid">
        <Table
          head={['구간', '폭', 'Columns', 'Gutter', 'Margin']}
          rows={[
            ['Mobile', '~767px', '4', '16px', '20px'],
            ['Tablet', '768–1199px', '8', '20px', '32px'],
            ['Desktop', '1200px~', '12', '24px', '40px (max 1200)'],
          ]}
        />
        <Preview padded={false}>
          <div style={{ width: '100%', padding: '24px var(--kosa-grid-margin)', display: 'grid', gridTemplateColumns: 'repeat(var(--kosa-grid-columns), 1fr)', gridTemplateRows: '80px', gridAutoRows: 0, columnGap: 'var(--kosa-grid-gutter)', rowGap: 0, overflow: 'hidden' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ borderRadius: 4, background: 'var(--kosa-color-fill-primary-subtle)' }} />
            ))}
          </div>
        </Preview>
        <P>위 그리드는 현재 플랫폼의 columns·gutter·margin 토큰으로 그려요. 브라우저 폭을 줄이거나 상단 토글을 바꿔 보세요.</P>
      </Section>
      <Section title="플랫폼별 변형">
        <Table
          head={['토큰', 'Web', 'Mobile', '이유']}
          rows={[
            ['control-xl', '60px', '60px', '화면 하단 고정 CTA'],
            ['control-lg', '52px', '56px', '하단 CTA는 엄지로 누르기 쉽게'],
            ['control-md', '44px', '48px', '웹도 44px로 넉넉하게, 모바일은 한 단계 더'],
            ['control-sm', '36px', '40px', ''],
            ['control-xs', '28px', '32px', ''],
            ['touch-min', '32px', '44px', 'Checkbox·Switch 등 행 높이 하한'],
            ['type-title1', '32px', '26px', '좁은 화면 줄바꿈 최소화'],
          ].map(([k, ...r]) => [<InlineCode>--kosa-{k}</InlineCode>, ...r])}
        />
        <Preview platform="mobile" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="kosa-label2" style={{ color: 'var(--kosa-color-text-assistive)' }}>
            Mobile · control-lg 56px
          </span>
          <Button size="lg" fullWidth>
            예약하기
          </Button>
        </Preview>
        <Preview platform="desktop" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, width: 375 }}>
          <span className="kosa-label2" style={{ color: 'var(--kosa-color-text-assistive)' }}>
            Web · control-lg 52px
          </span>
          <Button size="lg" fullWidth>
            예약하기
          </Button>
        </Preview>
        <Callout>
          BottomSheet는 플랫폼 변형이 가장 큰 컴포넌트예요. 모바일에서는 하단 시트, 웹(768px 이상)에서는 중앙 패널로 자동으로 바뀌어요.
        </Callout>
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- Motion */
export function MotionPage() {
  const [on, setOn] = useState(false);
  return (
    <>
      <PageHeader group="Foundations" title="Motion">
        움직임은 짧고 목적이 분명하게. 들어올 때는 부드럽게 감속하고, 나갈 때는 빠르게 사라져요. 동작 줄이기 설정을 켜면 모든 시간이 0이 돼요.
      </PageHeader>
      <Section title="Duration">
        <Table
          head={['토큰', '값', '사용처']}
          rows={[
            ['instant', '80ms', '색 변화'],
            ['fast', '140ms', '호버, 눌림, 퇴장'],
            ['normal', '220ms', '토글, 탭 인디케이터'],
            ['slow', '340ms', '시트·다이얼로그 등장'],
          ].map(([k, ...r]) => [<InlineCode>--kosa-duration-{k}</InlineCode>, ...r])}
        />
      </Section>
      <Section title="Easing" description="버튼을 눌러 네 가지 커브를 비교해 보세요.">
        <Preview layout="stretch">
          {['standard', 'enter', 'exit', 'spring'].map((e) => (
            <div key={e} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: 12 }}>
              <InlineCode>{e}</InlineCode>
              <div style={{ height: 36, borderRadius: 'var(--kosa-radius-pill)', background: 'var(--kosa-color-fill-neutral)', position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--kosa-color-fill-primary)',
                    transform: on ? 'translateX(calc(min(560px, 60vw) - 40px))' : 'none',
                    transition: `transform 600ms var(--kosa-ease-${e})`,
                  }}
                />
              </div>
            </div>
          ))}
          <div>
            <Button variant="secondary" size="sm" onClick={() => setOn((v) => !v)}>
              재생
            </Button>
          </div>
        </Preview>
        <Table
          head={['토큰', '값', '사용처']}
          rows={[
            ['standard', 'cubic-bezier(0.2, 0, 0, 1)', '대부분의 상태 변화'],
            ['enter', 'cubic-bezier(0.05, 0.7, 0.1, 1)', '등장'],
            ['exit', 'cubic-bezier(0.3, 0, 0.8, 0.15)', '퇴장'],
            ['spring', 'cubic-bezier(0.34, 1.4, 0.64, 1)', '체크 표시, 스위치, 다이얼로그 — 살짝 튕김'],
          ].map(([k, ...r]) => [<InlineCode>--kosa-ease-{k}</InlineCode>, ...r])}
        />
      </Section>
      <Section title="눌림 피드백">
        <P>누를 수 있는 요소는 모두 살짝 줄어들어요 (Button 0.97, IconButton 0.92, Card 0.985). 색은 직접 바꾸지 않고, 반투명 상태 레이어를 위에 덮어요.</P>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------- Icon */
export function IconPage() {
  const copy = useCopy();
  return (
    <>
      <PageHeader group="Foundations" title="Iconography">
        24×24 그리드, 1.75px 라운드 선. 아이콘은 currentColor를 따라서 텍스트 색 토큰과 같이 움직여요.
      </PageHeader>
      <Section title={`Set (${Object.keys(icons).length})`} description="누르면 사용 코드가 복사돼요.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))', gap: 8, margin: '24px 0' }}>
          {(Object.keys(icons) as IconName[]).map((name) => (
            <Card key={name} interactive padding="sm" onClick={() => copy(`<Icon name="${name}" />`)}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                <Icon name={name} />
                <span className="kosa-caption1" style={{ color: 'var(--kosa-color-text-assistive)' }}>
                  {name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Size">
        <Preview>
          {[16, 20, 24, 32].map((s) => (
            <div key={s} style={{ textAlign: 'center' }}>
              <Icon name="star" size={s} />
              <p className="kosa-caption1" style={{ margin: '6px 0 0', color: 'var(--kosa-color-text-assistive)' }}>
                {s}
              </p>
            </div>
          ))}
        </Preview>
        <Code>{`<Icon name="heart" size={20} />            // 장식용 (aria-hidden)
<Icon name="heart" label="좋아요" />        // 의미가 있으면 label`}</Code>
      </Section>
    </>
  );
}
