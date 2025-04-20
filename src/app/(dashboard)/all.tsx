"use client";

import { FeedItemPreview } from "@/components/feed/item";

import { useUserFeedItems } from "@/database/hooks";

export const AllFeedItems = () => {
  const feedItems = useUserFeedItems();

  if (!feedItems.data?.length) return null;

  return (
    <div className="mt-16 flex max-w-prose flex-col gap-8">
      {feedItems.data.map((item) => (
        <FeedItemPreview item={item} key={item.id} />
      ))}
    </div>
  );
};
