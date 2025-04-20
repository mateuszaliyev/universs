import { Content, Portal } from "@radix-ui/react-tooltip";

import { cx, type ComponentPropsWithClassName } from "@/utilities/classname";

export {
  Root as Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export type TooltipContentProps = ComponentPropsWithClassName<typeof Content>;

export const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: TooltipContentProps) => (
  <Portal>
    <Content
      className={cx(
        "animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-(--z-popover) origin-(--radix-tooltip-content-transform-origin) overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-950 dark:border-gray-800 dark:bg-gray-900 dark:text-white",
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
);
