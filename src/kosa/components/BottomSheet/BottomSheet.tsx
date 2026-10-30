import { useRef, type PointerEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import { useFieldId } from '../../utils/useId';
import { useOverlay } from '../../utils/useOverlay';
import '../Dialog/Dialog.css';
import './BottomSheet.css';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** 하단 고정 버튼 영역 */
  actions?: ReactNode;
  /** 손잡이 표시 + 아래로 끌어 닫기 */
  draggable?: boolean;
  className?: string;
}

/**
 * 하단 시트. 모바일에서 선택·필터·부가 정보에 쓴다.
 * 데스크톱(>=768px)에서는 중앙 패널로 자동 변형된다.
 */
export function BottomSheet({ open, onClose, title, description, children, actions, draggable = true, className }: BottomSheetProps) {
  const { mounted, visible, panelRef } = useOverlay(open, onClose, 320);
  const titleId = useFieldId();
  const drag = useRef<{ startY: number; dy: number } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { startY: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !panelRef.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.startY);
    panelRef.current.style.transition = 'none';
    panelRef.current.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onPointerUp = () => {
    if (!drag.current || !panelRef.current) return;
    const { dy } = drag.current;
    panelRef.current.style.transition = '';
    panelRef.current.style.transform = '';
    drag.current = null;
    if (dy > 96) onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div className="kosa-sheet-root" data-visible={visible || undefined}>
      <div className="kosa-overlay" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cx('kosa-sheet', className)}
      >
        {draggable && (
          <div className="kosa-sheet__handle" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
            <span />
          </div>
        )}
        {(title || description) && (
          <div className="kosa-sheet__header">
            {title && (
              <h2 id={titleId} className="kosa-sheet__title">
                {title}
              </h2>
            )}
            {description && <p className="kosa-sheet__desc">{description}</p>}
          </div>
        )}
        {children && <div className="kosa-sheet__body">{children}</div>}
        {actions && <div className="kosa-sheet__actions">{actions}</div>}
      </div>
    </div>,
    document.body,
  );
}
