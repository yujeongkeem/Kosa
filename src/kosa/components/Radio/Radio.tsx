import { createContext, forwardRef, useContext, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldId } from '../../utils/useId';
import '../Checkbox/Checkbox.css';
import './Radio.css';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  direction?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ name, value, onChange, disabled, label, direction = 'vertical', children, className }: RadioGroupProps) {
  const groupName = useFieldId(name);
  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange, disabled }}>
      <div role="radiogroup" aria-label={label} className={cx('kosa-radio-group', className)} data-direction={direction}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value'> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  size?: 'md' | 'sm';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, size = 'md', className, disabled, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const isDisabled = disabled ?? group?.disabled;
  const groupProps = group
    ? { name: group.name, checked: group.value === value, onChange: () => group.onChange?.(value) }
    : {};

  return (
    <label className={cx('kosa-check kosa-radio', className)} data-size={size} data-disabled={isDisabled || undefined}>
      <span className="kosa-check__box-wrap">
        <input ref={ref} type="radio" className="kosa-check__input" value={value} disabled={isDisabled} {...groupProps} {...rest} />
        <span className="kosa-check__box kosa-radio__dot" aria-hidden="true" />
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
