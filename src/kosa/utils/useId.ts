import { useId as useReactId } from 'react';

export function useFieldId(id?: string): string {
  const generated = useReactId();
  return id ?? `kosa-${generated.replace(/:/g, '')}`;
}
