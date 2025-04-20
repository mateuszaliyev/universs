import { Svg, type SvgProps } from "@/components/icons/svg";

export const SearchIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
    {children}
  </Svg>
);
