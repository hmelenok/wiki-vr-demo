import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import dropRight from "lodash/dropRight";
import { Page } from "wikijs";

export interface ReduxAction {
  [key: string]: string | number;
  type:
    | "SET_RANDOM_WIKI_TITLE"
    | "SET_WANTED_WIKI_TITLE"
    | "SET_CURRENT_WIKI_PAGE"
    | "SET_SEARCHED_WIKI_TITLE"
    | "SET_SEARCH_BAR_LETTER"
    | "CUT_SEARCH_BAR_LETTER";
}

export interface State {
  randomWikiTitle: string;
  searchedWikiTitle: string;
  searchBarValue: string;
  wantedPageTitle: string;
  currentWikiPage: null | Page;
}

function reducer(
  state = {
    randomWikiTitle: "",
    currentWikiPage: null,
    wantedPageTitle: "",
    searchedWikiTitle: "",
    searchBarValue: "",
  },
  action: ReduxAction
) {
  switch (action.type) {
    case "SET_RANDOM_WIKI_TITLE":
      return { ...state, randomWikiTitle: action.randomWikiTitle };
    case "SET_WANTED_WIKI_TITLE":
      return { ...state, wantedPageTitle: action.wantedPageTitle };
    case "SET_CURRENT_WIKI_PAGE":
      return { ...state, currentWikiPage: action.currentWikiPage };
    case "SET_SEARCHED_WIKI_TITLE":
      return { ...state, searchedWikiTitle: action.searchedWikiTitle };
    case "SET_SEARCH_BAR_LETTER":
      return {
        ...state,
        searchBarValue: `${state.searchBarValue}${action.letter}`,
      };
    case "CUT_SEARCH_BAR_LETTER":
      return {
        ...state,
        searchBarValue: `${dropRight(state.searchBarValue.split("")).join("")}`,
      };
    default:
      return state;
  }
}
// @ts-ignore
export const store = createStore(reducer, applyMiddleware(logger));

export default store;
