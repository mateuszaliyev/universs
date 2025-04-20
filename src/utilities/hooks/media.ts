"use client";

import { useEffect, useState } from "react";

const getInitialValue = (query: string, defaultValue?: boolean) => {
  if (typeof window !== "undefined") return window.matchMedia(query).matches;
  return defaultValue ?? false;
};

export const useMedia = (query: string, defaultState?: boolean) => {
  const [value, setValue] = useState(getInitialValue(query, defaultState));

  useEffect(() => {
    const abortController = new AbortController();
    const mediaQueryList = window.matchMedia(query);

    mediaQueryList.addEventListener(
      "change",
      () => {
        setValue(mediaQueryList.matches);
      },
      { signal: abortController.signal },
    );

    setValue(mediaQueryList.matches);

    return () => abortController.abort();
  }, [query]);

  return value;
};
