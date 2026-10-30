export interface NavItem {
  id: string;
  label: string;
}
export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  { title: '시작하기', items: [{ id: 'overview', label: '소개' }, { id: 'principles', label: '원칙' }] },
  {
    title: 'Foundations',
    items: [
      { id: 'color', label: 'Color' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'radius', label: 'Radius' },
      { id: 'elevation', label: 'Elevation' },
      { id: 'layout', label: 'Layout & Platform' },
      { id: 'motion', label: 'Motion' },
      { id: 'icon', label: 'Iconography' },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'icon-button', label: 'IconButton' },
      { id: 'text-field', label: 'TextField' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'switch', label: 'Switch' },
      { id: 'chip', label: 'Chip' },
      { id: 'badge', label: 'Badge' },
      { id: 'card', label: 'Card' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'list', label: 'ListItem' },
      { id: 'dialog', label: 'Dialog' },
      { id: 'bottom-sheet', label: 'BottomSheet' },
      { id: 'toast', label: 'Toast' },
    ],
  },
  {
    title: 'Prototypes',
    items: [
      { id: 'proto-mobile', label: '모바일 앱' },
      { id: 'proto-web', label: '웹 설정 화면' },
    ],
  },
];

export const FLAT_NAV = NAV.flatMap((g) => g.items);
