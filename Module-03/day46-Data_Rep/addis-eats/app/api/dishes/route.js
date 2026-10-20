import menuData from "@/data/menu.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";
  const category = searchParams.get("category")?.trim() || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 6;

  let dishes = menuData.data ?? menuData;

  
  if (q) {
    dishes = dishes.filter(
      (d) =>
        d.nameEn?.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q),
    );
  }

  if (category) {
    dishes = dishes.filter((d) => d.category === category);
  }

  const total = dishes.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const items = dishes.slice(start, start + pageSize);

  return Response.json({
    items,
    page: safePage,
    pageSize,
    total,
    totalPages,
  });
}
