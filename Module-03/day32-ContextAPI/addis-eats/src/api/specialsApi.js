export async function getSpecials() {
  const response = await fetch("/data/specials.json");

  if (!response.ok) {
    throw new Error("Could not load the special menu. Please try again.");
  }

  return response.json();
}
