import { PageHeader, Section, P, Table, InlineCode } from '../ui/Doc';

export function Principles() {
  return (
    <>
      <PageHeader group="시작하기" title="원칙">
        Kosa의 모든 결정은 아래 네 가지 원칙에서 출발해요. 애매한 상황에서는 이 순서대로 판단해요.
      </PageHeader>
      <Section title="1. 읽히는 것이 먼저">
        <P>
          브랜드 컬러 #FF4500은 흰 배경 위에서 대비가 3.4:1이라 본문 텍스트 기준(4.5:1)에 못 미쳐요. 그래서 브랜드 원색은 로고·일러스트·큰
          그래픽에만 쓰고, 텍스트와 버튼에는 채도를 거의 그대로 유지한 채 명도만 낮춘 <InlineCode>sakura-45</InlineCode>(4.6:1)를 써요.
        </P>
      </Section>
      <Section title="2. 경계는 선보다 면으로">
        <P>
          컴포넌트를 구분할 때는 테두리 대신 배경색 차이를 먼저 써요. 선은 탭 하단이나 사이드바처럼 레이아웃 구조상 꼭 필요한 곳에만 얇게
          써요. 입력창도 평소엔 채워진 면이고, 포커스·에러일 때만 링이 생겨요.
        </P>
      </Section>
      <Section title="3. 컴포넌트는 의미 토큰만 안다">
        <P>컴포넌트 CSS는 팔레트 값(sakura-50 등)을 직접 참조하지 않아요. 테마와 톤 변경은 시맨틱 토큰 매핑만 바꿔서 해결해요.</P>
        <Table
          head={['계층', '예시', '누가 참조하나']}
          rows={[
            ['Palette', <InlineCode>--kosa-sakura-45</InlineCode>, '시맨틱 토큰 파일만'],
            ['Semantic', <InlineCode>--kosa-color-fill-primary</InlineCode>, '컴포넌트, 화면'],
            ['Role', <InlineCode>--kosa-radius-control</InlineCode>, '컴포넌트'],
          ]}
        />
      </Section>
      <Section title="4. 같은 이름, 플랫폼별 값">
        <P>
          <InlineCode>--kosa-control-md</InlineCode>는 웹에서 40px, 모바일에서 44px이에요. 컴포넌트는 플랫폼을 몰라도 되고, 토큰이 플랫폼에
          맞는 값을 내려줘요. 터치 기기에서는 최소 터치 영역 44px을 보장해요.
        </P>
      </Section>
    </>
  );
}
