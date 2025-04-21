"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Avatar } from "@/components/avatar";
import {
  DeleteCurrentUserDialogProvider,
  DeleteCurrentUserDialogTrigger,
} from "@/components/database/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { ChevronsExpandIcon } from "@/components/icons/chevron";
import { LogOutIcon } from "@/components/icons/log-out";
import { RssIcon } from "@/components/icons/rss";
import { SunMoonIcon } from "@/components/icons/sun-moon";
import { TrashIcon } from "@/components/icons/trash";
import { Link } from "@/components/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet";
import {
  sidebarAction,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/sidebar";
import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_WIDTH_MOBILE,
} from "@/components/sidebar/constants";
import { Slot, type AsChild } from "@/components/slot";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
} from "@/components/tooltip";

import { useUser, useUserFeeds, useUsers } from "@/database/hooks";

import {
  compose,
  cva,
  cx,
  type ComponentPropsWithClassName,
  type VariantProps,
} from "@/utilities/classname";
import { useMedia } from "@/utilities/hooks/media";
import { THEMES, type Theme } from "@/utilities/hooks/theme";
import { paths } from "@/utilities/url";

type CloseOnClick = {
  closeOnClick?: boolean;
};

type SidebarContextProps = {
  isMobile: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSheetOpen: SidebarContextProps["setOpen"];
  sheetOpen: boolean;
  state: "collapsed" | "expanded";
  toggleSidebar: () => void;
};

export interface SidebarGroupActionProps
  extends ComponentPropsWithClassName<"button">,
    AsChild,
    CloseOnClick {}

interface SidebarInsetProps
  extends ComponentPropsWithClassName<"main">,
    AsChild {}

interface SidebarMenuButtonProps
  extends ComponentPropsWithClassName<"button">,
    AsChild,
    CloseOnClick,
    VariantProps<typeof sidebarMenuButton> {
  isActive?: boolean;
  tooltip?: string | TooltipContentProps;
}

interface SidebarProps extends React.ComponentProps<"div"> {
  collapsible?: "icon" | "none" | "offcanvas";
  side?: "left" | "right";
  variant?: "floating" | "inset" | "sidebar";
}

interface SidebarProviderProps extends ComponentPropsWithClassName<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: SidebarContextProps["setOpen"];
}

interface SidebarTriggerProps extends React.ComponentProps<"button">, AsChild {}

const SidebarContext = createContext<SidebarContextProps | null>(null);

const useMobile = () => {
  const value = useMedia("(min-width: 768px)", true);
  return !value;
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("`useSidebar` must be used within `<SidebarProvider>`");
  }

  return context;
};

const sidebarBase = cva({
  base: "w-(--sidebar-width) transition-all duration-200 ease-linear",
});

const sidebar = compose(
  sidebarBase,
  cva({
    base: "fixed inset-y-0 z-(--z-sidebar) hidden h-svh md:flex",
    compoundVariants: [
      {
        className:
          "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4)+2px)]",
        variant: ["floating", "inset"],
      },
    ],
    variants: {
      side: {
        left: "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
        right:
          "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
      },
      variant: {
        floating: "",
        inset: "",
        sidebar:
          "border-gray-200 group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l dark:border-gray-800",
      },
    },
  }),
);

const sidebarContentShifter = compose(
  sidebarBase,
  cva({
    base: "relative group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",
    compoundVariants: [
      {
        className:
          "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4))]",
        variant: ["floating", "inset"],
      },
    ],
    variants: {
      variant: {
        floating: "",
        inset: "",
        sidebar: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
      },
    },
  }),
);

const sidebarMenuButton = cva({
  base: "peer/menu-button hocus-visible:bg-gray-200 dark:hocus-visible:bg-gray-800 flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-start transition-all outline-none group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:p-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-gray-200 data-[active=true]:font-medium data-[active=true]:tracking-tight dark:data-[active=true]:bg-gray-800 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  defaultVariants: { size: "md" },
  variants: {
    size: { lg: "h-12 text-sm", md: "h-8 text-sm", sm: "h-7 text-xs" },
  },
});

export const Sidebar = ({
  children,
  className,
  collapsible = "offcanvas",
  side = "left",
  variant = "sidebar",
  ...props
}: SidebarProps) => {
  const { setSheetOpen, sheetOpen, state } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cx(
          "flex h-full w-(--sidebar-width) flex-col bg-gray-50 dark:bg-gray-900",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <div
        className="group peer hidden md:block"
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-side={side}
        data-state={state}
        data-variant={variant}
      >
        <div className={sidebarContentShifter({ variant })} />
        <div className={sidebar({ className, side, variant })} {...props}>
          <div className="flex size-full flex-col bg-gray-50 group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-gray-200 group-data-[variant=floating]:shadow dark:bg-gray-900">
            {children}
          </div>
        </div>
      </div>
      <Sheet onOpenChange={setSheetOpen} open={sheetOpen} {...props}>
        <SheetContent
          className="w-(--sidebar-width) p-0 md:hidden"
          side={side}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar</SheetDescription>
          </SheetHeader>
          <div className="flex size-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export const SidebarFeeds = () => {
  const feeds = useUserFeeds();

  if (feeds.isPending || !feeds?.data.length) return null;

  return (
    <SidebarMenu>
      {feeds.data.map((feed) => (
        <SidebarMenuItem key={feed.id}>
          <SidebarMenuButton asChild tooltip={feed.name}>
            <Link href={paths.feeds.id(feed.id)}>
              <RssIcon />
              <span>{feed.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export const SidebarGroupAction = ({
  asChild,
  className,
  closeOnClick = true,
  onClick,
  ...props
}: SidebarGroupActionProps) => {
  const { setSheetOpen } = useSidebar();

  const Component = useMemo(() => (asChild ? Slot : "button"), [asChild]);

  const handleClick = useCallback<NonNullable<typeof onClick>>(
    (event) => {
      if (closeOnClick) setSheetOpen(false);
      onClick?.(event);
    },
    [closeOnClick, onClick, setSheetOpen],
  );

  return (
    <Component
      className={sidebarAction({ className, variant: "group" })}
      onClick={handleClick}
      {...props}
    />
  );
};

export const SidebarInset = ({
  asChild,
  className,
  ...props
}: SidebarInsetProps) => {
  const Component = useMemo(() => (asChild ? Slot : "main"), [asChild]);

  return (
    <Component
      className={cx(
        "relative flex w-full grow flex-col bg-gray-50 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 dark:bg-gray-900",
        className,
      )}
      {...props}
    />
  );
};

export const SidebarMenuButton = ({
  asChild,
  isActive,
  size = "md",
  tooltip,
  ...props
}: SidebarMenuButtonProps) => {
  const { isMobile, state } = useSidebar();

  const tooltipProps = useMemo(
    () => (typeof tooltip === "string" ? { children: tooltip } : tooltip),
    [tooltip],
  );

  if (!tooltip) {
    return (
      <SidebarMenuButtonInternal
        asChild={asChild}
        isActive={isActive}
        size={size}
        {...props}
      />
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarMenuButtonInternal
          asChild={asChild}
          isActive={isActive}
          size={size}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent
        align="center"
        hidden={isMobile || state !== "collapsed"}
        side="right"
        {...tooltipProps}
      />
    </Tooltip>
  );
};

const SidebarMenuButtonInternal = ({
  asChild,
  className,
  closeOnClick = true,
  isActive,
  onClick,
  size,
  ...props
}: SidebarMenuButtonProps) => {
  const { setSheetOpen } = useSidebar();

  const Component = useMemo(() => (asChild ? Slot : "button"), [asChild]);

  const handleClick = useCallback<NonNullable<typeof onClick>>(
    (event) => {
      if (closeOnClick) setSheetOpen(false);
      onClick?.(event);
    },
    [closeOnClick, setSheetOpen],
  );

  return (
    <Component
      className={sidebarMenuButton({ className, size })}
      data-active={isActive}
      data-size={size}
      onClick={handleClick}
      {...props}
    />
  );
};

export const SidebarProvider = ({
  children,
  className,
  defaultOpen = true,
  onOpenChange,
  open: externalOpen,
  style,
  ...props
}: SidebarProviderProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isMobile = useMobile();

  const open = useMemo(
    () => externalOpen ?? internalOpen,
    [externalOpen, internalOpen],
  );

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      setInternalOpen((previousOpen) => {
        const nextOpen =
          typeof value === "function" ? value(previousOpen) : value;

        document.cookie = `${SIDEBAR_COOKIE_NAME}=${nextOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;

        onOpenChange?.(nextOpen);

        return nextOpen;
      });
    },
    [onOpenChange],
  );

  const toggleSidebar = useCallback(
    () => (isMobile ? setSheetOpen((open) => !open) : setOpen((open) => !open)),
    [isMobile, setOpen, setSheetOpen],
  );

  const value = useMemo<SidebarContextProps>(
    () => ({
      isMobile,
      open,
      setOpen,
      setSheetOpen,
      sheetOpen,
      state: open ? "expanded" : "collapsed",
      toggleSidebar,
    }),
    [isMobile, open, setOpen, setSheetOpen, sheetOpen, toggleSidebar],
  );

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.ctrlKey || event.metaKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      },
      { signal: abortController.signal },
    );

    return () => abortController.abort();
  }, [toggleSidebar]);

  return (
    <SidebarContext value={value}>
      <TooltipProvider delayDuration={0}>
        <div
          className={cx(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-gray-50 dark:has-[[data-variant=inset]]:bg-gray-900",
            className,
          )}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  );
};

export const SidebarRail = ({
  className,
  ...props
}: ComponentPropsWithClassName<"button">) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      aria-label="Toggle Sidebar"
      className={cx(
        "absolute inset-y-0 hidden w-4 -translate-x-1/2 transition-all group-data-[collapsible=offcanvas]:translate-x-0 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-gray-50 hover:after:bg-gray-200 sm:flex dark:group-data-[collapsible=offcanvas]:hover:bg-gray-900 [[data-side=left]_&]:cursor-w-resize [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right]_&]:cursor-e-resize [[data-side=right][data-collapsible=offcanvas]_&]:-left-2 [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        className,
      )}
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle Sidebar"
      {...props}
    />
  );
};

export const SidebarTrigger = ({
  asChild,
  onClick,
  ...props
}: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  const Component = useMemo(() => (asChild ? Slot : "button"), [asChild]);

  const handleClick = useCallback<NonNullable<typeof onClick>>(
    (event) => {
      toggleSidebar();
      onClick?.(event);
    },
    [onClick, toggleSidebar],
  );

  return <Component onClick={handleClick} {...props} />;
};

export const SidebarUser = () => {
  const { isMobile } = useSidebar();
  const { setTheme, user } = useUser();
  const { unsetCurrent } = useUsers();

  if (!user) return null;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DeleteCurrentUserDialogProvider>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="group-data-[collapsible=icon]:p-0"
                  closeOnClick={false}
                  size="lg"
                  tooltip={user.name}
                >
                  <Avatar className="shrink-0" user={user} />
                  <div className="grid grow text-sm">
                    <span className="truncate font-medium tracking-tight">
                      {user.name}
                    </span>
                    {/* <span className="truncate text-xs text-gray-500 dark:text-gray-400" /> */}
                  </div>
                  <ChevronsExpandIcon />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                side={isMobile ? "bottom" : "right"}
              >
                <DropdownMenuLabel className="p-0">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-gray-950 dark:text-white">
                    <Avatar className="shrink-0" user={user} />
                    <div className="grid grow text-sm">
                      <span className="truncate font-medium tracking-tight">
                        {user.name}
                      </span>
                      {/* <span className="truncate text-xs text-gray-500 dark:text-gray-400" /> */}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <SunMoonIcon />
                      Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          onValueChange={(theme) => setTheme(theme as Theme)}
                          value={user.theme}
                        >
                          {THEMES.map((theme) => (
                            <DropdownMenuRadioItem
                              className="capitalize"
                              key={theme}
                              value={theme}
                            >
                              {theme}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={unsetCurrent}>
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                  <DeleteCurrentUserDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive-500">
                      <TrashIcon />
                      Delete account
                    </DropdownMenuItem>
                  </DeleteCurrentUserDialogTrigger>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </DeleteCurrentUserDialogProvider>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
