import { useCallback } from "react";

import { redirect } from "next/navigation";

import { useLiveQuery as useDexieLiveQuery } from "dexie-react-hooks";

import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";

import { database } from "@/database";
import type { Feed, FeedItem, User } from "@/database/client";

import { useTheme, type Theme } from "@/utilities/hooks/theme";
import { paths } from "@/utilities/url";

type UseLiveQueryResult<Data> =
  | { data: Data; isPending: false }
  | {
      data?: undefined;
      isPending: true;
    };

const USE_LIVE_QUERY_PENDING = Symbol("USE_LIVE_QUERY_PENDING");

export const useLiveQuery = <Data>(
  querier: () => Promise<Data> | Data,
  dependencies?: unknown[],
): UseLiveQueryResult<Data> => {
  const data = useDexieLiveQuery(
    querier,
    dependencies ?? [],
    USE_LIVE_QUERY_PENDING,
  );

  if (data === USE_LIVE_QUERY_PENDING) return { isPending: true };

  return { data, isPending: false };
};

export const useFeed = (id: Feed["id"]) =>
  useLiveQuery(() => database.feeds.get.by.id(id), [id]);

export const useUser = () => {
  const { setTheme } = useTheme();

  const user = useLiveQuery(database.users.current.get);

  const setThemeInternal = useCallback(
    async (theme: Theme) => {
      await database.users.current.update.theme(theme);
      setTheme(theme);
    },
    [setTheme],
  );

  return {
    isPending: user.isPending,
    setTheme: setThemeInternal,
    user: user.data,
  };
};

export const useUserCount = () => useLiveQuery(() => database.users.count());

export const useUserFavorites = () =>
  useLiveQuery(database.users.current.feeds.items.get.favorites);

export const useUserFeedItem = (id: FeedItem["id"]) =>
  useLiveQuery(() => database.users.current.feeds.items.get.by.id(id), [id]);

export const useUserFeedItems = () =>
  useLiveQuery(database.users.current.feeds.items.get.all);

export const useUserFeeds = () =>
  useLiveQuery(database.users.current.feeds.get.all);

export const useUserReadLater = () =>
  useLiveQuery(database.users.current.feeds.items.get.readLater);

export const useUsers = () => {
  const { setTheme } = useTheme();

  const users = useLiveQuery(database.users.get);

  const setCurrent = useCallback(
    (user: Pick<User, "id" | "name">) => {
      const setCurrent = async () => {
        const newUser = await database.users.current.set(user);
        if (newUser) setTheme(newUser.theme);
      };

      return new Promise((resolve) => {
        toast.promise(setCurrent, {
          finally: () => {
            resolve(undefined);
            redirect(paths.dashboard());
          },
          error: TOAST_DEFAULT_ERROR_MESSAGE,
          loading: `Logging in as ${user.name}...`,
          success: `Logged in as ${user.name}`,
        });
      });
    },
    [setTheme],
  );

  const unsetCurrent = useCallback(() => {
    return new Promise((resolve) => {
      toast.promise(database.users.current.unset(), {
        finally: () => {
          resolve(undefined);
          redirect(paths.accounts.select());
        },
        error: TOAST_DEFAULT_ERROR_MESSAGE,
        loading: `Logging out...`,
        success: `Logged out successfully`,
      });
    });
  }, []);

  return {
    isPending: users.isPending,
    setCurrent,
    unsetCurrent,
    users: users.data,
  };
};
