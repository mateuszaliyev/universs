"use client";

import {
  FeedItemPreview,
  FeedItemPreviewList,
} from "@/components/feed/item/preview";

import { useUserReadLater } from "@/database/hooks";

export const ReadLater = () => {
  const readLater = useUserReadLater();

  if (!readLater.data?.length) return null;

  return (
    <FeedItemPreviewList>
      {readLater.data.map((item) => (
        <FeedItemPreview item={item} key={item.id} />
      ))}
    </FeedItemPreviewList>
  );
};
