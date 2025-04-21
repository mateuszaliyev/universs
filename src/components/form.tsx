import { cx } from "@/utilities/classname";

export const Form = ({ className, ...props }: React.ComponentProps<"form">) => (
  <form className={cx("flex flex-col gap-4", className)} {...props} />
);
