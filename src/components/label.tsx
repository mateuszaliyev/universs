import { cx, type ComponentPropsWithClassName } from "@/utilities/classname";

export type LabelProps = ComponentPropsWithClassName<"label">;

export const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={cx("text-sm font-medium tracking-tight", className)}
    {...props}
  />
);
