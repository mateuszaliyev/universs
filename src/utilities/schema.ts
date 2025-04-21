import * as z from "@zod/mini";

export type Feed = z.output<typeof feed>;
export type FeedItem = z.output<typeof feedItem>;

const string = z.string();
const url = z.url();

export const feedItem = z.pipe(
  z.interface({
    /**
     * Email address of the author of the item.
     */
    "author?": string,
    "categories?": z.array(string),
    /**
     * URL of a page for comments relating to the item.
     */
    "comments?": string,
    "content?": string,
    "content:encoded?": string,
    "content:encodedSnippet?": string,
    "contentSnippet?": string,
    "dc:creator?": string,
    /**
     * The item synopsis.
     */
    "description?": string,
    /**
     * Describes a media object that is attached to the item.
     */
    "enclosure?": z.interface({
      length: string,
      type: string,
      url,
    }),
    /**
     * A string that uniquely identifies the item.
     */
    "guid?": string,
    "id?": string,
    "isoDate?": string,
    /**
     * The URL of the item.
     */
    "link?": url,
    /**
     * Indicates when the item was published.
     */
    "pubDate?": string,
    /**
     * The RSS channel that the item came from.
     */
    "source?": string,
    /**
     * The title of the item.
     */
    "title?": string,
  }),
  z.transform(
    ({
      "content:encoded": contentEncoded,
      "content:encodedSnippet": contentEncodedSnippet,
      "dc:creator": dcCreator,
      ...item
    }) => ({
      ...item,
      contentEncoded,
      contentEncodedSnippet,
      dcCreator,
    }),
  ),
);

/**
 * @see {@link https://rssboard.org/rss-specification RSS 2.0 Specification}
 */
export const feed = z.interface({
  /**
   * Copyright notice for content in the channel.
   */
  "copyright?": string,
  /**
   * Phrase or sentence describing the channel.
   */
  "description?": string,
  "feedUrl?": url,
  /**
   * A string indicating the program used to generate the channel.
   */
  "generator?": string,
  items: z.array(feedItem),
  /**
   * The language the channel is written in. This allows aggregators to group
   * all Italian language sites, for example, on a single page.
   */
  "language?": string,
  /**
   * The last time the content of the channel changed.
   */
  "lastBuildDate?": string,
  /**
   * The URL to the HTML website corresponding to the channel.
   */
  link: url,
  /**
   * Email address for person responsible for editorial content.
   */
  "managingEditor?": string,
  /**
   * The publication date for the content in the channel. For example, the New
   * York Times publishes on a daily basis, the publication date flips once
   * every 24 hours. That's when the pubDate of the channel changes. All
   * date-times in RSS conform to the Date and Time Specification of RFC 822,
   * with the exception that the year may be expressed with two characters or
   * four characters (four preferred).
   */
  "pubDate?": string,
  /**
   * The name of the channel. It's how people refer to your service. If you
   * have an HTML website that contains the same information as your RSS file,
   * the title of your channel should be the same as the title of your website.
   */
  title: string,
  /**
   * Email address for person responsible for technical issues relating to
   * channel.
   */
  "webMaster?": string,
});
