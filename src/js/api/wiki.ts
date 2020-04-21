import wiki, { Page } from "wikijs";

export function searchByText(searchTerm: string): Promise<Page> {
  return wiki({ origin: window.location.origin }).page(searchTerm);
}

export function getRandomPage() {
  return wiki({ origin: window.location.origin }).random();
}

export function searchByTitle(title: string): Promise<string> {
  return (
    wiki({ origin: window.location.origin })
      .find(title)
      //@ts-ignore
      .then((page) => page.raw.title)
  );
}
