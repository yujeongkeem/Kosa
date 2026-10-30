import { useEffect, useState } from 'react';
import { Icon, IconButton, Tabs, cx } from '@kosa';
import { FLAT_NAV, NAV } from './nav';
import { useDocSetting } from './settings';
import { useHashRoute } from './useHashRoute';
import { PAGES } from './pages';

export function App() {
  const route = useHashRoute();
  const [theme, setTheme] = useDocSetting('theme');
  const [platform, setPlatform] = useDocSetting('platform');
  const [shape, setShape] = useDocSetting('shape');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => setNavOpen(false), [route]);

  const Page = PAGES[route] ?? PAGES.overview;
  const index = FLAT_NAV.findIndex((n) => n.id === route);
  const prev = FLAT_NAV[index - 1];
  const next = FLAT_NAV[index + 1];
  const isProto = route.startsWith('proto-');

  return (
    <div className="doc-app">
      <header className="doc-topbar">
        <IconButton className="doc-topbar__menu" label="메뉴" icon={<Icon name={navOpen ? 'close' : 'menu'} />} onClick={() => setNavOpen((v) => !v)} />
        <a href="#/overview" className="doc-logo" aria-label="Kosa 홈">
          <span className="doc-logo__mark" aria-hidden="true" />
          <span className="doc-logo__word">Kosa</span>
          <span className="doc-logo__ver">0.1</span>
        </a>
        <div className="doc-topbar__controls">
          <Tabs
            className="doc-topbar__seg doc-hide-sm"
            variant="segmented"
            label="플랫폼"
            value={platform}
            onChange={setPlatform}
            items={[
              { value: 'auto', label: 'Auto' },
              { value: 'desktop', label: 'Web' },
              { value: 'mobile', label: 'Mobile' },
            ]}
          />
          <IconButton
            label={shape === 'sharp' ? '라운드 형태로' : '각진 형태로'}
            icon={<ShapeIcon sharp={shape === 'sharp'} />}
            onClick={() => setShape(shape === 'sharp' ? 'round' : 'sharp')}
          />
          <IconButton
            label={theme === 'dark' ? '라이트 모드' : '다크 모드'}
            icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </div>
      </header>

      <div className="doc-shell">
        <nav className={cx('doc-nav', navOpen && 'doc-nav--open')} aria-label="문서 탐색">
          {NAV.map((g) => (
            <div key={g.title} className="doc-nav__group">
              <p className="doc-nav__title">{g.title}</p>
              {g.items.map((item) => (
                <a key={item.id} href={`#/${item.id}`} className="doc-nav__link" aria-current={route === item.id ? 'page' : undefined}>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
          <div className="doc-nav__group doc-show-sm">
            <p className="doc-nav__title">플랫폼 미리보기</p>
            <Tabs
              variant="segmented"
              label="플랫폼"
              value={platform}
              onChange={setPlatform}
              items={[
                { value: 'auto', label: 'Auto' },
                { value: 'desktop', label: 'Web' },
                { value: 'mobile', label: 'Mobile' },
              ]}
            />
          </div>
        </nav>
        {navOpen && <div className="doc-nav-dim" onClick={() => setNavOpen(false)} />}

        <main className={cx('doc-main', isProto && 'doc-main--wide')}>
          <Page />
          {(prev || next) && (
            <div className="doc-pager">
              {prev ? (
                <a href={`#/${prev.id}`} className="doc-pager__link">
                  <span>이전</span>
                  <strong>
                    <Icon name="arrow-left" size={18} /> {prev.label}
                  </strong>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a href={`#/${next.id}`} className="doc-pager__link doc-pager__link--next">
                  <span>다음</span>
                  <strong>
                    {next.label} <Icon name="arrow-right" size={18} />
                  </strong>
                </a>
              )}
            </div>
          )}
          <footer className="doc-footer">Kosa Design System · 고사쿠라(모란앵무)의 얼굴색에서 시작한 디자인 시스템</footer>
        </main>
      </div>
    </div>
  );
}

const svgProps = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

function MoonIcon() {
  return (
    <svg {...svgProps}>
      <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6L6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
    </svg>
  );
}
function ShapeIcon({ sharp }: { sharp: boolean }) {
  return <svg {...svgProps}>{sharp ? <rect x="5" y="5" width="14" height="14" rx="5" /> : <rect x="5" y="5" width="14" height="14" rx="0.5" />}</svg>;
}
