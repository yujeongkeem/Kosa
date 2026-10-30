import { useState } from 'react';
import {
  Badge,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  Chip,
  CountBadge,
  Dialog,
  Icon,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Switch,
  Tabs,
  TextField,
  useToast,
} from '@kosa';
import { Code, Guide, GuideGrid, InlineCode, P, PageHeader, Preview, PropsTable, Section, SubTitle, Table } from '../ui/Doc';

/* ----------------------------------------------------------------- Button */
export function ButtonPage() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <PageHeader group="Components" title="Button">
        사용자가 행동을 실행하게 하는 기본 요소예요. 한 화면에서 primary는 하나만 써서 가장 중요한 행동이 분명하게 보이게 해요.
      </PageHeader>
      <Section title="Variant" description="중요도 순서대로 primary → secondary → tertiary → ghost. danger는 되돌릴 수 없는 행동에만 써요.">
        <Preview
          code={`<Button variant="primary">확인</Button>
<Button variant="secondary">임시저장</Button>
<Button variant="tertiary">취소</Button>
<Button variant="ghost">건너뛰기</Button>
<Button variant="danger">삭제</Button>`}
        >
          <Button variant="primary">확인</Button>
          <Button variant="secondary">임시저장</Button>
          <Button variant="tertiary">취소</Button>
          <Button variant="ghost">건너뛰기</Button>
          <Button variant="danger">삭제</Button>
        </Preview>
      </Section>
      <Section title="Size" description="높이는 플랫폼 토큰을 따라요. 같은 lg라도 웹은 48px, 모바일은 52px이에요.">
        <Preview code={`<Button size="xl">xl</Button>  // 56 · 화면 하단 CTA\n<Button size="lg">lg</Button>  // 48 / 52\n<Button size="md">md</Button>  // 40 / 44\n<Button size="sm">sm</Button>  // 32 / 36\n<Button size="xs">xs</Button>  // 24 / 28`}>
          <Button size="xl">xl</Button>
          <Button size="lg">lg</Button>
          <Button size="md">md</Button>
          <Button size="sm">sm</Button>
          <Button size="xs">xs</Button>
        </Preview>
      </Section>
      <Section title="State & Icon">
        <Preview code={`<Button leadingIcon={<Icon name="plus" />}>추가</Button>\n<Button variant="tertiary" trailingIcon={<Icon name="chevron-right" />}>더보기</Button>\n<Button loading>저장</Button>\n<Button disabled>비활성</Button>`}>
          <Button leadingIcon={<Icon name="plus" />}>추가</Button>
          <Button variant="tertiary" trailingIcon={<Icon name="chevron-right" />}>
            더보기
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1600);
            }}
          >
            눌러서 로딩
          </Button>
          <Button disabled>비활성</Button>
        </Preview>
      </Section>
      <Section title="모바일 하단 CTA" description="모바일에서 화면의 주요 행동은 하단에 꽉 찬 버튼으로 둬요. 보조 행동이 있으면 왼쪽에 tertiary를 1:2 비율로 둬요.">
        <Preview platform="mobile" style={{ padding: 20, display: 'flex', gap: 8 }}>
          <Button size="xl" variant="tertiary" style={{ flex: 1 }}>
            이전
          </Button>
          <Button size="xl" style={{ flex: 2 }}>
            다음
          </Button>
        </Preview>
      </Section>
      <Section title="가이드">
        <GuideGrid>
          <Guide kind="do" caption="primary는 한 영역에 하나. 나머지는 낮은 중요도로.">
            <Button variant="tertiary">취소</Button>
            <Button>저장</Button>
          </Guide>
          <Guide kind="dont" caption="primary를 나란히 두면 무엇을 눌러야 할지 흐려져요.">
            <Button>취소</Button>
            <Button>저장</Button>
          </Guide>
        </GuideGrid>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'", default: "'primary'", description: '중요도' },
            { name: 'size', type: "'xl' | 'lg' | 'md' | 'sm' | 'xs'", default: "'md'", description: '높이 (플랫폼별 값)' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: '부모 폭을 꽉 채움' },
            { name: 'loading', type: 'boolean', default: 'false', description: '스피너 표시 + 클릭 차단, 폭은 유지' },
            { name: 'leadingIcon / trailingIcon', type: 'ReactNode', description: '라벨 양옆 아이콘' },
            { name: '...rest', type: 'ButtonHTMLAttributes', description: 'onClick, disabled 등 기본 button 속성' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------- IconButton */
export function IconButtonPage() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <PageHeader group="Components" title="IconButton">
        아이콘만으로 의미가 분명한 행동에 써요. 눈에 보이는 라벨이 없으므로 label prop이 필수예요 — 스크린리더와 툴팁에 쓰여요.
      </PageHeader>
      <Section title="Variant & Size">
        <Preview code={`<IconButton label="검색" icon={<Icon name="search" />} />\n<IconButton variant="filled" label="더보기" icon={<Icon name="more" />} />\n<IconButton variant="primary" label="추가" icon={<Icon name="plus" />} />`}>
          <IconButton label="검색" icon={<Icon name="search" />} />
          <IconButton variant="filled" label="더보기" icon={<Icon name="more" />} />
          <IconButton variant="primary" label="추가" icon={<Icon name="plus" />} />
          <span style={{ width: 24 }} />
          <IconButton size="lg" variant="filled" label="설정" icon={<Icon name="settings" />} />
          <IconButton size="md" variant="filled" label="설정" icon={<Icon name="settings" />} />
          <IconButton size="sm" variant="filled" label="설정" icon={<Icon name="settings" />} />
        </Preview>
      </Section>
      <Section title="토글">
        <Preview>
          <IconButton
            label={liked ? '좋아요 취소' : '좋아요'}
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            icon={<Icon name="heart" style={{ color: liked ? 'var(--kosa-color-brand)' : undefined, fill: liked ? 'currentColor' : 'none' }} />}
          />
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <IconButton label="알림 3개" icon={<Icon name="bell" />} />
            <CountBadge count={3} style={{ position: 'absolute', top: 4, right: 2 }} />
          </span>
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: '필수. aria-label + title' },
            { name: 'icon', type: 'ReactNode', description: '보통 <Icon />' },
            { name: 'variant', type: "'ghost' | 'filled' | 'primary'", default: "'ghost'", description: '' },
            { name: 'size', type: "'lg' | 'md' | 'sm'", default: "'md'", description: '정사각형 크기 = control 토큰' },
          ]}
        />
      </Section>
    </>
  );
}

/* -------------------------------------------------------------- TextField */
export function TextFieldPage() {
  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('kosa@');
  const emailError = email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? '이메일 형식을 확인해 주세요' : undefined;
  return (
    <>
      <PageHeader group="Components" title="TextField">
        평소엔 채워진 면으로 존재감을 낮추고, 포커스와 에러 상태에서만 테두리 링이 생겨요. 라벨은 항상 입력창 위에 보이게 둬요.
      </PageHeader>
      <Section title="기본">
        <Preview
          layout="column"
          code={`<TextField label="이름" value={name} onChange={(e) => setName(e.target.value)} onClear={() => setName('')} />
<TextField label="이메일" error={emailError} helperText="로그인에 사용돼요" />
<TextField label="비밀번호" type="password" />`}
        >
          <TextField label="이름" placeholder="이름을 입력해 주세요" value={name} onChange={(e) => setName(e.target.value)} onClear={() => setName('')} />
          <TextField label="이메일" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText="로그인에 사용돼요" />
          <TextField label="비밀번호" type="password" placeholder="8자 이상" />
        </Preview>
      </Section>
      <Section title="Slot & Size">
        <Preview layout="column">
          <TextField size="md" placeholder="검색" leading={<Icon name="search" size={20} />} aria-label="검색" />
          <TextField label="금액" placeholder="0" inputMode="numeric" trailing={<span className="kosa-body2">원</span>} />
          <TextField label="비활성" value="수정할 수 없어요" disabled readOnly />
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: '상단 라벨 (htmlFor 자동 연결)' },
            { name: 'helperText', type: 'string', description: '하단 안내' },
            { name: 'error', type: 'string', description: '값이 있으면 에러 상태 + 메시지 (helperText 대체)' },
            { name: 'size', type: "'lg' | 'md'", default: "'lg'", description: '' },
            { name: 'leading / trailing', type: 'ReactNode', description: '좌우 슬롯' },
            { name: 'onClear', type: '() => void', description: '값이 있을 때 지우기 버튼 노출' },
            { name: "type='password'", type: '', description: '보기/숨기기 토글 자동 추가' },
          ]}
        />
      </Section>
    </>
  );
}

/* ---------------------------------------------------------- Checkbox ----- */
export function CheckboxPage() {
  const [items, setItems] = useState([true, false, false]);
  const all = items.every(Boolean);
  const some = items.some(Boolean) && !all;
  const labels = ['(필수) 서비스 이용약관', '(필수) 개인정보 수집·이용', '(선택) 마케팅 정보 수신'];
  return (
    <>
      <PageHeader group="Components" title="Checkbox">
        여러 항목 중 0개 이상을 고를 때 써요. 바로 적용되는 설정에는 Switch를, 하나만 고를 때는 Radio를 써요.
      </PageHeader>
      <Section title="전체 동의 패턴" description="하위 항목이 일부만 선택되면 상위 체크박스는 indeterminate 상태가 돼요.">
        <Preview layout="column">
          <Checkbox label="전체 동의" checked={all} indeterminate={some} onChange={() => setItems(items.map(() => !all))} />
          <div style={{ paddingInlineStart: 30, display: 'flex', flexDirection: 'column' }}>
            {labels.map((l, i) => (
              <Checkbox key={l} size="sm" label={l} checked={items[i]} onChange={() => setItems(items.map((v, j) => (j === i ? !v : v)))} />
            ))}
          </div>
        </Preview>
      </Section>
      <Section title="State">
        <Preview>
          <Checkbox label="기본" />
          <Checkbox label="선택" defaultChecked />
          <Checkbox label="비활성" disabled />
          <Checkbox label="선택 비활성" disabled defaultChecked />
          <Checkbox label="설명 포함" description="보조 설명이 라벨 아래에 붙어요" />
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'label / description', type: 'ReactNode', description: '' },
            { name: 'indeterminate', type: 'boolean', default: 'false', description: '일부 선택' },
            { name: 'size', type: "'md' | 'sm'", default: "'md'", description: '22 / 18px' },
            { name: '...rest', type: 'InputHTMLAttributes', description: 'checked, onChange 등' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ Radio */
export function RadioPage() {
  const [v, setV] = useState('card');
  return (
    <>
      <PageHeader group="Components" title="Radio">
        서로 배타적인 선택지 중 하나를 고를 때 써요. 항상 RadioGroup으로 묶고, 선택지가 5개를 넘으면 BottomSheet 목록을 고려해요.
      </PageHeader>
      <Section title="기본">
        <Preview
          layout="column"
          code={`<RadioGroup label="결제 수단" value={v} onChange={setV}>
  <Radio value="card" label="신용·체크카드" />
  <Radio value="bank" label="계좌이체" description="수수료 없음" />
  <Radio value="phone" label="휴대폰 결제" disabled />
</RadioGroup>`}
        >
          <RadioGroup label="결제 수단" value={v} onChange={setV}>
            <Radio value="card" label="신용·체크카드" />
            <Radio value="bank" label="계좌이체" description="수수료 없음" />
            <Radio value="phone" label="휴대폰 결제" disabled />
          </RadioGroup>
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'RadioGroup.value / onChange', type: 'string / (v) => void', description: '제어 컴포넌트' },
            { name: 'RadioGroup.direction', type: "'vertical' | 'horizontal'", default: "'vertical'", description: '' },
            { name: 'Radio.value', type: 'string', description: '필수' },
            { name: 'Radio.label / description', type: 'ReactNode', description: '' },
          ]}
        />
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- Switch */
export function SwitchPage() {
  const [push, setPush] = useState(true);
  return (
    <>
      <PageHeader group="Components" title="Switch">
        누르는 즉시 적용되는 켜기/끄기 설정에 써요. 저장 버튼을 눌러야 반영된다면 Checkbox가 맞아요.
      </PageHeader>
      <Section title="기본">
        <Preview>
          <Switch label="기본" />
          <Switch label="켜짐" defaultChecked />
          <Switch label="비활성" disabled />
          <Switch size="sm" label="작게" defaultChecked />
        </Preview>
      </Section>
      <Section title="설정 화면 패턴" description="라벨을 왼쪽에, 스위치를 오른쪽 끝에 두는 배치예요.">
        <Preview platform="mobile" style={{ padding: '12px 20px' }}>
          <Switch labelPosition="start" label="푸시 알림" checked={push} onChange={(e) => setPush(e.target.checked)} style={{ width: '100%' }} />
          <Switch labelPosition="start" label="이벤트 소식" style={{ width: '100%' }} />
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'label', type: 'ReactNode', description: '' },
            { name: 'labelPosition', type: "'start' | 'end'", default: "'end'", description: "'start'면 라벨 왼쪽, 양 끝 정렬" },
            { name: 'size', type: "'md' | 'sm'", default: "'md'", description: '50×30 / 38×22' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------- Chip */
export function ChipPage() {
  const tags = ['전체', '오늘', '이번 주', '인기', '근처'];
  const [sel, setSel] = useState('전체');
  const [multi, setMulti] = useState<string[]>(['조용한']);
  return (
    <>
      <PageHeader group="Components" title="Chip">
        목록을 거르거나 짧은 선택지를 고를 때 써요. 선택된 칩은 반전 면으로 바뀌어서 브랜드 색을 아끼고 대비를 확보해요.
      </PageHeader>
      <Section title="단일 선택 (필터)">
        <Preview code={`<Chip selected={sel === t} onClick={() => setSel(t)}>{t}</Chip>`}>
          {tags.map((t) => (
            <Chip key={t} selected={sel === t} onClick={() => setSel(t)}>
              {t}
            </Chip>
          ))}
        </Preview>
      </Section>
      <Section title="다중 선택 · 아이콘 · 드롭다운">
        <Preview>
          {['조용한', '넓은', '주차'].map((t) => (
            <Chip key={t} size="sm" selected={multi.includes(t)} onClick={() => setMulti((m) => (m.includes(t) ? m.filter((x) => x !== t) : [...m, t]))}>
              {t}
            </Chip>
          ))}
          <Chip leadingIcon={<Icon name="map-pin" />}>성수동</Chip>
          <Chip dropdown>정렬: 추천순</Chip>
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'selected', type: 'boolean', default: 'false', description: 'aria-pressed 연동' },
            { name: 'size', type: "'md' | 'sm'", default: "'md'", description: 'control-sm / control-xs' },
            { name: 'leadingIcon', type: 'ReactNode', description: '' },
            { name: 'dropdown', type: 'boolean', description: '아래 화살표, 시트/메뉴를 여는 칩' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ Badge */
export function BadgePage() {
  const tones = ['primary', 'neutral', 'positive', 'negative', 'caution', 'info'] as const;
  return (
    <>
      <PageHeader group="Components" title="Badge">
        상태나 분류를 짧게 표시하는 라벨이에요. 누를 수 없으므로 Chip과 혼동되지 않게 각진 사각형(xs radius)을 써요.
      </PageHeader>
      <Section title="Tone · Variant">
        <Preview layout="stretch">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tones.map((t) => (
              <Badge key={t} tone={t}>
                {t}
              </Badge>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tones.map((t) => (
              <Badge key={t} tone={t} variant="solid">
                {t}
              </Badge>
            ))}
          </div>
        </Preview>
      </Section>
      <Section title="CountBadge">
        <Preview>
          <CountBadge count={3} />
          <CountBadge count={42} />
          <CountBadge count={120} />
          <CountBadge dot />
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'tone', type: "'primary' | 'neutral' | 'positive' | 'negative' | 'caution' | 'info'", default: "'neutral'", description: '' },
            { name: 'variant', type: "'soft' | 'solid'", default: "'soft'", description: '' },
            { name: 'CountBadge.count / max / dot', type: 'number / number / boolean', default: 'max 99', description: '0이면 렌더하지 않음' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------- Card */
export function CardPage() {
  return (
    <>
      <PageHeader group="Components" title="Card">
        관련된 정보를 한 덩어리로 묶어요. 경계는 테두리 대신 배경 대비(filled)나 그림자(elevated)로 표현해요.
      </PageHeader>
      <Section title="Variant">
        <Preview style={{ alignItems: 'stretch' }}>
          {(['filled', 'elevated'] as const).map((v) => (
            <Card key={v} variant={v} style={{ width: 240 }}>
              <Badge tone="primary" size="sm">
                {v}
              </Badge>
              <p className="kosa-heading2" style={{ margin: '12px 0 4px', color: 'var(--kosa-color-text-strong)' }}>
                이번 주 리포트
              </p>
              <p className="kosa-label1" style={{ margin: 0, color: 'var(--kosa-color-text-assistive)' }}>
                운동 4회 · 목표 달성률 80%
              </p>
            </Card>
          ))}
          <Card variant="elevated" interactive style={{ width: 240 }} onClick={() => undefined}>
            <Badge size="sm">interactive</Badge>
            <p className="kosa-heading2" style={{ margin: '12px 0 4px', color: 'var(--kosa-color-text-strong)' }}>
              눌러보세요
            </p>
            <p className="kosa-label1" style={{ margin: 0, color: 'var(--kosa-color-text-assistive)' }}>
              호버·눌림·포커스 피드백 포함
            </p>
          </Card>
        </Preview>
      </Section>
      <Section title="가이드">
        <GuideGrid>
          <Guide kind="do" caption="입력창·칩처럼 채워진 면을 가진 요소는 elevated 카드나 기본 배경 위에 둬요.">
            <Card variant="elevated" style={{ width: '100%' }}>
              <TextField size="md" placeholder="이름" aria-label="이름" />
            </Card>
          </Guide>
          <Guide kind="dont" caption="filled 카드와 입력창은 같은 면 색이라 경계가 사라져요.">
            <Card variant="filled" style={{ width: '100%' }}>
              <TextField size="md" placeholder="이름" aria-label="이름" />
            </Card>
          </Guide>
        </GuideGrid>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'variant', type: "'filled' | 'elevated' | 'plain'", default: "'filled'", description: '' },
            { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: '12 / 20 / 32px' },
            { name: 'interactive', type: 'boolean', description: 'role=button, Enter/Space 동작, 눌림 피드백' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------- Tabs */
export function TabsPage() {
  const [a, setA] = useState('home');
  const [b, setB] = useState('week');
  return (
    <>
      <PageHeader group="Components" title="Tabs">
        같은 층위의 콘텐츠를 전환해요. line은 화면 구획 전환에, segmented는 같은 데이터의 보기 방식 전환에 써요. 방향키로 이동할 수 있어요.
      </PageHeader>
      <Section title="Line">
        <Preview layout="stretch">
          <Tabs
            label="카테고리"
            value={a}
            onChange={setA}
            items={[
              { value: 'home', label: '홈' },
              { value: 'feed', label: '피드' },
              { value: 'saved', label: '저장' },
              { value: 'disabled', label: '준비중', disabled: true },
            ]}
          />
        </Preview>
        <Preview platform="mobile">
          <Tabs fill label="모바일 탭" value={a} onChange={setA} items={[{ value: 'home', label: '홈' }, { value: 'feed', label: '피드' }, { value: 'saved', label: '저장' }]} />
          <div style={{ height: 80 }} />
        </Preview>
      </Section>
      <Section title="Segmented">
        <Preview layout="column">
          <Tabs variant="segmented" label="기간" value={b} onChange={setB} items={[{ value: 'day', label: '일' }, { value: 'week', label: '주' }, { value: 'month', label: '월' }]} />
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'items', type: 'TabItem[]', description: '{ value, label, disabled? }' },
            { name: 'value / onChange', type: 'string / (v) => void', description: '' },
            { name: 'variant', type: "'line' | 'segmented'", default: "'line'", description: '' },
            { name: 'fill', type: 'boolean', description: 'line 탭 균등 분할' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------- List */
export function ListPage() {
  const [on, setOn] = useState(true);
  return (
    <>
      <PageHeader group="Components" title="ListItem">
        설정, 메뉴, 검색 결과처럼 같은 형태가 반복되는 행이에요. 행 사이를 선으로 나누지 않고 여백과 정렬로 구분해요.
      </PageHeader>
      <Section title="패턴">
        <Preview platform="mobile" padded>
          <List>
            <ListItem leading={<Icon name="user" />} title="계정 정보" chevron onClick={() => undefined} />
            <ListItem leading={<Icon name="bell" />} title="알림" description="푸시, 이메일" trailing={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} aria-label="알림" />} />
            <ListItem leading={<Icon name="settings" />} title="언어" meta="한국어" chevron onClick={() => undefined} />
            <ListItem leading={<Icon name="info" />} title="버전 정보" meta="0.1.0" />
          </List>
        </Preview>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'title / description', type: 'ReactNode', description: '' },
            { name: 'leading / trailing', type: 'ReactNode', description: '아이콘·아바타 / 스위치·버튼' },
            { name: 'meta', type: 'ReactNode', description: '오른쪽 값 텍스트' },
            { name: 'chevron', type: 'boolean', description: '다른 화면으로 이동' },
            { name: 'onClick', type: '() => void', description: '있으면 button으로 렌더 + 눌림 피드백' },
          ]}
        />
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- Dialog */
export function DialogPage() {
  const [open, setOpen] = useState<null | 'confirm' | 'danger' | 'vertical'>(null);
  const close = () => setOpen(null);
  const toast = useToast();
  return (
    <>
      <PageHeader group="Components" title="Dialog">
        흐름을 멈추고 결정을 받아야 할 때만 써요. 제목은 질문형으로, 버튼은 결과가 드러나는 동사로 써요 ("확인" 대신 "삭제하기").
      </PageHeader>
      <Section title="예시">
        <Preview>
          <Button variant="tertiary" onClick={() => setOpen('confirm')}>
            기본
          </Button>
          <Button variant="danger" onClick={() => setOpen('danger')}>
            삭제 확인
          </Button>
          <Button variant="tertiary" onClick={() => setOpen('vertical')}>
            세로 버튼
          </Button>
        </Preview>
        <Code>{`<Dialog
  open={open}
  onClose={close}
  title="기록을 삭제할까요?"
  description="삭제한 기록은 되돌릴 수 없어요."
  actions={<>
    <Button variant="tertiary" onClick={close}>취소</Button>
    <Button variant="danger" onClick={remove}>삭제하기</Button>
  </>}
/>`}</Code>
      </Section>
      <Dialog
        open={open === 'confirm'}
        onClose={close}
        title="변경사항을 저장할까요?"
        description="저장하지 않으면 작성한 내용이 사라져요."
        actions={
          <>
            <Button variant="tertiary" onClick={close}>
              나가기
            </Button>
            <Button
              data-autofocus
              onClick={() => {
                close();
                toast({ message: '저장했어요', tone: 'positive' });
              }}
            >
              저장하기
            </Button>
          </>
        }
      />
      <Dialog
        open={open === 'danger'}
        onClose={close}
        title="기록을 삭제할까요?"
        description={'삭제한 기록은 되돌릴 수 없어요.\n정말 삭제하시겠어요?'}
        actions={
          <>
            <Button variant="tertiary" onClick={close} data-autofocus>
              취소
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                close();
                toast({ message: '삭제했어요', action: { label: '되돌리기', onClick: () => toast('되돌렸어요') } });
              }}
            >
              삭제하기
            </Button>
          </>
        }
      />
      <Dialog
        open={open === 'vertical'}
        onClose={close}
        title="알림을 켜시겠어요?"
        description="새 소식과 리마인더를 놓치지 않게 알려드려요."
        actionsLayout="vertical"
        actions={
          <>
            <Button size="lg" onClick={close} data-autofocus>
              알림 켜기
            </Button>
            <Button size="lg" variant="ghost" onClick={close}>
              나중에
            </Button>
          </>
        }
      />
      <Section title="접근성">
        <Table
          head={['동작', '처리']}
          rows={[
            ['열릴 때', 'data-autofocus 요소(없으면 패널)로 포커스 이동, 배경 스크롤 잠금'],
            ['Tab', '다이얼로그 안에서만 순환'],
            ['Esc / 바깥 클릭', '닫기 (dismissible=false면 바깥 클릭 무시)'],
            ['닫힐 때', '열기 전 요소로 포커스 복귀'],
          ]}
        />
        <P>
          위험한 행동의 다이얼로그는 <InlineCode>취소</InlineCode>에 기본 포커스를 둬서 Enter 실수를 막아요.
        </P>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'open / onClose', type: 'boolean / () => void', description: '' },
            { name: 'title / description', type: 'ReactNode', description: '' },
            { name: 'actions', type: 'ReactNode', description: '하단 버튼' },
            { name: 'actionsLayout', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '' },
            { name: 'dismissible', type: 'boolean', default: 'true', description: '바깥 클릭 닫기' },
            { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: '360 / 480px' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------ BottomSheet */
export function BottomSheetPage() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('rec');
  const [draft, setDraft] = useState(sort);
  return (
    <>
      <PageHeader group="Components" title="BottomSheet">
        현재 맥락을 유지한 채 선택지나 부가 정보를 보여줘요. 모바일에서는 하단 시트(손잡이를 끌어 닫기), 웹에서는 중앙 패널로 자동 변형돼요.
      </PageHeader>
      <Section title="예시" description="상단 플랫폼 토글을 Mobile/Web으로 바꿔 열어 보세요.">
        <Preview>
          <Chip
            dropdown
            onClick={() => {
              setDraft(sort);
              setOpen(true);
            }}
          >
            정렬: {{ rec: '추천순', new: '최신순', near: '가까운순' }[sort]}
          </Chip>
        </Preview>
        <Code>{`<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="정렬"
  actions={<Button size="lg" onClick={apply}>적용하기</Button>}
>
  <RadioGroup value={draft} onChange={setDraft}>…</RadioGroup>
</BottomSheet>`}</Code>
      </Section>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="정렬"
        actions={
          <Button
            size="lg"
            onClick={() => {
              setSort(draft);
              setOpen(false);
            }}
          >
            적용하기
          </Button>
        }
      >
        <RadioGroup label="정렬" value={draft} onChange={setDraft}>
          <Radio value="rec" label="추천순" />
          <Radio value="new" label="최신순" />
          <Radio value="near" label="가까운순" description="위치 권한이 필요해요" />
        </RadioGroup>
      </BottomSheet>
      <Section title="Dialog와의 차이">
        <Table
          head={['', 'Dialog', 'BottomSheet']}
          rows={[
            ['목적', '결정 요청 (예/아니오)', '선택, 필터, 부가 정보'],
            ['내용 길이', '짧게', '스크롤 가능'],
            ['모바일', '중앙', '하단 + 끌어서 닫기'],
            ['웹', '중앙 360px', '중앙 440px'],
          ]}
        />
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'open / onClose', type: 'boolean / () => void', description: '' },
            { name: 'title / description', type: 'ReactNode', description: '' },
            { name: 'actions', type: 'ReactNode', description: '하단 고정 버튼' },
            { name: 'draggable', type: 'boolean', default: 'true', description: '손잡이, 96px 이상 끌면 닫힘' },
          ]}
        />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ Toast */
export function ToastPage() {
  const toast = useToast();
  return (
    <>
      <PageHeader group="Components" title="Toast">
        행동의 결과를 짧게 알려주고 사라져요. 흐름을 막지 않으므로, 사용자가 반드시 확인해야 하는 오류는 Dialog나 인라인 메시지로 보여줘요.
      </PageHeader>
      <Section title="예시">
        <Preview
          code={`const toast = useToast();

toast('링크를 복사했어요');
toast({ message: '저장했어요', tone: 'positive' });
toast({ message: '네트워크 연결을 확인해 주세요', tone: 'negative' });
toast({ message: '삭제했어요', action: { label: '되돌리기', onClick: undo } });`}
        >
          <Button variant="tertiary" onClick={() => toast('링크를 복사했어요')}>
            기본
          </Button>
          <Button variant="tertiary" onClick={() => toast({ message: '저장했어요', tone: 'positive' })}>
            성공
          </Button>
          <Button variant="tertiary" onClick={() => toast({ message: '네트워크 연결을 확인해 주세요', tone: 'negative' })}>
            실패
          </Button>
          <Button variant="tertiary" onClick={() => toast({ message: '삭제했어요', action: { label: '되돌리기', onClick: () => toast('되돌렸어요') } })}>
            액션 포함
          </Button>
        </Preview>
      </Section>
      <Section title="규칙">
        <Table
          head={['항목', '값']}
          rows={[
            ['위치', '하단 중앙, safe-area 위'],
            ['노출 시간', '기본 3초 (duration으로 조정)'],
            ['동시 노출', '최대 3개, 오래된 것부터 사라짐'],
            ['색', '테마와 관계없이 어두운 반투명 면 — 어떤 화면 위에서도 떠 보이게'],
            ['문구', '"~했어요" 완료형, 한 줄'],
          ]}
        />
        <SubTitle>설정</SubTitle>
        <Code>{`// 앱 최상단에 한 번
<ToastProvider><App /></ToastProvider>`}</Code>
      </Section>
    </>
  );
}
