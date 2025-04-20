import { Svg, type SvgProps } from "@/components/icons/svg";

export const PlusIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
    {children}
  </Svg>
);
