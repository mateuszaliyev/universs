import { Svg, type SvgProps } from "@/components/icons/svg";

export const SquareUserIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    {children}
  </Svg>
);

export const UserPlusIcon = ({ children, ...props }: SvgProps) => (
  <Svg {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
    {children}
  </Svg>
);
