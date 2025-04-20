import { Slot, type AsChild } from "@/components/slot";

import { cx } from "@/utilities/classname";

export interface HeadingProps extends React.ComponentProps<"h2">, AsChild {}

export interface LeadProps extends React.ComponentProps<"p">, AsChild {}

export interface TitleProps extends React.ComponentProps<"h1">, AsChild {}

export const Heading = ({ asChild, className, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "h2";

  return (
    <Component
      className={cx("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  );
};

export const Lead = ({ asChild, className, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "p";

  return (
    <Component
      className={cx("mt-4 text-xl text-gray-400", className)}
      {...props}
    />
  );
};

export const Title = ({ asChild, className, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "h1";

  return (
    <Component
      className={cx(
        "text-4xl font-medium tracking-tight text-balance",
        className,
      )}
      {...props}
    />
  );
};
