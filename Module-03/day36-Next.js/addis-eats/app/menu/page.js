import menuData from "../../data/menu.json";
import Dishlist from "./Dishlist";
// import Categorybar from "./Categorybar";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function MenuPage() {
  await delay(100);

  // throw new Error("Forced error for testing");

  const dishes = menuData.data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
      <Dishlist dishes={dishes} />
    </div>
  );
}
