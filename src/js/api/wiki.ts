import wiki, { Page } from "wikijs";

export function searchByText(searchTerm: string): Promise<Page> {
  return wiki().page(searchTerm);
}

export function getRandomPage() {
  return wiki().random();
}

export function searchByTitle(title: string): Promise<string> {
  return (
    wiki()
      .find(title)
      //@ts-ignore
      .then((page) => page.raw.title)
  );
}
