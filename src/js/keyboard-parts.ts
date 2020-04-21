import { moveToSecondRoom } from "./waypoints";
import { createResultRoom } from "./rooms/result-room";
import { Store } from "redux";
import { searchByTitle } from "./api/wiki";

export const FIRST_ROW = "qwertyuiop";
export const SECOND_ROW = "asdfghjkl";
export const THIRD_ROW = "zxcvbnm";
export const NUMBERS_ROW = "1234567890";
export const SYMBOLS_ROW = '-/:;()$&@"';
export const SYMBOLS_SECOND_ROW = ".,?!'";

export default [FIRST_ROW, SECOND_ROW, THIRD_ROW];

export const createKeyboard = (sceneEl: Element, store: Store) => {
  AFRAME.registerComponent("hit-key", {
    init: async function () {
      this.el.addEventListener("click", () => {
        store.dispatch({
          type: "SET_SEARCH_BAR_LETTER",
          letter: this.data,
        });
      });
    },
  });
  AFRAME.registerComponent("hit-space", {
    init: async function () {
      this.el.addEventListener("click", () => {
        store.dispatch({
          type: "SET_SEARCH_BAR_LETTER",
          letter: " ",
        });
      });
    },
  });
  AFRAME.registerComponent("hit-backspace", {
    init: async function () {
      this.el.addEventListener("click", () => {
        store.dispatch({
          type: "CUT_SEARCH_BAR_LETTER",
          letter: " ",
        });
      });
    },
  });

  AFRAME.registerComponent("hit-search", {
    init: async function () {
      this.el.addEventListener("click", async () => {
        const { searchBarValue } = store.getState();
        const searchedTitle = await searchByTitle(searchBarValue);

        store.dispatch({
          type: "SET_SEARCHED_WIKI_TITLE",
          searchedWikiTitle: searchedTitle,
        });
      });
    },
  });

  AFRAME.registerComponent("watch-search-bar", {
    init: function () {
      store.subscribe(() => {
        this.el.setAttribute(
          "text",
          `value: ${
            store.getState().searchBarValue
          };color: #000;align: center;width: 3; height: 0.4`
        );
      });
    },
  });

  const firstRow: { [key: string]: string }[] = FIRST_ROW.split("").map(
    (letterName: string, index) => ({
      id: "key",
      "hit-key": letterName,
      position: `${-1.4 + index / 3} 1.7 -4.99`,
      geometry: "primitive: plane;width: 0.25;height: 0.25;",
      text: `value: ${letterName};color: #000;align: center;width: 3; height: 0.4`,
      material: "visible: true",
    })
  );
  const secondRow: { [key: string]: string }[] = SECOND_ROW.split("").map(
    (letterName: string, index) => ({
      id: "key",
      "hit-key": letterName,
      position: `${-1.25 + index / 3} 1.4 -4.99`,
      geometry: "primitive: plane;width: 0.25;height: 0.25;",
      text: `value: ${letterName};color: #000;align: center;width: 3; height: 0.4`,
      material: "visible: true",
    })
  );

  const thirdRow: { [key: string]: string }[] = THIRD_ROW.split("").map(
    (letterName: string, index) => ({
      id: "key",
      "hit-key": letterName,
      position: `${-0.95 + index / 3} 1.1 -4.99`,
      geometry: "primitive: plane;width: 0.25;height: 0.25;",
      text: `value: ${letterName};color: #000;align: center;width: 3; height: 0.4`,
      material: "visible: true",
    })
  );

  [...firstRow, ...secondRow, ...thirdRow].forEach((entity) => {
    const entityEl = document.createElement("a-plane");
    Object.keys(entity).forEach((attr: string) => {
      entityEl.setAttribute(attr, entity[attr]);
    });
    sceneEl.appendChild(entityEl);
  });

  const searchbar: { [key: string]: string } = {
    id: "searchbar",
    "watch-search-bar": "",
    geometry: "primitive: plane;width: 2;height: 0.25;",
    position: `0 2.1 -4.99`,
  };
  const entityEl = document.createElement("a-plane");
  Object.keys(searchbar).forEach((attr: string) => {
    entityEl.setAttribute(attr, searchbar[attr]);
  });
  sceneEl.appendChild(entityEl);

  const spacebar: { [key: string]: string } = {
    id: "spacebar",
    "hit-space": "",
    geometry: "primitive: plane;width: 2;height: 0.25;",
    position: `0 0.8 -4.99`,
  };
  const spaceEl = document.createElement("a-plane");
  Object.keys(spacebar).forEach((attr: string) => {
    spaceEl.setAttribute(attr, spacebar[attr]);
  });
  sceneEl.appendChild(spaceEl);

  const backspace: { [key: string]: string } = {
    id: "backspace",
    "hit-backspace": "",
    geometry: "primitive: plane;width: 0.25;height: 0.25;",
    text: "value: <=;color: #000;align: center;width: 3; height: 0.4",
    position: `1.4 1.1 -4.99`,
  };
  const backspaceEl = document.createElement("a-plane");
  Object.keys(backspace).forEach((attr: string) => {
    backspaceEl.setAttribute(attr, backspace[attr]);
  });
  sceneEl.appendChild(backspaceEl);

  const search: { [key: string]: string } = {
    id: "saerch-button",
    "hit-search": "",
    geometry: "primitive: plane;width: 0.5;height: 0.25;",
    text: "value: search;color: white;align: center;width: 3; height: 0.4",
    material: "color: blue;",
    position: `1.4 0.8 -4.99`,
  };
  const searchEl = document.createElement("a-plane");
  Object.keys(search).forEach((attr: string) => {
    searchEl.setAttribute(attr, search[attr]);
  });
  sceneEl.appendChild(searchEl);
};
