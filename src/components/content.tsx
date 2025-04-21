import { Link, type LinkProps } from "@/components/link";

export const Anchor = ({ target = "_blank", ...props }: LinkProps) => (
  <Link target={target} {...props} />
);

export const Heading1 = (props: React.ComponentProps<"h1">) => (
  <h2 {...props} />
);
