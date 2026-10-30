import { useEffect, useState } from 'react';

type Key = 'theme' | 'platform' | 'shape';
const DEFAULTS: Record<Key, string> = { theme: 'light', platform: 'auto', shape: 'round' };

const load = (key: Key) => {
  try {
    return localStorage.getItem(`kosa-${key}`) ?? (key === 'theme' ? document.documentElement.dataset.theme ?? DEFAULTS.theme : DEFAULTS[key]);
  } catch {
    return DEFAULTS[key];
  }
};

/** html 요소의 data-* 속성으로 테마·플랫폼·형태 모드를 전역 적용 */
export function useDocSetting(key: Key) {
  const [value, setValue] = useState(() => load(key));
  useEffect(() => {
    const el = document.documentElement;
    const isDefault = (key === 'platform' && value === 'auto') || (key === 'shape' && value === 'round');
    if (isDefault) delete el.dataset[key];
    else el.dataset[key] = value;
    try {
      localStorage.setItem(`kosa-${key}`, value);
    } catch {
      /* 저장 불가 환경 무시 */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
