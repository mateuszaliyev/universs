import {
  client,
  type Feed,
  type FeedItem,
  type User,
  type UserFeed,
  type UserFeedItem,
} from "@/database/client";

import { generateId } from "@/utilities/id";

interface CreateFeedParameters extends Omit<Feed, "id"> {
  items: Omit<FeedItem, "feedId" | "id">[];
}

interface CreateUserParameters
  extends Pick<User, "name">,
    Partial<Pick<User, "theme">> {}

export const database = {
  feeds: {
    delete: (feedId: Feed["id"]) =>
      client.transaction(
        "rw",
        [
          client.feedItems,
          client.feeds,
          client.userFeedItems,
          client.userFeeds,
          client.users,
        ],
        async () => {
          const feedItems = await client.feedItems.where({ feedId }).toArray();

          const userFeedItems = await client.userFeedItems
            .where("feedItemId")
            .anyOf(feedItems.map((feedItem) => feedItem.id))
            .toArray();

          const userFeed = await client.userFeeds.where({ feedId }).first();

          await client.userFeedItems.bulkDelete(
            userFeedItems.map(({ id }) => id),
          );

          await client.feedItems.bulkDelete(feedItems.map(({ id }) => id));

          if (userFeed) await client.userFeeds.delete(userFeed.id);

          await client.feeds.delete(feedId);
        },
      ),

    get: {
      by: {
        id: (id: Feed["id"]) =>
          client.transaction(
            "r",
            client.feedItems,
            client.feeds,
            client.userFeeds,
            client.users,
            async () => {
              const feed = await client.feeds.where("id").equals(id).first();

              if (!feed) return;

              const user = await database.users.current.get();

              const userFeed = await client.userFeeds
                .where(
                  user
                    ? { feedId: feed.id, userId: user.id }
                    : { feedId: feed.id },
                )
                .first();

              return {
                ...feed,
                items: await client.feedItems
                  .where("feedId")
                  .equals(feed.id)
                  .reverse()
                  .sortBy("isoDate"),
                name: userFeed?.name ?? feed.title,
              };
            },
          ),
      },
    },

    items: {
      create: (feedId: Feed["id"], items: Omit<FeedItem, "feedId" | "id">[]) =>
        client.transaction("rw", client.feedItems, client.feeds, async () => {
          const feedItems = await client.feedItems.where({ feedId }).toArray();

          const feedItemLinks = new Set(feedItems.map((item) => item.link));

          await client.feedItems.bulkAdd(
            items
              .filter((item) => !feedItemLinks.has(item.link))
              .map((item) => ({ ...item, feedId, id: generateId() })),
          );
        }),
    },
  },

  users: {
    count: () => client.users.count(),

    create: ({ name, theme = "system" }: CreateUserParameters) =>
      client.transaction("rw", client.users, async () => {
        await client.users.toCollection().modify({ current: 0 });
        await client.users.add({ current: 1, id: generateId(), name, theme });
      }),

    current: {
      delete: () =>
        client.transaction("rw", client.userFeeds, client.users, async () => {
          const user = await database.users.current.get();

          if (!user) return;

          const feeds = await client.userFeeds
            .where("userId")
            .equals(user.id)
            .count();

          if (feeds) {
            await client.userFeeds.where("userId").equals(user.id).delete();
          }

          await client.users.where("id").equals(user.id).delete();
        }),

      feeds: {
        create: ({ items, ...feed }: CreateFeedParameters) =>
          client.transaction(
            "rw",
            client.feedItems,
            client.feeds,
            client.userFeeds,
            client.users,
            async () => {
              const user = await database.users.current.get();

              if (!user) return;

              const feedId = generateId();

              await client.feeds.add({ ...feed, id: feedId });

              await client.feedItems.bulkAdd(
                items.map((item) => ({ ...item, feedId, id: generateId() })),
              );

              await client.userFeeds.add({
                feedId,
                id: generateId(),
                name: feed.title,
                userId: user.id,
              });

              return client.feeds.where("id").equals(feedId).first();
            },
          ),

        get: {
          all: () =>
            client.transaction(
              "r",
              client.feedItems,
              client.feeds,
              client.userFeeds,
              client.users,
              async () => {
                const user = await database.users.current.get();

                if (!user) return [];

                const userFeeds = await client.userFeeds
                  .where({ userId: user.id })
                  .sortBy("name");

                if (!userFeeds.length) return [];

                const feeds = await client.feeds
                  .where("id")
                  .anyOf(userFeeds.map(({ feedId }) => feedId))
                  .toArray();

                if (!feeds.length) return [];

                const feedMap = new Map(feeds.map((feed) => [feed.id, feed]));

                const feedItems = await client.feedItems
                  .where("feedId")
                  .anyOf(feeds.map((feed) => feed.id))
                  .toArray();

                return userFeeds.map(({ feedId, name }) => {
                  const feed = feedMap.get(feedId)!;

                  return {
                    ...feed,
                    items: feedItems.filter((item) => feed.id === item.feedId),
                    name,
                  };
                });
              },
            ),
        },

        items: {
          get: {
            all: () =>
              client.transaction(
                "r",
                client.feedItems,
                client.feeds,
                client.userFeeds,
                client.users,
                async () => {
                  const user = await database.users.current.get();

                  if (!user) return [];

                  const userFeeds = await client.userFeeds
                    .where({ userId: user.id })
                    .toArray();

                  if (!userFeeds?.length) return [];

                  const feeds = await client.feeds
                    .where("id")
                    .anyOf(userFeeds.map((userFeed) => userFeed.feedId))
                    .toArray();

                  if (!feeds?.length) return [];

                  return client.feedItems
                    .where("feedId")
                    .anyOf(feeds.map((feed) => feed.id))
                    .reverse()
                    .sortBy("isoDate");
                },
              ),

            by: {
              id: (id: FeedItem["id"]) =>
                client.transaction(
                  "r",
                  [
                    client.feedItems,
                    client.feeds,
                    client.userFeedItems,
                    client.userFeeds,
                    client.users,
                  ],
                  async () => {
                    const user = await database.users.current.get();

                    if (!user) return;

                    const feedItem = await client.feedItems
                      .where({ id })
                      .first();

                    if (!feedItem) return;

                    const feed = await client.feeds
                      .where({ id: feedItem.feedId })
                      .first();

                    const userFeed = feed
                      ? await client.userFeeds
                          .where({ feedId: feed.id, userId: user.id })
                          .first()
                      : undefined;

                    const userFeedItem = await client.userFeedItems
                      .where({
                        feedItemId: feedItem.id,
                        userId: user.id,
                      })
                      .first();

                    return {
                      ...feedItem,
                      favorite: userFeedItem?.favorite,
                      feed: { ...feed, name: userFeed?.name },
                      readLater: userFeedItem?.readLater,
                    };
                  },
                ),
            },

            favorites: () =>
              client.transaction(
                "r",
                client.feedItems,
                client.userFeedItems,
                client.users,
                async () => {
                  const user = await database.users.current.get();

                  if (!user) return [];

                  const userFeedItems = await client.userFeedItems
                    .where({ favorite: 1, userId: user.id })
                    .toArray();

                  if (!userFeedItems?.length) return [];

                  return client.feedItems
                    .where("id")
                    .anyOf(userFeedItems.map(({ feedItemId }) => feedItemId))
                    .reverse()
                    .sortBy("isoDate");
                },
              ),

            readLater: () =>
              client.transaction(
                "r",
                client.feedItems,
                client.userFeedItems,
                client.users,
                async () => {
                  const user = await database.users.current.get();

                  if (!user) return [];

                  const userFeedItems = await client.userFeedItems
                    .where({ readLater: 1, userId: user.id })
                    .toArray();

                  if (!userFeedItems?.length) return [];

                  return client.feedItems
                    .where("id")
                    .anyOf(userFeedItems.map(({ feedItemId }) => feedItemId))
                    .reverse()
                    .sortBy("isoDate");
                },
              ),
          },

          update: (
            feedItemId: FeedItem["id"],
            {
              favorite,
              readLater,
            }: Partial<Pick<UserFeedItem, "favorite" | "readLater">>,
          ) =>
            client.transaction(
              "rw",
              client.userFeedItems,
              client.users,
              async () => {
                const user = await database.users.current.get();

                if (!user) return;

                const userFeedItem = await client.userFeedItems
                  .where({ feedItemId, userId: user.id })
                  .count();

                if (!userFeedItem) {
                  return client.userFeedItems.add({
                    favorite: favorite ?? 0,
                    feedItemId,
                    id: generateId(),
                    readLater: readLater ?? 0,
                    userId: user.id,
                  });
                }

                const modification: Partial<
                  Pick<UserFeedItem, "favorite" | "readLater">
                > = {};

                if (typeof favorite !== "undefined") {
                  modification.favorite = favorite;
                }

                if (typeof readLater !== "undefined") {
                  modification.readLater = readLater;
                }

                return client.userFeedItems
                  .where({ feedItemId, userId: user.id })
                  .modify(modification);
              },
            ),
        },

        update: {
          name: (feedId: Feed["id"], name: UserFeed["name"]) =>
            client.transaction(
              "rw",
              client.feeds,
              client.userFeeds,
              client.users,
              async () => {
                const user = await database.users.current.get();

                if (!user) return;

                return client.userFeeds
                  .where({ feedId, userId: user.id })
                  .modify({ name });
              },
            ),
        },
      },

      get: () => client.users.where("current").equals(1).first(),

      set: (user: Pick<User, "id">) =>
        client.transaction("rw", client.users, async () => {
          await database.users.current.unset();
          await client.users.where("id").equals(user.id).modify({ current: 1 });
          return database.users.current.get();
        }),

      unset: () => client.users.toCollection().modify({ current: 0 }),

      update: {
        theme: (theme: User["theme"]) =>
          client.users.where("current").equals(1).modify({ theme }),
      },
    },

    get: () => client.users.orderBy("name").toArray(),
  },
};
