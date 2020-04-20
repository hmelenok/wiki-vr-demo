import { getRandomPage } from "../api/wiki";
import { createWalls } from "../walls";
import { moveToSecondRoom } from "../waypoints";
import { createResultRoom } from "./result-room";
import { Store } from "redux";
export const createSky = (sceneEl: Element) => {
  if (!sceneEl) {
    return;
  }
  const entityEl = document.createElement("a-sky");
  entityEl.setAttribute("src", "assets/sky/industrial_sunset_2k.jpg");
  sceneEl.appendChild(entityEl);
};
export const createPavement = (sceneEl: Element) => {
  const pavement: { [key: string]: string } = {
    id: "floorPavement",
    src: "assets/plane/red-pavement.jpg",
    position: "0 0 0",
    rotation: "-90 0 0",
    height: "100",
    repeat: "100 100",
    width: "100",
    "normal-map": "assets/plane/red-pavement-map.jpg",
  };

  const entityEl = document.createElement("a-plane");
  Object.keys(pavement).forEach((attr: string) => {
    entityEl.setAttribute(attr, pavement[attr]);
  });
  sceneEl.appendChild(entityEl);
};

export const createRandomDoor = (sceneEl: Element, store: Store) => {
  AFRAME.registerComponent("get-random-page", {
    init: async function () {
      store.subscribe(() => {
        const { randomWikiTitle } = store.getState();
        this.el.setAttribute("text", { value: randomWikiTitle });
      });
      const getRandomTitle = async () => {
        const [randomTitle] = await getRandomPage();
        store.dispatch({
          type: "SET_RANDOM_WIKI_TITLE",
          randomWikiTitle: randomTitle,
        });
      };

      await getRandomTitle();

      this.el.addEventListener("click", () => getRandomTitle());
    },
    update: async function () {},
  });

  AFRAME.registerComponent("door-action", {
    init: async function () {
      this.el.addEventListener("click", () => {
        moveToSecondRoom();
        createResultRoom(sceneEl);
      });
      console.log(this.el, "door");
    },
  });
  const randomEntites: {
    [key: string]: string;
  }[] = [
    {
      id: "door",
      "door-action": "",
      "gltf-model": "#door",
      position: "-4.7 0 -4.4",
      scale: "0.01 0.01 0.01",
    },
    {
      id: "randomText",
      position: "-3 3 -5",
      geometry: "primitive: plane; width: auto; height: auto",
      text: "value: Random page;color: #000;width: 7;align: center;",
      material: "visible: false",
    },
    {
      id: "randomPageTitle",
      "get-random-page": "",
      position: "-3 2.55 -4.99",
      geometry: "primitive: plane; width: 3; height: 0.4",
      text: "value: ;color: #000;align: center",
      material: "visible: true",
    },
  ];

  randomEntites.forEach((entity) => {
    const entityEl = document.createElement("a-entity");
    Object.keys(entity).forEach((attr: string) => {
      entityEl.setAttribute(attr, entity[attr]);
    });
    sceneEl.appendChild(entityEl);
  });
};

export const createWikiSign = (sceneEl: Element) => {
  const wikiSignParts: {
    [key: string]: string;
  }[] = [
    {
      id: "wikipedia",
      geometry: "primitive: plane; width: auto; height: auto",
      text: "value: Wikipedia;color: #000;width: 11;align: center;",
      material: "visible: false",
      position: "0 2.75 -5",
    },
    {
      id: "vrDemoSign",
      geometry: "primitive: plane; width: auto; height: auto",
      text: "value: (vr demo);color: #000;width: 5;align: center;",
      material: "visible: false",
      position: "0 2.3 -5",
    },
  ];

  wikiSignParts.forEach((sign) => {
    const entityEl = document.createElement("a-entity");
    Object.keys(sign).forEach((attr: string) => {
      entityEl.setAttribute(attr, sign[attr]);
    });
    sceneEl.appendChild(entityEl);
  });
};

export const composeRoom = (sceneEl: Element | null, store: Store) => {
  if (!sceneEl) {
    return;
  }
  createSky(sceneEl);
  createPavement(sceneEl);
  createWalls(sceneEl, { wallLength: 10, idPrefix: "first" });
  createWikiSign(sceneEl);
  createRandomDoor(sceneEl, store);
};
