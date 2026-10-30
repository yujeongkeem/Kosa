import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** filled: 회색 면 / elevated: 회색 배경 위의 흰 면. 둘 다 그림자 없이 배경 대비로 구분 */
  variant?: 'filled' | 'elevated' | 'plain';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** 클릭 가능한 카드 — 눌림 피드백 + 키보드 접근 */
  interactive?: boolean;
}

export function Card({ variant = 'filled', padding = 'md', interactive, className, onClick, ...rest }: CardProps) {
  return (
    <div
      className={cx('kosa-card', interactive && 'kosa-card--interactive', className)}
      data-variant={variant}
      data-padding={padding}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
              }
            }
          : undefined
      }
      {...rest}
    />
  );
}
