import { Fragment } from "react";

import type { FeedItem } from "@/database/client";

import { formatDate } from "@/utilities/date";

export const FeedItemDetails = ({ item }: { item: FeedItem }) =>
  [
    item.author && <span>by {item.author}</span>,
    item.isoDate && (
      <time dateTime={item.isoDate}>{formatDate(item.isoDate)}</time>
    ),
  ]
    .filter(Boolean)
    .map((element, index, elements) => (
      <Fragment key={index}>
        {element}
        {!index && elements.length > 1 ? <span> / </span> : null}
      </Fragment>
    ));
