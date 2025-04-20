"use client";

import { FeedItemPreview } from "@/components/feed/item";

import { useUserReadLater } from "@/database/hooks";

export const ReadLater = () => {
  const readLater = useUserReadLater();

  if (!readLater.data?.length) return null;

  return (
    <div className="mt-16 flex max-w-prose flex-col gap-8">
      {readLater.data.map((item) => (
        <FeedItemPreview item={item} key={item.id} />
      ))}
    </div>
  );
};
