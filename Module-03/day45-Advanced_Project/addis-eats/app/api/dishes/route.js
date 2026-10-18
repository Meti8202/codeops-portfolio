import menuData from "@/data/menu.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 6;

  let dishes = menuData.data ?? menuData;

  if (q) {
    dishes = dishes.filter(
      (d) =>
        d.nameEn?.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.category?.toLowerCase().includes(q),
    );
  }

  const total = dishes.length;
  const start = (page - 1) * pageSize;
  const items = dishes.slice(start, start + pageSize);

  return Response.json({
    items,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize) || 1,
  });
}
