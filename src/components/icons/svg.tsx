export const XMLNS = "http://www.w3.org/2000/svg";

export type SvgProps = React.ComponentProps<"svg">;

export const Svg = ({
  "aria-hidden": ariaHidden = true,
  fill = "none",
  stroke = "currentColor",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  strokeWidth = "2",
  viewBox = "0 0 24 24",
  xmlns = XMLNS,
  ...props
}: SvgProps) => (
  <svg
    aria-hidden={ariaHidden}
    fill={fill}
    stroke={stroke}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    strokeWidth={strokeWidth}
    viewBox={viewBox}
    xmlns={xmlns}
    {...props}
  />
);
