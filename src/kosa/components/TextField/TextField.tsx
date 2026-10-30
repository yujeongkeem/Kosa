import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldId } from '../../utils/useId';
import { Icon } from '../Icon/Icon';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  helperText?: string;
  /** 에러 메시지. 값이 있으면 에러 상태가 된다 */
  error?: string;
  size?: 'lg' | 'md';
  leading?: ReactNode;
  trailing?: ReactNode;
  /** 값이 있을 때 지우기 버튼 노출 (onClear 필요) */
  onClear?: () => void;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helperText, error, size = 'lg', leading, trailing, onClear, id, className, type = 'text', disabled, value, ...rest },
  ref,
) {
  const fieldId = useFieldId(id);
  const messageId = `${fieldId}-message`;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const message = error || helperText;
  const hasValue = value !== undefined && value !== '';

  return (
    <div className={cx('kosa-field', className)} data-size={size} data-invalid={!!error || undefined} data-disabled={disabled || undefined}>
      {label && (
        <label className="kosa-field__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className="kosa-field__control">
        {leading && <span className="kosa-field__slot">{leading}</span>}
        <input
          ref={ref}
          id={fieldId}
          className="kosa-field__input"
          type={isPassword && revealed ? 'text' : type}
          disabled={disabled}
          value={value}
          aria-invalid={!!error || undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
        />
        {onClear && hasValue && !disabled && (
          <button type="button" className="kosa-field__action" aria-label="입력 지우기" onClick={onClear}>
            <Icon name="close-circle" size={20} />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            className="kosa-field__action"
            aria-label={revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={revealed}
            onClick={() => setRevealed((v) => !v)}
          >
            <Icon name={revealed ? 'eye-off' : 'eye'} size={20} />
          </button>
        )}
        {trailing && <span className="kosa-field__slot">{trailing}</span>}
      </div>
      {message && (
        <p id={messageId} className="kosa-field__message" role={error ? 'alert' : undefined}>
          {error && <Icon name="info" size={14} />}
          {message}
        </p>
      )}
    </div>
  );
});
