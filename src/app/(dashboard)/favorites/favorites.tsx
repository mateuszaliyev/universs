"use client";

import { FeedItemPreview } from "@/components/feed/item";

import { useUserFavorites } from "@/database/hooks";

export const Favorites = () => {
  const favorites = useUserFavorites();

  if (!favorites.data?.length) return null;

  return (
    <div className="mt-16 flex max-w-prose flex-col gap-8">
      {favorites.data.map((item) => (
        <FeedItemPreview item={item} key={item.id} />
      ))}
    </div>
  );
};
