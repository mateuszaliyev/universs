"use client";

import { useEffect, useState } from "react";

import { redirect, usePathname } from "next/navigation";

import { useUser, useUserCount } from "@/database/hooks";

import { paths } from "@/utilities/url";

export const DatabaseProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const { user } = useUser();
  const { data: userCount, isPending } = useUserCount();

  useEffect(() => {
    console.log({ isPending, pathname, user, userCount });

    if (isPending) return;

    if (typeof userCount === "undefined") return;

    if (user || pathname === paths.accounts.select()) return setShow(true);

    if (!user && userCount > 0 && pathname !== paths.accounts.select()) {
      redirect(paths.accounts.select());
    }

    if (userCount === 0 && pathname !== paths.accounts.create()) {
      redirect(paths.accounts.create());
    }
  }, [isPending, pathname, user, userCount]);

  if (isPending) return null;

  return show ? children : null;
};
