import { useTheme as useNextThemesTheme } from "next-themes";

import * as z from "@zod/mini";

import type { NonReadonly } from "@/types";

export type Theme = (typeof THEMES)[number];

export const THEMES = ["dark", "light", "system"] as const;

export const theme = z.enum(THEMES as NonReadonly<typeof THEMES>);
const themeWithDefault = z.catch(theme, "system");

export const useTheme = () => {
  const { theme, ...props } = useNextThemesTheme();
  return { theme: themeWithDefault.parse(theme), ...props };
};
