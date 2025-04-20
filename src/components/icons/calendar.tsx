import { Svg, type SvgProps } from "@/components/icons/svg";

export const CalendarIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M3 10h18" />
    {children}
  </Svg>
);
