"use client";

import { useCallback } from "react";

import { BookmarkIcon } from "@/components/icons/bookmark";
import { StarIcon } from "@/components/icons/star";
import { Link } from "@/components/link";
import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { Heading } from "@/components/typography";

import { database } from "@/database";
import type { FeedItem } from "@/database/client";
import { useUserFeedItem } from "@/database/hooks";

import { cva, cx } from "@/utilities/classname";
import { paths } from "@/utilities/url";

export interface FeedItemPreviewProps
  extends Omit<React.ComponentProps<"article">, "children"> {
  item: FeedItem;
}

const option = cva({
  base: "hocus-visible:text-gray-950 dark:hocus-visible:text-white flex size-8 cursor-pointer items-center justify-center text-gray-500 transition dark:text-gray-400",
});

const optionIcon = cva({
  base: "size-4",
  variants: { fill: { true: "fill-current" } },
});

export const FeedItemPreview = ({
  className,
  item,
  ...props
}: FeedItemPreviewProps) => {
  const userFeedItem = useUserFeedItem(item.id);

  const handleFavorite = useCallback(() => {
    if (typeof userFeedItem.data === "undefined") return;

    toast.promise(
      database.users.current.feeds.items.update(userFeedItem.data.id, {
        favorite: userFeedItem.data.favorite ? 0 : 1,
      }),
      {
        error: TOAST_DEFAULT_ERROR_MESSAGE,
        loading: "Adding to favorites...",
        success: {
          description: userFeedItem.data.title,
          message: userFeedItem.data.favorite
            ? "Removed from favorites"
            : "Added to favorites",
        },
      },
    );
  }, [userFeedItem.data]);

  const handleReadLater = useCallback(() => {
    if (typeof userFeedItem.data === "undefined") return;

    toast.promise(
      database.users.current.feeds.items.update(userFeedItem.data.id, {
        readLater: userFeedItem.data.readLater ? 0 : 1,
      }),
      {
        error: TOAST_DEFAULT_ERROR_MESSAGE,
        loading: "Adding to read later list...",
        success: {
          description: userFeedItem.data.title,
          message: userFeedItem.data.readLater
            ? "Removed from read later list"
            : "Added to read later list",
        },
      },
    );
  }, [userFeedItem.data?.id, userFeedItem.data?.readLater]);

  return (
    <article
      className={cx(
        "has-hocus-visible:before:bg-gray-200 group dark:has-hocus-visible:before:bg-gray-800 relative flex flex-col gap-2 before:absolute before:-inset-4 before:z-[-1] before:rounded-xl before:transition",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Heading className="text-balance">
          <Link className="outline-none" href={paths.posts.id(item.id)}>
            <span className="absolute -inset-4" />
            {item.title}
          </Link>
        </Heading>
        <div className="group-has-hocus-visible:opacity-100 relative flex min-w-16 items-center justify-center opacity-0 transition">
          {userFeedItem.data && (
            <>
              <Tooltip>
                <TooltipTrigger className={option()} onClick={handleReadLater}>
                  <BookmarkIcon
                    className={optionIcon({
                      fill: Boolean(userFeedItem.data.readLater),
                    })}
                  />
                  <span className="sr-only">
                    {userFeedItem.data?.readLater
                      ? "Remove from read later list"
                      : "Read later"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {userFeedItem.data?.readLater
                    ? "Remove from read later list"
                    : "Read later"}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className={option()} onClick={handleFavorite}>
                  <StarIcon
                    className={optionIcon({
                      fill: Boolean(userFeedItem.data.favorite),
                    })}
                  />
                  <span className="sr-only">
                    {userFeedItem.data?.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {userFeedItem.data?.favorite
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {item.author && <span>by {item.author}</span>}
        {item.author && item.isoDate && " / "}
        {item.isoDate && (
          <time dateTime={item.isoDate}>
            {new Date(item.isoDate).toLocaleDateString("en", {
              dateStyle: "medium",
            })}
          </time>
        )}
      </p>
      <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
        {item.contentSnippet}
      </p>
    </article>
  );
};
