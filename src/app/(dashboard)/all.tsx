"use client";

import {
  FeedItemPreview,
  FeedItemPreviewList,
} from "@/components/feed/item/preview";

import { useUserFeedItems } from "@/database/hooks";

export const AllFeedItems = () => {
  const feedItems = useUserFeedItems();

  if (!feedItems.data?.length) return null;

  return (
    <FeedItemPreviewList>
      {feedItems.data.map((item) => (
        <FeedItemPreview item={item} key={item.id} />
      ))}
    </FeedItemPreviewList>
  );
};
