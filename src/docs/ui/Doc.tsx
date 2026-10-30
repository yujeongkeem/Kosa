import { useState, type CSSProperties, type ReactNode } from 'react';
import { Icon, cx, useToast } from '@kosa';

export function PageHeader({ group, title, children }: { group: string; title: string; children?: ReactNode }) {
  return (
    <header className="doc-page-header">
      <p className="doc-eyebrow">{group}</p>
      <h1 className="doc-title">{title}</h1>
      {children && <p className="doc-lead">{children}</p>}
    </header>
  );
}

export function Section({ title, children, description }: { title: string; description?: ReactNode; children: ReactNode }) {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  return (
    <section className="doc-section" aria-labelledby={id}>
      <h2 id={id} className="doc-h2">
        {title}
      </h2>
      {description && <p className="doc-p">{description}</p>}
      {children}
    </section>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return <h3 className="doc-h3">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="doc-p">{children}</p>;
}

interface PreviewProps {
  children: ReactNode;
  code?: string;
  /** 미리보기 영역 정렬 */
  layout?: 'row' | 'column' | 'center' | 'stretch';
  /** mobile: 375px 프레임 안에 모바일 토큰으로 렌더 */
  platform?: 'mobile' | 'desktop';
  padded?: boolean;
  style?: CSSProperties;
}

export function Preview({ children, code, layout = 'row', platform, padded = true, style }: PreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const toast = useToast();
  return (
    <div className="doc-preview">
      <div className={cx('doc-preview__stage', !padded && 'doc-preview__stage--flush')} data-layout={layout}>
        {platform ? (
          <div className="doc-device" data-platform={platform} style={style}>
            {children}
          </div>
        ) : (
          <div className="doc-preview__inner" data-layout={layout} style={style}>
            {children}
          </div>
        )}
      </div>
      {code && (
        <>
          <div className="doc-preview__bar">
            <button type="button" className="doc-link-btn" onClick={() => setShowCode((v) => !v)} aria-expanded={showCode}>
              <Icon name={showCode ? 'chevron-up' : 'chevron-down'} size={16} />
              {showCode ? '코드 숨기기' : '코드 보기'}
            </button>
            <button
              type="button"
              className="doc-link-btn"
              onClick={() => {
                navigator.clipboard?.writeText(code.trim()).then(
                  () => toast({ message: '코드를 복사했어요', tone: 'positive' }),
                  () => toast({ message: '복사하지 못했어요', tone: 'negative' }),
                );
              }}
            >
              복사
            </button>
          </div>
          {showCode && <Code>{code}</Code>}
        </>
      )}
    </div>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="doc-code">
      <code>{children.trim()}</code>
    </pre>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="doc-inline-code">{children}</code>;
}

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <InlineCode>{r.name}</InlineCode>
              </td>
              <td className="doc-table__type">{r.type}</td>
              <td className="doc-table__type">{r.default ?? '—'}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Guide({ kind, children, caption }: { kind: 'do' | 'dont'; children: ReactNode; caption: ReactNode }) {
  return (
    <figure className="doc-guide" data-kind={kind}>
      <div className="doc-guide__stage">{children}</div>
      <figcaption className="doc-guide__caption">
        <strong>{kind === 'do' ? 'Do' : "Don't"}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

export function GuideGrid({ children }: { children: ReactNode }) {
  return <div className="doc-guide-grid">{children}</div>;
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="doc-callout">
      <Icon name="info" size={18} />
      <div>{children}</div>
    </div>
  );
}
