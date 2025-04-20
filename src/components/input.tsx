import { cva, cx, type VariantProps } from "@/utilities/classname";

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof input> {}

const input = cva({
  base: "aria-invalid:border-destructive-500 aria-invalid:ring-destructive-500 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition outline-none hover:border-gray-300 focus:border-gray-400 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 aria-invalid:focus:ring-1 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-gray-700 dark:focus:border-gray-400 dark:disabled:border-gray-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
});

export const Input = ({ className, ...props }: InputProps) => (
  <input className={input({ className })} {...props} />
);

export const InputIconContainer = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cx(
      "relative dark:text-gray-500 dark:focus-within:text-white [&>input]:pl-9 [&>svg]:pointer-events-none [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-3 [&>svg]:size-4 [&>svg]:-translate-y-1/2 [&>svg]:transition",
      className,
    )}
    {...props}
  />
);
