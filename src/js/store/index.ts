import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Page } from "wikijs";

export interface ReduxAction {
  [key: string]: string | number;
  type:
    | "SET_RANDOM_WIKI_TITLE"
    | "SET_WANTED_WIKI_TITLE"
    | "SET_CURRENT_WIKI_PAGE";
}

export interface State {
  randomWikiTitle: string;
  wantedPageTitle: string;
  currentWikiPage: null | Page;
}

function reducer(
  state = { randomWikiTitle: "", currentWikiPage: null, wantedPageTitle: "" },
  action: ReduxAction
) {
  switch (action.type) {
    case "SET_RANDOM_WIKI_TITLE":
      return { ...state, randomWikiTitle: action.randomWikiTitle };
    case "SET_WANTED_WIKI_TITLE":
      return { ...state, wantedPageTitle: action.wantedPageTitle };
    case "SET_CURRENT_WIKI_PAGE":
      return { ...state, currentWikiPage: action.currentWikiPage };
    default:
      return state;
  }
}
// @ts-ignore
export const store = createStore(reducer, applyMiddleware(logger));

export default store;
