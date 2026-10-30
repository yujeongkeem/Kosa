import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Switch.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  size?: 'md' | 'sm';
  /** 라벨을 스위치 왼쪽에 둘지 (설정 화면 패턴) */
  labelPosition?: 'start' | 'end';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, size = 'md', labelPosition = 'end', className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cx('kosa-switch', className)}
      data-size={size}
      data-label-position={labelPosition}
      data-disabled={disabled || undefined}
    >
      <span className="kosa-switch__track-wrap">
        <input ref={ref} type="checkbox" role="switch" className="kosa-switch__input" disabled={disabled} {...rest} />
        <span className="kosa-switch__track" aria-hidden="true">
          <span className="kosa-switch__thumb" />
        </span>
      </span>
      {label && <span className="kosa-switch__label">{label}</span>}
    </label>
  );
});
