import { useSyncExternalStore } from "react";

export function createLocalStore(key: string) {
  const listeners = new Set<() => void>();
  // Storage can be blocked (e.g. private mode); then values live in memory for this visit only.
  let unsaved: string | null = null;

  function subscribe(onChange: () => void) {
    listeners.add(onChange);
    window.addEventListener("storage", onChange);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onChange);
    };
  }

  function read(): string {
    if (unsaved !== null) return unsaved;
    try {
      return localStorage.getItem(key) ?? "";
    } catch {
      return "";
    }
  }

  function write(value: string) {
    try {
      localStorage.setItem(key, value);
      unsaved = null;
    } catch {
      unsaved = value;
    }
    listeners.forEach((listener) => listener());
  }

  function useValue(): string {
    return useSyncExternalStore(subscribe, read, () => "");
  }

  return { write, useValue };
}

export const checklistStore = createLocalStore("sotay_tu0den1_v1");
export const yearOneStore = createLocalStore("sotay_namdau_v1");
export const stageStore = createLocalStore("sotay_giaidoan_v1");
