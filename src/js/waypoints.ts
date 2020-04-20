import { MAIN_CAMERA_SELECTOR } from "./constants";

export const moveToSecondRoom = () => {
  var cameraEl = document.querySelector(MAIN_CAMERA_SELECTOR);
  cameraEl.setAttribute("position", "0 1.6 -12");
};

export const moveToFirstRoom = () => {
  var cameraEl = document.querySelector(MAIN_CAMERA_SELECTOR);
  cameraEl.setAttribute("position", "0 1.6 0");
};
