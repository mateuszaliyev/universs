import { default as Dexie, type EntityTable } from "dexie";

import type { Theme } from "@/utilities/hooks/theme";
import type {
  Feed as RssFeed,
  FeedItem as RssFeedItem,
} from "@/utilities/schema";

type Binary = 0 | 1;

interface DatabaseClient extends Dexie {
  feedItems: EntityTable<FeedItem, "id">;
  feeds: EntityTable<Feed, "id">;
  userFeedItems: EntityTable<UserFeedItem, "id">;
  userFeeds: EntityTable<UserFeed, "id">;
  users: EntityTable<User, "id">;
}

export interface Feed
  extends Pick<
    RssFeed,
    "description" | "language" | "lastBuildDate" | "link" | "title"
  > {
  id: Id;
  url: RssFeed["feedUrl"];
}

export interface FeedItem
  extends Pick<
    RssFeedItem,
    | "author"
    | "content"
    | "contentEncoded"
    | "contentEncodedSnippet"
    | "contentSnippet"
    | "isoDate"
    | "link"
    | "pubDate"
    | "title"
  > {
  feedId?: Id;
  id: Id;
}

export type Id = string;

export type User = {
  current: Binary;
  id: Id;
  name: string;
  theme: Theme;
};

export type UserFeed = {
  feedId: Id;
  id: Id;
  name: string;
  userId: Id;
};

export type UserFeedItem = {
  favorite: Binary;
  feedItemId: Id;
  id: Id;
  readLater: Binary;
  userId: Id;
};

export const client = new Dexie("universs") as DatabaseClient;

client.version(1).stores({
  feedItems:
    "&id, author, content, contentEncoded, contentEncodedSnippet, contentSnippet, feedId, isoDate, link, pubDate, title",
  feeds: "&id, description, language, lastBuildDate, link, title, url",
  userFeedItems: "&id, favorite, feedItemId, readLater, userId",
  userFeeds: "&id, favorite, feedId, name, readLater, userId",
  users: "&id, current, name, theme",
});
