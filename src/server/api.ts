import Parser from "rss-parser";

import { feed } from "@/utilities/schema";

const parser = new Parser();

export const api = {
  rss: {
    getByUrl: async (url: string) => {
      const result = feed.safeParse(await parser.parseURL(url));

      if (!result.success) return;

      return result.data;
    },
  },
};
