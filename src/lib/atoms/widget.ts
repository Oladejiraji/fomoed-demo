import { atom } from "jotai";

export const widgetSizes = ["small", "medium", "large"] as const;

export type WidgetSize = (typeof widgetSizes)[number];

export const widgetSizeAtom = atom<WidgetSize>("small");

export const isAnimationActiveAtom = atom(true);
