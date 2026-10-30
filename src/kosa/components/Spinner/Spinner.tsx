import { cx } from '../../utils/cx';
import './Spinner.css';

export interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Spinner({ size = 20, className, label = '로딩 중' }: SpinnerProps) {
  return (
    <span className={cx('kosa-spinner', className)} role="status" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.22" />
        <path d="M12 2.5a9.5 9.5 0 019.5 9.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="kosa-visually-hidden">{label}</span>
    </span>
  );
}
