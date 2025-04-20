import { Avatar } from "@/components/avatar";

import type { User } from "@/database/client";

import { cva } from "@/utilities/classname";

export interface UserButtonProps extends React.ComponentProps<"button"> {
  user: User;
}

export const userButton = cva({
  base: "hocus-visible:bg-gray-200 dark:hocus-visible:bg-gray-800 flex h-12 w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-start text-sm transition outline-none",
});

export const UserButton = ({ className, user, ...props }: UserButtonProps) => (
  <button className={userButton({ className })} {...props}>
    <Avatar className="shrink-0" user={user} />
    <div className="grid grow">
      <span className="truncate font-medium tracking-tight text-gray-950 dark:text-white">
        {user.name}
      </span>
      {/* <span className="truncate text-xs text-gray-500 dark:text-gray-400" /> */}
    </div>
  </button>
);
