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
  type IconName,
} from '@kosa';
import { P, PageHeader, Section } from '../ui/Doc';
import './prototypes.css';

/* ============================================================ Mobile app */
interface Log {
  id: number;
  kind: string;
  text: string;
  time: string;
}
const KINDS: { value: string; label: string; icon: IconName }[] = [
  { value: 'meal', label: '식사', icon: 'heart' },
  { value: 'weight', label: '체중', icon: 'feather' },
  { value: 'play', label: '놀이', icon: 'star' },
  { value: 'health', label: '건강', icon: 'info' },
];

export function MobilePrototype() {
  return (
    <>
      <PageHeader group="Prototypes" title="모바일 앱">
        Kosa 컴포넌트만으로 조립한 반려조 케어 기록 앱이에요. 탭 전환, 필터, 기록 추가(BottomSheet), 토스트까지 실제로 동작해요.
      </PageHeader>
      <div className="proto-stage">
        <div className="doc-device proto-phone" data-platform="mobile">
          <PhoneApp />
        </div>
        <div className="proto-notes">
          <Section title="사용된 컴포넌트">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Tabs', 'Chip', 'Card', 'Badge', 'ListItem', 'IconButton', 'CountBadge', 'BottomSheet', 'RadioGroup', 'TextField', 'Button', 'Switch', 'Toast'].map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
          </Section>
          <Section title="확인 포인트">
            <P>• 화면 전체가 data-platform="mobile" 토큰으로 렌더링돼요 (버튼 52px, 터치 영역 44px).</P>
            <P>• + 버튼으로 기록을 추가하면 목록 맨 위에 쌓이고 토스트가 떠요.</P>
            <P>• 우측 상단에서 다크 모드·각진 형태로 바꿔도 화면이 그대로 따라와요.</P>
          </Section>
        </div>
      </div>
    </>
  );
}

function PhoneApp() {
  const toast = useToast();
  const [tab, setTab] = useState('today');
  const [filter, setFilter] = useState('all');
  const [sheet, setSheet] = useState(false);
  const [kind, setKind] = useState('meal');
  const [memo, setMemo] = useState('');
  const [logs, setLogs] = useState<Log[]>([
    { id: 3, kind: 'play', text: '거울 앞에서 20분 수다', time: '오후 2:10' },
    { id: 2, kind: 'weight', text: '52g · 지난주와 같아요', time: '오전 9:30' },
    { id: 1, kind: 'meal', text: '해바라기씨 5알, 펠렛 조금', time: '오전 8:05' },
  ]);
  const [bottomNav, setBottomNav] = useState('home');
  const visible = filter === 'all' ? logs : logs.filter((l) => l.kind === filter);

  const add = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
    const label = KINDS.find((k) => k.value === kind)!.label;
    setLogs((l) => [{ id: Date.now(), kind, text: memo || `${label} 기록`, time }, ...l]);
    setMemo('');
    setSheet(false);
    toast({ message: `${label} 기록을 추가했어요`, tone: 'positive' });
  };

  return (
    <div className="proto-app">
      <header className="proto-appbar">
        <div className="proto-avatar" aria-hidden="true" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="kosa-caption1" style={{ margin: 0, color: 'var(--kosa-color-text-assistive)' }}>
            모란앵무 · 2살
          </p>
          <p className="kosa-heading1" style={{ margin: 0, color: 'var(--kosa-color-text-strong)' }}>
            고사쿠라
          </p>
        </div>
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <IconButton label="알림" icon={<Icon name="bell" />} onClick={() => toast('새 알림이 없어요')} />
          <CountBadge dot style={{ position: 'absolute', top: 10, right: 11 }} />
        </span>
      </header>

      <Tabs
        fill
        label="보기"
        value={tab}
        onChange={setTab}
        items={[
          { value: 'today', label: '오늘' },
          { value: 'week', label: '이번 주' },
          { value: 'stats', label: '통계' },
        ]}
      />

      <div className="proto-scroll">
        {tab === 'today' && (
          <>
            <Card variant="elevated" className="proto-summary">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Badge tone="positive" size="sm">
                    컨디션 좋음
                  </Badge>
                  <p className="kosa-title3" style={{ margin: '10px 0 2px', color: 'var(--kosa-color-text-strong)' }}>
                    52g
                  </p>
                  <p className="kosa-label2" style={{ margin: 0, color: 'var(--kosa-color-text-assistive)' }}>
                    적정 체중 범위 (46–55g)
                  </p>
                </div>
                <div className="proto-ring" aria-label="오늘 목표 75% 달성">
                  <span className="kosa-label1">75%</span>
                </div>
              </div>
            </Card>

            <div className="proto-chips" role="group" aria-label="기록 필터">
              <Chip size="sm" selected={filter === 'all'} onClick={() => setFilter('all')}>
                전체 {logs.length}
              </Chip>
              {KINDS.map((k) => (
                <Chip key={k.value} size="sm" selected={filter === k.value} onClick={() => setFilter(k.value)}>
                  {k.label}
                </Chip>
              ))}
            </div>

            <List>
              {visible.map((l) => {
                const k = KINDS.find((x) => x.value === l.kind)!;
                return (
                  <ListItem
                    key={l.id}
                    leading={
                      <span className="proto-log-icon">
                        <Icon name={k.icon} size={20} />
                      </span>
                    }
                    title={l.text}
                    description={`${k.label} · ${l.time}`}
                    chevron
                    onClick={() => toast(`${k.label} 기록 상세는 준비 중이에요`)}
                  />
                );
              })}
              {!visible.length && (
                <p className="kosa-body2" style={{ textAlign: 'center', padding: '32px 0', color: 'var(--kosa-color-text-assistive)' }}>
                  아직 기록이 없어요
                </p>
              )}
            </List>
          </>
        )}
        {tab === 'week' && (
          <div style={{ padding: '20px' }}>
            <div className="proto-bars">
              {[48, 50, 51, 53, 52, 52, 52].map((v, i) => (
                <div key={i} className="proto-bar">
                  <span style={{ height: `${(v - 44) * 9}px` }} data-today={i === 6 || undefined} />
                  <small>{'월화수목금토일'[i]}</small>
                </div>
              ))}
            </div>
            <p className="kosa-label2" style={{ color: 'var(--kosa-color-text-assistive)', textAlign: 'center' }}>
              이번 주 체중 변화 (g)
            </p>
          </div>
        )}
        {tab === 'stats' && (
          <List>
            <ListItem title="체중 알림" description="급격히 변하면 알려드려요" trailing={<Switch defaultChecked aria-label="체중 알림" />} />
            <ListItem title="식사 리마인더" description="매일 오전 8시" trailing={<Switch aria-label="식사 리마인더" />} />
            <ListItem title="기록 내보내기" meta="CSV" chevron onClick={() => toast('내보내기를 준비했어요')} />
          </List>
        )}
      </div>

      <IconButton className="proto-fab" variant="primary" size="lg" label="기록 추가" icon={<Icon name="plus" />} onClick={() => setSheet(true)} />

      <nav className="proto-tabbar" aria-label="하단 메뉴">
        {(
          [
            ['home', 'home', '홈'],
            ['calendar', 'calendar', '캘린더'],
            ['user', 'user', '내 정보'],
          ] as [string, IconName, string][]
        ).map(([v, icon, label]) => (
          <button key={v} type="button" className="proto-tabbar__item" aria-current={bottomNav === v || undefined} onClick={() => setBottomNav(v)}>
            <Icon name={icon} size={22} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <BottomSheet
        open={sheet}
        onClose={() => setSheet(false)}
        title="기록 추가"
        description="고사쿠라의 오늘을 남겨요"
        actions={
          <>
            <Button size="lg" variant="tertiary" onClick={() => setSheet(false)}>
              취소
            </Button>
            <Button size="lg" onClick={add} style={{ flex: 2 }}>
              추가하기
            </Button>
          </>
        }
      >
        <RadioGroup label="종류" direction="horizontal" value={kind} onChange={setKind}>
          {KINDS.map((k) => (
            <Radio key={k.value} value={k.value} label={k.label} />
          ))}
        </RadioGroup>
        <div style={{ height: 12 }} />
        <TextField label="메모" placeholder="예: 해바라기씨 5알" value={memo} onChange={(e) => setMemo(e.target.value)} onClear={() => setMemo('')} />
      </BottomSheet>
    </div>
  );
}

/* ============================================================== Web form */
export function WebPrototype() {
  const toast = useToast();
  const [section, setSection] = useState('profile');
  const [name, setName] = useState('김유정');
  const [email, setEmail] = useState('hello@kosa.design');
  const [plan, setPlan] = useState('pro');
  const [agree, setAgree] = useState(true);
  const [notif, setNotif] = useState({ email: true, push: false, weekly: true });
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const emailError = email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? '이메일 형식을 확인해 주세요' : undefined;

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ message: '설정을 저장했어요', tone: 'positive' });
    }, 900);
  };

  const menu: [string, IconName, string][] = [
    ['profile', 'user', '프로필'],
    ['notify', 'bell', '알림'],
    ['plan', 'star', '요금제'],
    ['security', 'settings', '보안'],
  ];

  return (
    <>
      <PageHeader group="Prototypes" title="웹 설정 화면">
        데스크톱 웹 패턴 검증용 설정 화면이에요. 폼 검증, 저장 로딩, 위험 행동 확인 다이얼로그를 포함해요.
      </PageHeader>
      <div className="proto-web" data-platform="desktop">
        <aside className="proto-web__side">
          {menu.map(([v, icon, label]) => (
            <button key={v} type="button" className="proto-web__menu" aria-current={section === v || undefined} onClick={() => setSection(v)}>
              <Icon name={icon} size={20} />
              {label}
            </button>
          ))}
        </aside>
        <div className="proto-web__main">
          <div className="proto-web__head">
            <div>
              <h2 className="kosa-title3" style={{ margin: 0, color: 'var(--kosa-color-text-strong)' }}>
                {menu.find((m) => m[0] === section)![2]}
              </h2>
              <p className="kosa-body2" style={{ margin: '4px 0 0', color: 'var(--kosa-color-text-assistive)' }}>
                변경한 내용은 저장 버튼을 눌러야 반영돼요
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="tertiary">취소</Button>
              <Button loading={saving} disabled={!!emailError} onClick={save}>
                저장
              </Button>
            </div>
          </div>

          {section === 'profile' && (
            <div className="proto-web__grid">
              <Card variant="elevated" padding="lg">
                <h3 className="kosa-heading2" style={{ margin: '0 0 20px' }}>
                  기본 정보
                </h3>
                <div style={{ display: 'grid', gap: 20 }}>
                  <TextField label="이름" value={name} onChange={(e) => setName(e.target.value)} onClear={() => setName('')} />
                  <TextField label="이메일" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText="로그인과 알림에 사용돼요" />
                  <Checkbox label="새 기능 소식 받기" description="한 달에 한 번 이하로 보내요" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>
              </Card>
              <Card variant="elevated" padding="lg">
                <h3 className="kosa-heading2" style={{ margin: '0 0 8px' }}>
                  계정 삭제
                </h3>
                <p className="kosa-body2" style={{ margin: '0 0 20px', color: 'var(--kosa-color-text-alternative)' }}>
                  모든 기록이 영구적으로 삭제돼요.
                </p>
                <Button variant="danger" size="sm" onClick={() => setConfirm(true)}>
                  계정 삭제하기
                </Button>
              </Card>
            </div>
          )}
          {section === 'notify' && (
            <Card variant="elevated" padding="lg">
              <List>
                <ListItem title="이메일 알림" description="중요한 변경사항" trailing={<Switch checked={notif.email} onChange={(e) => setNotif({ ...notif, email: e.target.checked })} aria-label="이메일 알림" />} />
                <ListItem title="푸시 알림" description="브라우저 알림" trailing={<Switch checked={notif.push} onChange={(e) => setNotif({ ...notif, push: e.target.checked })} aria-label="푸시 알림" />} />
                <ListItem title="주간 리포트" description="매주 월요일 오전 9시" trailing={<Switch checked={notif.weekly} onChange={(e) => setNotif({ ...notif, weekly: e.target.checked })} aria-label="주간 리포트" />} />
              </List>
            </Card>
          )}
          {section === 'plan' && (
            <Card variant="elevated" padding="lg">
              <RadioGroup label="요금제" value={plan} onChange={setPlan}>
                <Radio value="free" label="Free" description="개인 사용, 기본 컴포넌트" />
                <Radio value="pro" label="Pro · 월 9,900원" description="팀 공유, 테마 커스터마이즈" />
                <Radio value="team" label="Team" description="문의 필요" disabled />
              </RadioGroup>
            </Card>
          )}
          {section === 'security' && (
            <Card variant="elevated" padding="lg">
              <div style={{ display: 'grid', gap: 20, maxWidth: 400 }}>
                <TextField label="현재 비밀번호" type="password" autoComplete="current-password" />
                <TextField label="새 비밀번호" type="password" helperText="8자 이상, 숫자 포함" autoComplete="new-password" />
              </div>
            </Card>
          )}
        </div>
      </div>
      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title="정말 계정을 삭제할까요?"
        description="삭제하면 되돌릴 수 없어요."
        actions={
          <>
            <Button variant="tertiary" onClick={() => setConfirm(false)} data-autofocus>
              취소
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setConfirm(false);
                toast({ message: '데모라서 실제로 삭제되진 않아요' });
              }}
            >
              삭제하기
            </Button>
          </>
        }
      />
    </>
  );
}
