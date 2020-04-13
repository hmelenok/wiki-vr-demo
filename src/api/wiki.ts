import { WikiError, WikiParseResponse } from "./types";

const WIKI_API_URL = "https://en.wikipedia.org/w/api.php";

export function searchByText(
  searchTerm: string
): Promise<WikiParseResponse | WikiError> {
  return fetch(
    `${WIKI_API_URL}?action=parse&page=${encodeURIComponent(
      searchTerm
    )}&format=json`
  ).then((r) => r.json());
}
