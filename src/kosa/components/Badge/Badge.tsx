import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeTone = 'primary' | 'neutral' | 'positive' | 'negative' | 'caution' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: 'soft' | 'solid';
  size?: 'md' | 'sm';
}

export function Badge({ tone = 'neutral', variant = 'soft', size = 'md', className, ...rest }: BadgeProps) {
  return <span className={cx('kosa-badge', className)} data-tone={tone} data-variant={variant} data-size={size} {...rest} />;
}

export interface CountBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  max?: number;
  /** count 없이 점으로만 표시 */
  dot?: boolean;
}

export function CountBadge({ count, max = 99, dot, className, ...rest }: CountBadgeProps) {
  if (!dot && !count) return null;
  return (
    <span className={cx('kosa-count-badge', dot && 'kosa-count-badge--dot', className)} {...rest}>
      {dot ? <span className="kosa-visually-hidden">새 알림</span> : count! > max ? `${max}+` : count}
    </span>
  );
}
