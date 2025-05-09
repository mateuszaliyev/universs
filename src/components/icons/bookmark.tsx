import { Svg, type SvgProps } from "@/components/icons/svg";

export const BookmarkIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    {children}
  </Svg>
);
