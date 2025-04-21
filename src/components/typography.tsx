import { Slot, type AsChild } from "@/components/slot";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";

import { cx } from "@/utilities/classname";

export interface HeadingProps extends React.ComponentProps<"h2">, AsChild {}

export interface LeadProps extends React.ComponentProps<"p">, AsChild {}

export interface TitleProps extends React.ComponentProps<"h1">, AsChild {}

export interface TitleOptionProps
  extends React.ComponentProps<"button">,
    AsChild {
  label: React.ReactNode;
}

export const Heading = ({ asChild, className, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "h2";

  return (
    <Component
      className={cx("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  );
};

export const Kicker = ({ asChild, className, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "p";

  return (
    <Component
      className={cx(
        "-mt-4 mb-4 text-sm text-gray-500 uppercase dark:text-gray-400",
        className,
      )}
      {...props}
    />
  );
};

export const Lead = ({ asChild, className, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "p";

  return (
    <Component
      className={cx("mt-4 text-xl text-gray-500 dark:text-gray-400", className)}
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

export const TitleOption = ({
  asChild,
  className,
  label: tooltip,
  ...props
}: TitleOptionProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Component
          className={cx(
            "hocus-visible:bg-gray-200 dark:hocus-visible:bg-gray-800 flex size-8 cursor-pointer items-center justify-center rounded-md text-gray-500 transition outline-none dark:text-gray-400 [&>svg]:size-5",
            className,
          )}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export const TitleOptions = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cx("flex items-center gap-2", className)} {...props} />
);

export const TitleOptionsContainer = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cx("flex items-center justify-between gap-8", className)}
    {...props}
  />
);
