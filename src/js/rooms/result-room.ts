import { createWalls } from "../walls";

export const createResultRoom = (sceneEl: Element | null) => {
  if (!sceneEl) {
    return;
  }
  createWalls(sceneEl, {
    wallLength: 20,
    startPosition: "0 0 -20",
    idPrefix: "result",
  });
};
