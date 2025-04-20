import {
  cva,
  type ComponentPropsWithClassName,
  type VariantProps,
} from "@/utilities/classname";

export interface ContainerProps
  extends ComponentPropsWithClassName<"div">,
    VariantProps<typeof container> {}

const container = cva({
  base: "mx-auto w-full px-4 md:px-8",
  defaultVariants: { size: "md" },
  variants: { size: { md: "max-w-4xl", sm: "max-w-md" } },
});

export const Container = ({ className, size, ...props }: ContainerProps) => (
  <div className={container({ className, size })} {...props} />
);
