"use client";

import {
  FeedItemPreview,
  FeedItemPreviewList,
} from "@/components/feed/item/preview";

import { useUserFavorites } from "@/database/hooks";

export const Favorites = () => {
  const favorites = useUserFavorites();

  if (!favorites.data?.length) return null;

  return (
    <FeedItemPreviewList>
      {favorites.data.map((item) => (
        <FeedItemPreview item={item} key={item.id} />
      ))}
    </FeedItemPreviewList>
  );
};
