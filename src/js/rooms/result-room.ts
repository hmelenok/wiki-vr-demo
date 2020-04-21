import { createWalls } from "../walls";
import { Store } from "redux";
import { searchByText } from "../api/wiki";
import { Page } from "wikijs";
import { split, join } from "lodash";
export const createResultRoom = (sceneEl: Element | null, store: Store) => {
  const { wantedPageTitle } = store.getState();
  if (!sceneEl || !wantedPageTitle) {
    console.warn("No wiki target");
    return;
  }
  createWalls(sceneEl, {
    wallLength: 20,
    startPosition: "0 0 -20",
    idPrefix: "result",
    wallColor: "#43adff",
  });

  placeContent(sceneEl, wantedPageTitle, store);
};

export const searchWantedPage = async (title: string, store: Store) => {
  const currentWikiPage = await searchByText(title);

  store.dispatch({ type: "SET_CURRENT_WIKI_PAGE", currentWikiPage });
};

export const placeContent = (sceneEl: Element, title: string, store: Store) => {
  AFRAME.registerComponent("run-search", {
    init: function () {
      searchWantedPage(title, store);
      store.subscribe(() => {
        const { currentWikiPage } = store.getState();

        if (currentWikiPage) {
          placeSections(sceneEl, currentWikiPage);
          placeImages(sceneEl, currentWikiPage);
        }
      });
    },
  });

  const titleSign: {
    [key: string]: string;
  }[] = [
    {
      "run-search": "",
      id: "wikiPageTitle",
      geometry: "primitive: plane; width: auto; height: auto",
      text: `value: ${title};color: #000;width: 3;align: left;`,
      material: "color: white; visible: false;",
      position: "-9.94697 2.75 -12.50",
      rotation: "0 90 0",
    },
  ];
  titleSign.forEach((sign) => {
    const entityEl = document.createElement("a-entity");
    Object.keys(sign).forEach((attr: string) => {
      entityEl.setAttribute(attr, sign[attr]);
    });
    sceneEl.appendChild(entityEl);
  });
};

export const placeSections = async (sceneEl: Element, wikiPage: Page) => {
  // @ts-ignore
  const sections = await wikiPage.sections();
  const titles = sections.map((section: any) => section.title);
  const contents = sections.map(
    (section: any) =>
      `${section.content + "\n"}${
        section.items?.map(
          (item: { title: string; content: string }) =>
            `${item.title + "\n"}${item.content}`
        ) || ""
      }`
  );

  const sectionsTitles: {
    [key: string]: string;
  }[] = titles.map((section: string, index: number) => ({
    id: `wikiPageSectionTitle-${index}`,
    geometry: "primitive: plane; width: 2.5; height: 0.5",
    text: `value: ${join(
      split(section, ";"),
      ""
    )};color: #000;align: left; width: 2;baseline: top;`,
    material: "color: pink;visible: false;",
    position: `-9.94697 2.5 ${-12.0 - 2 * index}`,
    rotation: "0 90 0",
  }));

  const sectionsContents: {
    [key: string]: string;
  }[] = contents.map((section: string, index: number) => ({
    id: `wikiPageSectionContent-${index}`,
    geometry: "primitive: plane; width: 2.5; height: auto",
    text: `value: ${join(
      split(section, ";"),
      ""
    )};color: #000;align: left; width: 1.5;baseline: top;`,
    material: `color: white; visible: false;`,
    position: `-9.94697 2.3 ${-12.3 - 2 * index + 0.5}`,
    rotation: "0 90 0",
  }));

  [...sectionsTitles, ...sectionsContents].forEach((section: any) => {
    const entityEl = document.createElement("a-entity");
    Object.keys(section).forEach((attr: string) => {
      entityEl.setAttribute(attr, section[attr]);
    });
    sceneEl.appendChild(entityEl);
  });
};

export const placeImages = async (sceneEl: Element, wikiPage: Page) => {
  let images = await wikiPage.rawImages();

  images = images.filter((image) => image.imagerepository !== "local");

  const imageObjects: {
    [key: string]: string;
  }[] = images.map((image, index: number) => ({
    id: `wikiImage-${index}`,
    // @ts-ignore
    src: image.imageinfo[0]?.url || "",
    position: `${-8.94697 + 2 * index} 1.6 -10.01`,
    rotation: "0 180 0",
  }));

  const imageTitleObjects: {
    [key: string]: string;
  }[] = images.map((image, index: number) => ({
    id: `wikiImageTitle-${index}`,
    // @ts-ignore
    geometry: "primitive: plane; width: 2.5; height: auto",
    text: `value: ${join(
      split(image.title, ";"),
      ""
    )};color: #000;align: left; width: 1.5;baseline: top;`,
    material: `color: white; visible: false;`,
    position: `${-9.1 + 2 * index} 1 -10.01`,
    rotation: "0 180 0",
  }));

  imageObjects.forEach((section: any) => {
    const entityEl = document.createElement("a-image");
    Object.keys(section).forEach((attr: string) => {
      entityEl.setAttribute(attr, section[attr]);
    });
    sceneEl.appendChild(entityEl);
  });

  imageTitleObjects.forEach((section: any) => {
    const entityEl = document.createElement("a-entity");
    Object.keys(section).forEach((attr: string) => {
      entityEl.setAttribute(attr, section[attr]);
    });
    sceneEl.appendChild(entityEl);
  });

};
