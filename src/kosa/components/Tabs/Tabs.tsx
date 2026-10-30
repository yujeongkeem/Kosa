import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldId } from '../../utils/useId';
import './Tabs.css';

export interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  /** line: 콘텐츠 상단 탭 / segmented: 같은 맥락 안 보기 전환 */
  variant?: 'line' | 'segmented';
  /** line 탭을 가로 폭 균등 분할 (모바일 상단 탭) */
  fill?: boolean;
  label?: string;
  className?: string;
}

export function Tabs({ items, value, onChange, variant = 'line', fill, label, className }: TabsProps) {
  const baseId = useFieldId();
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !active) return;
    const update = () => setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
    update();
    // 웹폰트 로드 후 탭 폭이 바뀌므로 다시 측정
    document.fonts?.ready.then(update);
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => ro.disconnect();
  }, [value, items]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const enabled = items.filter((i) => !i.disabled);
    const idx = enabled.findIndex((i) => i.value === value);
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? enabled.length - 1 : (idx + (e.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length;
    onChange(enabled[next].value);
    listRef.current?.querySelector<HTMLElement>(`[data-value="${enabled[next].value}"]`)?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      className={cx('kosa-tabs', fill && 'kosa-tabs--fill', className)}
      data-variant={variant}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            id={`${baseId}-${item.value}`}
            data-value={item.value}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            className="kosa-tabs__tab"
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
      <span className="kosa-tabs__indicator" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} aria-hidden="true" />
    </div>
  );
}
