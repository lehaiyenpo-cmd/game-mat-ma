import type { SaveState } from "./types";

const SAVE_KEY = "mat-ma-lich-su";
const SAVE_VERSION = 1;

const emptySave = (): SaveState => ({ version: SAVE_VERSION, unlocked: [] });

function migrate(raw: SaveState): SaveState {
  const next: SaveState = {
    version: SAVE_VERSION,
    unlocked: Array.isArray(raw.unlocked)
      ? raw.unlocked.filter((id) => Number.isInteger(id))
      : [],
  };
  return next;
}

export function loadSave(): SaveState {
  if (typeof window === "undefined") return emptySave();
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return emptySave();
    const parsed = JSON.parse(raw) as SaveState;
    return migrate(parsed);
  } catch {
    return emptySave();
  }
}

export function persistSave(save: SaveState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* private mode / quota — keep playing in memory */
  }
}

export function saveOnLeave(getState: () => SaveState) {
  if (typeof window === "undefined") return () => {};
  const flush = () => persistSave(getState());
  const onVis = () => {
    if (document.visibilityState === "hidden") flush();
  };
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", onVis);
  return () => {
    window.removeEventListener("pagehide", flush);
    document.removeEventListener("visibilitychange", onVis);
  };
}
