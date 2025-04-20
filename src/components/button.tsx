import { cva, type VariantProps } from "@/utilities/classname";

import { Slot, type AsChild } from "./slot";

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    AsChild,
    VariantProps<typeof button> {}

const button = cva({
  base: "inline-flex cursor-pointer items-center justify-center transition",
  compoundVariants: [
    {
      className:
        "rounded-md border px-3 py-2 text-sm font-medium outline-offset-5",
      variant: ["contained", "outlined"],
    },
    {
      className: "border-destructive-500 bg-destructive-500 text-white",
      color: "destructive",
      variant: "contained",
    },
    {
      className:
        "border-gray-300 bg-gray-100 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500",
      color: "disabled",
      variant: "contained",
    },
    {
      className:
        "border-gray-950 bg-gray-950 text-white hover:border-gray-800 hover:bg-gray-800 dark:border-white dark:bg-white dark:text-gray-950 dark:hover:border-gray-200 dark:hover:bg-gray-200",
      color: "primary",
      variant: "contained",
    },
  ],
  defaultVariants: { color: "primary", variant: "contained" },
  variants: {
    color: { destructive: "", disabled: "cursor-not-allowed", primary: "" },
    variant: {
      contained: "",
      outlined: "",
    },
  },
});

export const Button = ({
  asChild,
  className,
  color,
  disabled,
  variant,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={button({
        className,
        color: disabled ? "disabled" : color,
        variant,
      })}
      disabled={disabled}
      {...props}
    />
  );
};
