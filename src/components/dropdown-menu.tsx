"use client";

import {
  CheckboxItem,
  Content,
  DropdownMenuSeparatorProps,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuContentProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuItemProps as MenuItemProps,
  type DropdownMenuLabelProps as MenuLabelProps,
  type DropdownMenuSubTriggerProps as SubTriggerProps,
} from "@radix-ui/react-dropdown-menu";

import { CheckIcon } from "@/components/icons/check";
import { ChevronIcon } from "@/components/icons/chevron";

import { cva, cx, VariantProps } from "@/utilities/classname";

export {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface DropdownMenuItemProps
  extends MenuItemProps,
    VariantProps<typeof dropdownMenuItem> {}

interface DropdownMenuLabelProps
  extends MenuLabelProps,
    VariantProps<typeof dropdownMenuLabel> {}

interface DropdownMenuSubTriggerProps
  extends SubTriggerProps,
    VariantProps<typeof dropdownMenuItem> {}

const inset = { true: "pl-8" };

const dropdownMenuContent = cva({
  base: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-(--z-popover) max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-white",
});

const dropdownMenuItem = cva({
  base: "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition outline-none select-none focus:bg-gray-100 data-[disabled]:cursor-not-allowed data-[disabled]:text-gray-400 dark:focus:bg-gray-800 dark:data-[disabled]:text-gray-500 [&>svg]:size-4 [&>svg]:shrink-0",
  variants: { inset },
});

const dropdownMenuItemIndicator = cva({
  base: "absolute left-2 flex size-4 items-center justify-center",
});

const dropdownMenuLabel = cva({
  base: "px-2 py-1.5 text-xs font-medium tracking-tight text-gray-500 dark:text-gray-400",
  variants: { inset },
});

export const DropdownMenuCheckboxItem = ({
  children,
  className,
  ...props
}: DropdownMenuCheckboxItemProps) => (
  <CheckboxItem
    className={dropdownMenuItem({ className, inset: true })}
    {...props}
  >
    <ItemIndicator className={dropdownMenuItemIndicator()}>
      <CheckIcon className="size-full" />
    </ItemIndicator>
    {children}
  </CheckboxItem>
);

export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) => (
  <Portal>
    <Content
      className={dropdownMenuContent({ className })}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
);

export const DropdownMenuItem = ({
  className,
  inset,
  ...props
}: DropdownMenuItemProps) => (
  <Item className={dropdownMenuItem({ className, inset })} {...props} />
);

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) => (
  <Label className={dropdownMenuLabel({ className, inset })} {...props} />
);

export const DropdownMenuRadioItem = ({
  children,
  className,
  ...props
}: DropdownMenuRadioItemProps) => (
  <RadioItem
    className={dropdownMenuItem({ className, inset: true })}
    {...props}
  >
    <ItemIndicator className={dropdownMenuItemIndicator()}>
      <span className="size-2 rounded-full bg-current" />
    </ItemIndicator>
    {children}
  </RadioItem>
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => (
  <Separator
    className={cx("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800", className)}
    {...props}
  />
);

export const DropdownMenuSubContent = ({
  className,
  ...props
}: DropdownMenuSubContentProps) => (
  <SubContent className={dropdownMenuContent({ className })} {...props} />
);

export const DropdownMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: DropdownMenuSubTriggerProps) => (
  <SubTrigger className={dropdownMenuItem({ className, inset })} {...props}>
    {children}
    <ChevronIcon className="ml-auto rotate-90" />
  </SubTrigger>
);
