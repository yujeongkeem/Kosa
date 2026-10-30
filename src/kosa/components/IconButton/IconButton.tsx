import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './IconButton.css';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** 스크린리더용 라벨 (필수) */
  label: string;
  icon: ReactNode;
  variant?: 'ghost' | 'filled' | 'primary';
  size?: 'lg' | 'md' | 'sm';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = 'ghost', size = 'md', className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('kosa-icon-button', className)}
      data-variant={variant}
      data-size={size}
      aria-label={label}
      title={label}
      {...rest}
    >
      {icon}
    </button>
  );
});
