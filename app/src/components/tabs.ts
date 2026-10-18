import { CircleHelp, MapIcon, Trophy, type LucideIcon } from 'lucide-react';

export const TABS = [
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'how-it-works', label: 'How it works', icon: CircleHelp },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
] as const satisfies readonly { id: string; label: string; icon: LucideIcon }[];

export type TabId = (typeof TABS)[number]['id'];

export const tabId = (id: TabId) => `tab-${id}`;
export const tabPanelId = (id: TabId) => `tabpanel-${id}`;
