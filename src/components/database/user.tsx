"use client";

import { useCallback, useMemo } from "react";

import { redirect } from "next/navigation";

import { Button } from "@/components/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/dialog/alert";
import { Slot, type AsChild } from "@/components/slot";
import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";

import { database } from "@/database";

import { paths } from "@/utilities/url";

export interface DeleteCurrentUserButtonProps
  extends React.ComponentProps<"button">,
    AsChild {}

export const DeleteCurrentUserDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const handleClick = useCallback(() => {
    toast.promise(database.users.current.delete(), {
      finally: async () => {
        const users = await database.users.count();
        redirect(users ? paths.accounts.select() : paths.accounts.create());
      },
      error: TOAST_DEFAULT_ERROR_MESSAGE,
      loading: "Deleting your account...",
      success: "Account deleted",
    });
  }, []);

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from your browser.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleClick}>
            <Button color="destructive">Delete my account</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteCurrentUserDialogTrigger = ({
  asChild,
  ...props
}: DeleteCurrentUserButtonProps) => {
  const Component = useMemo(() => (asChild ? Slot : "button"), [asChild]);

  return (
    <AlertDialogTrigger asChild>
      <Component {...props} />
    </AlertDialogTrigger>
  );
};
