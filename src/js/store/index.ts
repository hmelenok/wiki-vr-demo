import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Page } from "wikijs";

export interface ReduxAction {
  [key: string]: string | number;
  type: "SET_RANDOM_WIKI_TITLE";
}

export interface State {
  randomWikiTitle: string;
  currentWikiPage: null | Page;
}

function reducer(
  state = { randomWikiTitle: "", currentWikiPage: null },
  action: ReduxAction
) {
  switch (action.type) {
    case "SET_RANDOM_WIKI_TITLE":
      return { ...state, randomWikiTitle: action.randomWikiTitle };
    default:
      return state;
  }
}
// @ts-ignore
export const store = createStore(reducer, applyMiddleware(logger));

export default store;
