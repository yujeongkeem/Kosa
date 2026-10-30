import type { SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { icons, type IconName } from './icons';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** 접근성 라벨. 없으면 장식용(aria-hidden)으로 처리 */
  label?: string;
}

export function Icon({ name, size = 24, label, className, strokeWidth = 1.75, ...rest }: IconProps) {
  return (
    <svg
      className={cx('kosa-icon', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <path d={icons[name]} />
    </svg>
  );
}
