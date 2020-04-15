import { WikiError, WikiParseResponse } from "./types";

export const WIKI_API_URL = "https://en.wikipedia.org/w/api.php";

export function searchByText(
  searchTerm: string
): Promise<WikiParseResponse | WikiError> {
  return fetch(
    `${WIKI_API_URL}?action=parse&page=${encodeURIComponent(
      searchTerm
    )}&format=json&origin=*`,
    {}
  ).then((r) => r.json());
}

export function getRandomPage() {
  return fetch(`${WIKI_API_URL}?action=query&list=random&format=json&origin=*`, {
    headers: {
      Origin: window.location.origin,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
