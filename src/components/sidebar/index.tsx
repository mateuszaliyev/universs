import { Separator, type SeparatorProps } from "@/components/separator";
import { Skeleton, type SkeletonProps } from "@/components/skeleton";
import { Slot, type AsChild } from "@/components/slot";

import {
  cva,
  cx,
  type ComponentPropsWithClassName,
  type VariantProps,
} from "@/utilities/classname";

export interface SidebarGroupActionProps
  extends ComponentPropsWithClassName<"button">,
    AsChild {}

export interface SidebarGroupLabelProps
  extends ComponentPropsWithClassName<"div">,
    AsChild {}

export interface SidebarMenuActionProps
  extends ComponentPropsWithClassName<"button">,
    AsChild,
    VariantProps<typeof sidebarAction> {}

export interface SidebarMenuSkeletonProps extends SkeletonProps {
  showIcon?: boolean;
}

export interface SidebarMenuSubButtonProps
  extends ComponentPropsWithClassName<"a">,
    AsChild {
  isActive?: boolean;
  size?: "md" | "sm";
}

const sidebarAction = cva({
  base: "flex size-5 cursor-pointer items-center justify-center rounded transition outline-none [&>svg]:size-4 [&>svg]:shrink-0",
  compoundVariants: [
    {
      className:
        "hocus-visible:bg-gray-200 dark:hocus-visible:bg-gray-800 absolute text-gray-950 group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 after:md:hidden dark:text-white",
      variant: ["group", "menu"],
    },
    {
      className:
        "group-hocus-within/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-gray-500 data-[state=open]:opacity-100 md:opacity-0",
      showOnHover: true,
      variant: "menu",
    },
  ],
  variants: {
    showOnHover: { true: "" },
    variant: {
      group: "top-3.5 right-3",
      menu: "peer-hocus-visible/menu-button:text-gray-950 dark:peer-hocus-visible/menu-button:text-white top-1.5 right-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1",
    },
  },
});

const sidebarMenuSubButton = cva({
  base: "hocus-visible:bg-gray-200 peer/menu-button dark:hocus-visible:bg-gray-800 flex h-7 min-w-0 -translate-x-px cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 transition outline-none group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-gray-200 dark:data-[active=true]:bg-gray-800 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  defaultVariants: { size: "md" },
  variants: { size: { md: "text-sm", sm: "text-xs" } },
});

export const SidebarContent = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div
    className={cx(
      "flex min-h-0 grow flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      className,
    )}
    {...props}
  />
);

export const SidebarFooter = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div className={cx("flex flex-col gap-2 p-2", className)} {...props} />
);

export const SidebarGroup = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div
    className={cx("relative flex w-full min-w-0 flex-col p-2", className)}
    {...props}
  />
);

export const SidebarGroupAction = ({
  asChild,
  className,
  ...props
}: SidebarGroupActionProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={sidebarAction({ className, variant: "group" })}
      {...props}
    />
  );
};

export const SidebarGroupContent = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div className={cx("w-full text-sm", className)} {...props} />
);

export const SidebarGroupLabel = ({
  asChild,
  className,
  ...props
}: SidebarGroupLabelProps) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cx(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium tracking-tight text-gray-500 transition-all duration-200 ease-linear outline-none focus-visible:ring-2 dark:text-gray-400 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
};

export const SidebarHeader = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div className={cx("flex flex-col gap-2 p-2", className)} {...props} />
);

export const SidebarMain = ({
  className,
  ...props
}: ComponentPropsWithClassName<"main">) => (
  <main className={cx("grow py-24", className)} {...props} />
);

export const SidebarMenu = ({
  className,
  ...props
}: ComponentPropsWithClassName<"ul">) => (
  <ul
    className={cx("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
);

export const SidebarMenuAction = ({
  asChild,
  className,
  showOnHover,
  ...props
}: SidebarMenuActionProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={sidebarAction({ className, showOnHover, variant: "menu" })}
      data-sidebar="menu-action"
      {...props}
    />
  );
};

export const SidebarMenuBadge = ({
  className,
  ...props
}: ComponentPropsWithClassName<"div">) => (
  <div
    className={cx(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center px-1 text-xs font-medium tabular-nums group-data-[collapsible=icon]:hidden peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=md]/menu-button:top-1.5 peer-data-[size=sm]/menu-button:top-1",
      className,
    )}
    {...props}
  />
);

export const SidebarMenuItem = ({
  className,
  ...props
}: ComponentPropsWithClassName<"li">) => (
  <li className={cx("group/menu-item relative", className)} {...props} />
);

export const SidebarMenuSkeleton = ({
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) => (
  <div
    className={cx("flex h-8 items-center gap-2 rounded-md px-2", className)}
    {...props}
  >
    {showIcon && <Skeleton className="size-4 rounded-md" />}
    <Skeleton
      className="h-4 grow"
      style={{ maxWidth: `${Math.floor(Math.random() * 40) + 50}%` }}
    />
  </div>
);

export const SidebarMenuSub = ({
  className,
  ...props
}: ComponentPropsWithClassName<"ul">) => (
  <ul
    className={cx(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-gray-200 px-2.5 py-0.5 group-data-[collapsible=icon]:hidden dark:border-gray-800",
      className,
    )}
    {...props}
  />
);

export const SidebarMenuSubButton = ({
  asChild,
  className,
  isActive,
  size = "md",
  ...props
}: SidebarMenuSubButtonProps) => {
  const Component = asChild ? Slot : "a";

  return (
    <Component
      className={sidebarMenuSubButton({ className, size })}
      data-active={isActive}
      data-size={size}
      {...props}
    />
  );
};

export const SidebarMenuSubItem = "li";

export const SidebarSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cx("mx-2 w-auto", className)} {...props} />
);
