import { WikiError, WikiParseResponse } from "./types";
import wiki from "wikijs";

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
  return wiki().random();
}
