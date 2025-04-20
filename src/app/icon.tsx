import { ImageResponse } from "next/og";

import { UniverssIcon } from "@/components/icons/universs";

export const contentType = "image/png";

export const size = { height: 512, width: 512 };

const Icon = () =>
  new ImageResponse(<UniverssIcon style={{ color: "#e83", ...size }} />, size);

export default Icon;
