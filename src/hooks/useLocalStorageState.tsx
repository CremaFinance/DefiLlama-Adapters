import { useCallback, useState } from "react";

export function useLocalStorageState(key: string, defaultState?: string) {
  const isBrowser = typeof window !== "undefined";

  const [state, setState] = useState(() => {
    // NOTE: Not sure if this is ok
    if (isBrowser) {
      const storedState = window.localStorage.getItem(key);
      if (storedState) {
        return JSON.parse(storedState);
      }
    }
    return defaultState;
  });

  const setLocalStorageState = useCallback(
    (newState) => {
      const changed = state !== newState;
      if (!changed || !isBrowser) {
        return;
      }

      setState(newState);
      if (newState === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newState));
      }
    },
    [state, isBrowser, key]
  );

  return [state, setLocalStorageState];
}
