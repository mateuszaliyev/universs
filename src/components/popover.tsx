"use client";

import {
  Content,
  Portal,
  type PopoverContentProps,
} from "@radix-ui/react-popover";

import { cx } from "@/utilities/classname";

export {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
} from "@radix-ui/react-popover";

export const PopoverContent = ({
  align = "center",
  className,
  sideOffset = 4,
  ...props
}: PopoverContentProps) => (
  <Portal>
    <Content
      align={align}
      className={cx(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-(--z-popover) w-72 origin-(--radix-popover-content-transform-origin) rounded-md border border-gray-200 bg-white p-4 text-gray-950 shadow-md outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white",
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
);
