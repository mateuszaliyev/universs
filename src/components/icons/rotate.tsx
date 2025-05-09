import { Svg, type SvgProps } from "@/components/icons/svg";

export const RotateClockwiseIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    {children}
  </Svg>
);
