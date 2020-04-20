import "./styles/index.scss";
import { composeRoom } from "./js/rooms/first-room";
import { createWalls } from "./js/walls";

AFRAME.registerComponent("compose-first-room", {
  init: function () {
    const sceneEl = this.el;

    // This will be called after the entity has properly attached and loaded.
    composeRoom(sceneEl);
  },
});
