import { Badge, Button, Card, Chip, Icon, Switch } from '@kosa';
import palette from '../../kosa/tokens/palette.json';
import { P, Section } from '../ui/Doc';

const go = (id: string) => () => (window.location.hash = `/${id}`);

export function Overview() {
  return (
    <>
      <div className="doc-hero">
        <div>
          <h1 className="doc-hero__title">
            작은 앵무새 한 마리의
            <br />
            <em>얼굴색</em>에서 시작한
            <br />
            디자인 시스템
          </h1>
          <p className="doc-hero__lead">
            Kosa는 웹과 모바일을 함께 다루는 React 디자인 시스템이에요. 토큰 하나로 라이트·다크, 웹·모바일, 라운드·각진 톤까지 바꿀 수
            있도록 설계했어요.
          </p>
          <div className="doc-hero__actions">
            <Button size="lg" onClick={go('color')}>
              Foundations 보기
            </Button>
            <Button size="lg" variant="tertiary" onClick={go('proto-mobile')} style={{ background: 'rgb(255 255 255 / 0.1)', color: '#fff' }}>
              프로토타입 보기
            </Button>
          </div>
          <div className="doc-stat-row">
            <div className="doc-stat">
              <strong>8</strong>
              <span>Foundations</span>
            </div>
            <div className="doc-stat">
              <strong>14</strong>
              <span>Components</span>
            </div>
            <div className="doc-stat">
              <strong>2 × 2</strong>
              <span>Theme × Platform</span>
            </div>
          </div>
        </div>
        <div className="doc-hero__board" data-theme="dark">
          <div className="doc-hero__sw">
            {Object.values(palette.sakura).map((hex) => (
              <span key={hex} style={{ background: hex }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip selected>전체</Chip>
            <Chip>새 글</Chip>
            <Chip leadingIcon={<Icon name="star" />}>즐겨찾기</Chip>
          </div>
          <Card variant="elevated" padding="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <Badge tone="primary" size="sm">
                  NEW
                </Badge>
                <p className="kosa-heading2" style={{ margin: '8px 0 2px', color: 'var(--kosa-color-text-strong)' }}>
                  알림 받기
                </p>
                <p className="kosa-label2" style={{ margin: 0, color: 'var(--kosa-color-text-assistive)' }}>
                  새 소식이 오면 바로 알려드려요
                </p>
              </div>
              <Switch defaultChecked aria-label="알림 받기" />
            </div>
          </Card>
          <Button fullWidth size="lg">
            시작하기
          </Button>
        </div>
      </div>

      <Section title="구성">
        <div className="doc-grid-cards">
          {[
            ['color', 'Foundations', '색, 타이포, 간격, 라운드, 그림자, 레이아웃, 모션, 아이콘 — 모든 결정의 출발점'],
            ['button', 'Components', '토큰만 참조하는 14개 핵심 컴포넌트. 웹·모바일 크기 변형 내장'],
            ['proto-mobile', 'Prototypes', '컴포넌트를 조합해 만든 실제 화면. 시스템이 진짜 동작하는지 검증'],
          ].map(([id, title, desc]) => (
            <Card key={id} interactive padding="lg" onClick={go(id)}>
              <span className="doc-card-link">
                <strong>{title}</strong>
                <span>{desc}</span>
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="설치 & 사용">
        <P>빌드 없이 소스를 그대로 가져다 쓰는 구조예요. 스타일은 진입점에서 한 번만 불러오면 모든 토큰과 컴포넌트 스타일이 적용돼요.</P>
        <pre className="doc-code" style={{ borderRadius: 'var(--kosa-radius-card)' }}>
          <code>{`import { Button, ToastProvider } from '@kosa';

<html data-theme="dark" data-platform="mobile" data-shape="sharp">
  <ToastProvider>
    <Button variant="primary" size="lg">확인</Button>
  </ToastProvider>
</html>`}</code>
        </pre>
      </Section>
    </>
  );
}
