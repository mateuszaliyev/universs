import { cx, type ComponentPropsWithClassName } from "@/utilities/classname";

export type SkeletonProps = ComponentPropsWithClassName<"div">;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cx(
      "animate-pulse rounded-md bg-gray-950/10 dark:bg-white/10",
      className,
    )}
    {...props}
  />
);
