import type { ComponentType } from 'react';
import { Overview } from './Overview';
import { Principles } from './Principles';
import { ColorPage, ElevationPage, IconPage, LayoutPage, MotionPage, RadiusPage, SpacingPage, TypographyPage } from './Foundations';
import {
  BadgePage,
  BottomSheetPage,
  ButtonPage,
  CardPage,
  CheckboxPage,
  ChipPage,
  DialogPage,
  IconButtonPage,
  ListPage,
  RadioPage,
  SwitchPage,
  TabsPage,
  TextFieldPage,
  ToastPage,
} from './Components';
import { MobilePrototype, WebPrototype } from './Prototypes';

export const PAGES: Record<string, ComponentType> = {
  overview: Overview,
  principles: Principles,
  color: ColorPage,
  typography: TypographyPage,
  spacing: SpacingPage,
  radius: RadiusPage,
  elevation: ElevationPage,
  layout: LayoutPage,
  motion: MotionPage,
  icon: IconPage,
  button: ButtonPage,
  'icon-button': IconButtonPage,
  'text-field': TextFieldPage,
  checkbox: CheckboxPage,
  radio: RadioPage,
  switch: SwitchPage,
  chip: ChipPage,
  badge: BadgePage,
  card: CardPage,
  tabs: TabsPage,
  list: ListPage,
  dialog: DialogPage,
  'bottom-sheet': BottomSheetPage,
  toast: ToastPage,
  'proto-mobile': MobilePrototype,
  'proto-web': WebPrototype,
};
