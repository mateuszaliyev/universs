export const paths = {
  accounts: {
    create: () => "/accounts/create",
    select: () => "/accounts/select",
  },
  dashboard: () => "/",
  favorites: () => "/favorites",
  feeds: { add: () => "/feeds/add", id: (id: string) => `/feeds/${id}` },
  posts: { id: (id: string) => `/posts/${id}` },
  readLater: () => "/read-later",
};
