import {
  Content,
  Description,
  Overlay,
  Portal,
  Title,
} from "@radix-ui/react-dialog";

import {
  cva,
  cx,
  type ComponentPropsWithClassName,
  type VariantProps,
} from "@/utilities/classname";

export {
  Root as Sheet,
  Close as SheetClose,
  Portal as SheetPortal,
  Trigger as SheetTrigger,
} from "@radix-ui/react-dialog";

interface SheetContentProps
  extends ComponentPropsWithClassName<typeof Content>,
    VariantProps<typeof sheet> {}

export const sheet = cva({
  base: "data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-(--z-popover) gap-4 border-gray-200 bg-gray-50 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:border-gray-800 dark:bg-gray-900",
  defaultVariants: { side: "right" },
  variants: {
    side: {
      bottom:
        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
      left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right:
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
    },
  },
});

export const SheetContent = ({
  className,
  side = "right",
  ...props
}: SheetContentProps) => (
  <Portal>
    <SheetOverlay />
    <Content className={sheet({ className, side })} {...props} />
  </Portal>
);

export const SheetDescription = ({
  className,
  ...props
}: ComponentPropsWithClassName<typeof Description>) => (
  <Description className={cx("text-sm text-gray-200", className)} {...props} />
);

export const SheetFooter = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div
    className={cx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
      className,
    )}
    {...props}
  />
);

export const SheetHeader = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div
    className={cx("flex flex-col gap-2 text-center sm:text-start", className)}
    {...props}
  />
);

export const SheetOverlay = ({
  className,
  ...props
}: ComponentPropsWithClassName<typeof Overlay>) => (
  <Overlay
    className={cx(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-(--z-popover) bg-white/80 backdrop-blur-sm backdrop-saturate-150 dark:bg-gray-950/80",
      className,
    )}
    {...props}
  />
);

export const SheetTitle = ({
  className,
  ...props
}: ComponentPropsWithClassName<typeof Title>) => (
  <Title className={cx("text-lg font-semibold", className)} {...props} />
);
