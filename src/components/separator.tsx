import { Slot, type AsChild } from "@/components/slot";

import {
  cva,
  type ComponentPropsWithClassName,
  type VariantProps,
} from "@/utilities/classname";

export interface SeparatorProps
  extends ComponentPropsWithClassName<"div">,
    AsChild,
    VariantProps<typeof separator> {
  decorative?: boolean;
}

const separator = cva({
  base: "shrink-0 bg-gray-200 dark:bg-gray-800",
  defaultVariants: { orientation: "horizontal" },
  variants: {
    orientation: { horizontal: "h-px w-full", vertical: "h-full w-px" },
  },
});

export const Separator = ({
  "aria-orientation": ariaOrientation,
  asChild,
  className,
  decorative,
  orientation = "horizontal",
  role,
  ...props
}: SeparatorProps) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      aria-orientation={
        ariaOrientation ?? (decorative ? undefined : orientation)
      }
      className={separator({ className, orientation })}
      role={role ?? (decorative ? "none" : "separator")}
      {...props}
    />
  );
};
