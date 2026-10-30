import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import './ListItem.css';

export interface ListItemProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** 오른쪽 보조 텍스트 (값, 상태) */
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  /** 오른쪽 화살표 — 다른 화면으로 이동하는 항목 */
  chevron?: boolean;
  /** 클릭 가능 항목 (button으로 렌더) */
  onClick?: () => void;
  disabled?: boolean;
}

export function ListItem({ title, description, meta, leading, trailing, chevron, onClick, disabled, className, ...rest }: ListItemProps) {
  const content = (
    <>
      {leading && <span className="kosa-list-item__leading">{leading}</span>}
      <span className="kosa-list-item__body">
        <span className="kosa-list-item__title">{title}</span>
        {description && <span className="kosa-list-item__desc">{description}</span>}
      </span>
      {meta && <span className="kosa-list-item__meta">{meta}</span>}
      {trailing && <span className="kosa-list-item__trailing">{trailing}</span>}
      {chevron && <Icon name="chevron-right" size={20} className="kosa-list-item__chevron" />}
    </>
  );
  if (onClick) {
    return (
      <button type="button" className={cx('kosa-list-item kosa-list-item--interactive', className)} onClick={onClick} disabled={disabled} {...(rest as HTMLAttributes<HTMLButtonElement>)}>
        {content}
      </button>
    );
  }
  return (
    <div className={cx('kosa-list-item', className)} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  );
}

export function List({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kosa-list', className)} {...rest} />;
}
