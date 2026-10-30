import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import './Chip.css';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: 'md' | 'sm';
  leadingIcon?: ReactNode;
  /** 필터 칩에서 아래 화살표(드롭다운) 표시 */
  dropdown?: boolean;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, size = 'md', leadingIcon, dropdown, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('kosa-chip', className)}
      data-size={size}
      data-selected={selected || undefined}
      aria-pressed={dropdown ? undefined : selected}
      {...rest}
    >
      {leadingIcon && <span className="kosa-chip__icon">{leadingIcon}</span>}
      {children}
      {dropdown && <Icon name="chevron-down" size={16} className="kosa-chip__caret" />}
    </button>
  );
});
