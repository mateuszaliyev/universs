"use client";

import {
  Content,
  Description,
  Overlay,
  Portal,
  Title,
  type AlertDialogContentProps,
  type AlertDialogDescriptionProps,
  type AlertDialogOverlayProps,
  type AlertDialogTitleProps,
} from "@radix-ui/react-alert-dialog";

import { cx } from "@/utilities/classname";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogPortal,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";

export const AlertDialogContent = ({
  className,
  ...props
}: AlertDialogContentProps) => (
  <Portal>
    <AlertDialogOverlay />
    <Content
      className={cx(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-(--z-popover) grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg duration-200 dark:border-gray-800 dark:bg-gray-900",
        className,
      )}
      {...props}
    />
  </Portal>
);

export const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescriptionProps) => (
  <Description
    className={cx("text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
);

export const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cx(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

export const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cx("flex flex-col gap-2 text-center sm:text-start", className)}
    {...props}
  />
);

export const AlertDialogOverlay = ({
  className,
  ...props
}: AlertDialogOverlayProps) => (
  <Overlay
    className={cx(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-(--z-popover) bg-gray-950/80",
      className,
    )}
    {...props}
  />
);

export const AlertDialogTitle = ({
  className,
  ...props
}: AlertDialogTitleProps) => (
  <Title
    className={cx("text-lg font-medium tracking-tight", className)}
    {...props}
  />
);
