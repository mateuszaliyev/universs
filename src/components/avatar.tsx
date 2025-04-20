"use client";

import { useMemo } from "react";

import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import type { User } from "@/database/client";

import {
  cva,
  VariantProps,
  type ComponentPropsWithClassName,
} from "@/utilities/classname";

export interface AvatarProps
  extends Omit<ComponentPropsWithClassName<"img">, "src">,
    VariantProps<typeof avatar> {
  user: Pick<User, "id">;
}

const SIZES: Record<NonNullable<AvatarProps["size"]>, number> = {
  md: 32,
  sm: 24,
};

const avatar = cva({
  base: "shrink-0",
  defaultVariants: { size: "md" },
  variants: { size: { md: "size-8 rounded-md", sm: "size-6 rounded" } },
});

export const Avatar = ({
  alt = "",
  className,
  size = "md",
  user,
  ...props
}: AvatarProps) => {
  const source = useMemo(
    () => createAvatar(thumbs, { seed: user.id, size: 24 }).toDataUri(),
    [user.id],
  );

  return (
    <img
      alt={alt}
      className={avatar({ className, size })}
      height={SIZES[size]}
      src={source}
      width={SIZES[size]}
      {...props}
    />
  );
};
