import wiki, { Page } from "wikijs";

export function searchByText(searchTerm: string): Promise<Page> {
  return wiki().page(searchTerm);
}

export function getRandomPage() {
  return wiki().random();
}
