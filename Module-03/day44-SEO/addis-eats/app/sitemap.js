import menuData from "../data/menu.json";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const dishes = menuData.data ?? [];
  const dynamicRoutes = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
