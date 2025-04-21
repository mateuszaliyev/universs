/* eslint-disable @next/next/no-img-element */

"use client";

import { useMemo } from "react";

import { notFound } from "next/navigation";

import { FeedItemDetails } from "@/components/feed/item/details";
import { BookmarkIcon } from "@/components/icons/bookmark";
import { ExternalLinkIcon } from "@/components/icons/link";
import { StarIcon } from "@/components/icons/star";
import { Link } from "@/components/link";
import {
  Kicker,
  Title,
  TitleOption,
  TitleOptions,
  TitleOptionsContainer,
} from "@/components/typography";

import type { FeedItem as FeedItemType } from "@/database/client";
import { useUserFeedItem } from "@/database/hooks";

import { APPLICATION_NAME } from "@/utilities/application";
import { processContent } from "@/utilities/content";

export const FeedItem = ({ id }: { id: FeedItemType["id"] }) => {
  const { toggleFavorite, toggleReadLater, userFeedItem } = useUserFeedItem(id);

  const content = useMemo(
    () =>
      processContent(
        userFeedItem.data?.contentEncoded ?? userFeedItem.data?.content ?? "",
      ),
    [userFeedItem.data],
  );

  if (userFeedItem.isPending) return null;

  if (!userFeedItem.data) return notFound();

  document.title = `${userFeedItem.data.title} | ${APPLICATION_NAME}`;

  return (
    <>
      <Kicker>{userFeedItem.data.feed.name}</Kicker>
      <TitleOptionsContainer>
        <Title>{userFeedItem.data.title}</Title>
        <TitleOptions>
          <TitleOption
            label={
              userFeedItem.data?.readLater
                ? "Remove from read later list"
                : "Read later"
            }
            onClick={toggleReadLater}
          >
            <BookmarkIcon
              className={
                userFeedItem.data?.readLater ? "fill-current" : undefined
              }
            />
          </TitleOption>
          <TitleOption
            label={
              userFeedItem.data?.favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            onClick={toggleFavorite}
          >
            <StarIcon
              className={
                userFeedItem.data?.favorite ? "fill-current" : undefined
              }
            />
          </TitleOption>
          {userFeedItem.data?.link && (
            <TitleOption asChild label="Visit the website">
              <Link href={userFeedItem.data.link} target="_blank">
                <ExternalLinkIcon />
              </Link>
            </TitleOption>
          )}
        </TitleOptions>
      </TitleOptionsContainer>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <FeedItemDetails item={userFeedItem.data} />
      </p>
      <div className="prose prose-headings:font-medium prose-headings:tracking-tight prose-img:rounded-lg md:prose-lg prose-zinc dark:prose-invert mt-16">
        {userFeedItem.data.enclosure && (
          <figure className="pb-8">
            <img alt="" src={userFeedItem.data.enclosure.url} />
          </figure>
        )}
        {content}
      </div>
    </>
  );
};
