import { Svg, type SvgProps } from "@/components/icons/svg";

export const CheckIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="M20 6 9 17l-5-5" />
    {children}
  </Svg>
);

export const CircleCheckBigIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
    <path d="m9 11 3 3L22 4" />
    {children}
  </Svg>
);
