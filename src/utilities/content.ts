import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import sanitize from "sanitize-html";
import { unified } from "unified";

import { Anchor, Heading1 } from "@/components/content";

const production = { Fragment, jsx, jsxs } as Parameters<typeof rehypeReact>[0];

const contentProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    ...production,
    components: {
      a: Anchor,
      h1: Heading1,
    },
  });

export const processContent = (content: string) =>
  contentProcessor.processSync(
    sanitize(content, {
      allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
    }),
  ).result;
