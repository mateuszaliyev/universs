/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { defineConfig, type CXOptions } from "cva";
import { twMerge as onComplete } from "tailwind-merge";

export type { VariantProps } from "cva";

export type ClassName = CXOptions[number];

export type ComponentPropsWithClassName<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
> = Omit<
  T extends React.JSXElementConstructor<infer Props>
    ? Props
    : T extends keyof React.JSX.IntrinsicElements
      ? React.JSX.IntrinsicElements[T]
      : {},
  "className"
> & {
  className?: ClassName;
};

export const { compose, cva, cx } = defineConfig({ hooks: { onComplete } });
