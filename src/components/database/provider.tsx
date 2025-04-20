"use client";

import { useEffect, useState } from "react";

import { redirect, usePathname } from "next/navigation";

import { useUserCount } from "@/database/hooks";

import { paths } from "@/utilities/url";

export const DatabaseProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const { data: userCount, isPending } = useUserCount();

  useEffect(() => {
    if (userCount) setShow(true);

    if (userCount === 0 && pathname !== paths.accounts.create()) {
      redirect(paths.accounts.create());
    }
  }, [pathname, userCount]);

  if (isPending) return null;

  return show ? children : null;
};
