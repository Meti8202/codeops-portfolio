export async function getMenu() {
  const response = await fetch("/data/menu.json");

  if (!response.ok) {
    throw new Error("Could not load the menu. Please try again.");
  }

  return response.json();
}
