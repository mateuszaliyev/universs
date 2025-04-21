"use client";

import { useCallback } from "react";

import { redirect } from "next/navigation";

import { UserPlusIcon } from "@/components/icons/user";
import { Link } from "@/components/link";
import { userButton, UserButton } from "@/components/user";

import { useUsers } from "@/database/hooks";

import { paths } from "@/utilities/url";

export const AccountList = () => {
  const { isPending, setCurrent, users } = useUsers();

  const handleClick = useCallback(
    (...parameters: Parameters<typeof setCurrent>) =>
      setCurrent(...parameters).then(() => redirect(paths.dashboard())),
    [setCurrent],
  );

  if (isPending) return null;

  return (
    <ul className="-mx-2 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {users?.map((user) => (
        <li key={user.id}>
          <UserButton onClick={() => handleClick(user)} user={user} />
        </li>
      ))}
      <li>
        <Link className={userButton()} href={paths.accounts.create()}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gray-400 text-white dark:bg-gray-500">
            <UserPlusIcon className="size-4" />
          </div>
          <div className="grid grow">
            <span className="truncate font-medium tracking-tight text-gray-950 dark:text-white">
              Create account
            </span>
          </div>
        </Link>
      </li>
    </ul>
  );
};
