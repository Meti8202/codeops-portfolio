export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/orders/", "/signin", "/kitchen"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
