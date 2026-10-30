import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { useFieldId } from '../../utils/useId';
import { useOverlay } from '../../utils/useOverlay';
import './Dialog.css';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** 하단 버튼 영역 */
  actions?: ReactNode;
  /** actions 배치 — 모바일 기본은 세로 꽉 찬 버튼 */
  actionsLayout?: 'horizontal' | 'vertical';
  /** 바깥 영역 클릭으로 닫기 */
  dismissible?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/** 중앙 다이얼로그. 확인·경고처럼 짧고 결정이 필요한 내용에 쓴다. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  actionsLayout = 'horizontal',
  dismissible = true,
  size = 'sm',
  className,
}: DialogProps) {
  const { mounted, visible, panelRef } = useOverlay(open, onClose);
  const titleId = useFieldId();
  const descId = useFieldId();
  if (!mounted) return null;

  return createPortal(
    <div className="kosa-dialog-root" data-visible={visible || undefined}>
      <div className="kosa-overlay" onClick={dismissible ? onClose : undefined} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cx('kosa-dialog', className)}
        data-size={size}
      >
        {(title || description) && (
          <div className="kosa-dialog__header">
            {title && (
              <h2 id={titleId} className="kosa-dialog__title">
                {title}
              </h2>
            )}
            {description && (
              <p id={descId} className="kosa-dialog__desc">
                {description}
              </p>
            )}
          </div>
        )}
        {children && <div className="kosa-dialog__body">{children}</div>}
        {actions && (
          <div className="kosa-dialog__actions" data-layout={actionsLayout}>
            {actions}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
