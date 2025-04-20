import type { Metadata, MetadataRoute } from "next";

export const index = (index?: boolean): Metadata["robots"] => {
  const robots: Metadata["robots"] = index
    ? { follow: true, index: true }
    : {
        follow: false,
        index: false,
        indexifembedded: false,
        "max-image-preview": "none",
        noarchive: true,
        nocache: true,
        noimageindex: true,
        nositelinkssearchbox: true,
        nosnippet: true,
        notranslate: true,
      };

  return { ...robots, googleBot: robots };
};

export const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      disallow: "/",
      userAgent: "Googlebot-Image",
    },
    {
      disallow: "/",
      userAgent: "*",
    },
  ],
});
