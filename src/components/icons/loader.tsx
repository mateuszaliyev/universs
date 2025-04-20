import { Svg, type SvgProps } from "@/components/icons/svg";

export const LoaderIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <g className="animate-loader-group origin-center">
      <circle className="animate-loader-circle" cx="12" cy="12" r="9.5" />
    </g>
    {children}
  </Svg>
);
