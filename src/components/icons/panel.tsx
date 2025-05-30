import { Svg, type SvgProps } from "@/components/icons/svg";

export const PanelIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    {children}
  </Svg>
);
