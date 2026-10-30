import { forwardRef, useEffect, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
  size?: 'md' | 'sm';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, size = 'md', className, disabled, ...rest },
  ref,
) {
  const inner = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inner.current as HTMLInputElement);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cx('kosa-check', className)} data-size={size} data-disabled={disabled || undefined}>
      <span className="kosa-check__box-wrap">
        <input ref={inner} type="checkbox" className="kosa-check__input" disabled={disabled} {...rest} />
        <span className="kosa-check__box" aria-hidden="true">
          <Icon name={indeterminate ? 'minus' : 'check'} size={size === 'sm' ? 14 : 16} strokeWidth={2.5} />
        </span>
      </span>
      {(label || description) && (
        <span className="kosa-check__text">
          {label && <span className="kosa-check__label">{label}</span>}
          {description && <span className="kosa-check__desc">{description}</span>}
        </span>
      )}
    </label>
  );
});
