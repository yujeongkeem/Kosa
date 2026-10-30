import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconProps } from '../Icon/Icon';
import './Toast.css';

export type ToastTone = 'normal' | 'positive' | 'negative';

export interface ToastOptions {
  message: ReactNode;
  tone?: ToastTone;
  /** 오른쪽 텍스트 버튼 (예: 실행 취소) */
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  leaving?: boolean;
}

const ToastContext = createContext<((options: ToastOptions | string) => void) | null>(null);

const TONE_ICON: Record<ToastTone, IconProps['name'] | null> = {
  normal: null,
  positive: 'check-circle',
  negative: 'alert',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 220);
  }, []);

  const show = useCallback((options: ToastOptions | string) => {
    const opts = typeof options === 'string' ? { message: options } : options;
    const id = ++seq.current;
    // 동시에 최대 3개 — 오래된 것부터 밀어낸다
    setItems((list) => [...list.slice(-2), { ...opts, id }]);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {createPortal(
        <div className="kosa-toast-region" role="status" aria-live="polite">
          {items.map((t) => (
            <ToastView key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [entered, setEntered] = useState(false);
  const tone = item.tone ?? 'normal';
  const iconName = TONE_ICON[tone];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    const t = window.setTimeout(onDismiss, item.duration ?? 3000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="kosa-toast" data-tone={tone} data-state={item.leaving ? 'leaving' : entered ? 'entered' : 'entering'}>
      {iconName && <Icon name={iconName} size={20} className="kosa-toast__icon" />}
      <span className="kosa-toast__message">{item.message}</span>
      {item.action && (
        <button
          type="button"
          className="kosa-toast__action"
          onClick={() => {
            item.action!.onClick();
            onDismiss();
          }}
        >
          {item.action.label}
        </button>
      )}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast는 <ToastProvider> 안에서 사용해야 합니다.');
  return ctx;
}
