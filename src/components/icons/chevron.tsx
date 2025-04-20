import { Svg, type SvgProps } from "@/components/icons/svg";

export const ChevronsExpandIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
    {children}
  </Svg>
);

export const ChevronIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="m18 15-6-6-6 6" />
    {children}
  </Svg>
);
