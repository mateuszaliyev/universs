"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

import { CircleCheckBigIcon } from "@/components/icons/check";
import { LoaderIcon } from "@/components/icons/loader";

import { cx } from "@/utilities/classname";
import { useTheme } from "@/utilities/hooks/theme";

export { toast } from "sonner";

type ToastClassNames = NonNullable<
  NonNullable<ToasterProps["toastOptions"]>["classNames"]
>;

type ToastIcons = NonNullable<ToasterProps["icons"]>;

export const TOAST_DEFAULT_ERROR_MESSAGE =
  "Something went wrong. Please try again.";

const classNames: ToastClassNames = {
  description: cx("!text-gray-500 dark:!text-gray-400"),
  icon: cx("relative mt-0.5 size-4 shrink-0 [&>svg]:size-full"),
  title: cx("font-medium tracking-tight"),
  toast: cx(
    "flex w-(--width) items-start gap-2 rounded-md border border-gray-200 bg-white p-4 text-sm shadow-lg dark:border-gray-800 dark:bg-gray-900 [&_.sonner-loader]:size-full",
  ),
};

const icons: ToastIcons = {
  loading: <LoaderIcon />,
  success: <CircleCheckBigIcon />,
};

export const Toaster = ({
  icons: {
    loading = icons.loading,
    success = icons.success,
    ...remainingIcons
  } = icons,
  toastOptions: {
    classNames: {
      description = classNames.description,
      icon = classNames.icon,
      title = classNames.title,
      toast = classNames.toast,
      ...remainingClassNames
    } = classNames,
  } = {},
  ...props
}: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      icons={{ ...remainingIcons, loading, success }}
      theme={theme}
      toastOptions={{
        classNames: { ...remainingClassNames, description, icon, title, toast },
        unstyled: true,
      }}
      {...props}
    />
  );
};
