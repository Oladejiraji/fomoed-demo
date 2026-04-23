import { tokens } from "@/components/widgets/news/tokens-data";
import { atom } from "jotai";

export const selectedNewsTokenAtom = atom(tokens[0]);
export const isNewsLoadingAtom = atom(false);

let loadingTimer: ReturnType<typeof setTimeout> | null = null;

export const selectNewsTokenAtom = atom(
  null,
  (get, set, token: (typeof tokens)[0]) => {
    set(selectedNewsTokenAtom, token);
    set(isNewsLoadingAtom, true);
    if (loadingTimer) clearTimeout(loadingTimer);
    loadingTimer = setTimeout(() => {
      set(isNewsLoadingAtom, false);
    }, 2500);
  },
);
