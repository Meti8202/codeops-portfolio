import menuData from "../../data/menu.json";
import MenuClient from "./MenuClient";

export const revalidate = 1500;

export default async function MenuPage() {
  const dishes = menuData.data;
  const categories = [...new Set(dishes.map((d) => d.category))];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
      <MenuClient categories={categories} dishes={dishes} />
    </div>
  );
}
