import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/schedule/", "/wallet/", "/settings/"],
    },
    sitemap: "https://carus.com.ng/sitemap.xml",
  };
}
