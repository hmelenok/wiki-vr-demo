export interface WallsOptions {
  wallColor?: string;
  startPosition?: string;
  level?: number;
  wallLength?: number;
  idPrefix: string;
}

export const createWalls = (sceneEl: Element, options?: WallsOptions) => {
  const WALL_COLOR = options?.wallColor || "#adadad";
  const WALL_HEIGHT = 3.75;
  const WALL_WIDTH = options?.wallLength || 10;
  const LEVEL = options?.level || 1.5;
  const START_POSITION = options?.startPosition || "0 0 0";
  const idPrefix = options?.idPrefix || "";
  const getOffsetCoords = (offset: number[], start: string): string =>
    start
      .split(" ")
      .map(
        (startPosition: string, index) =>
          parseFloat(startPosition) + offset[index]
      )
      .join(" ");

  const backOffset = [0, LEVEL, (WALL_WIDTH / 2) * -1];
  const frontOffset = [0, LEVEL, WALL_WIDTH / 2];
  const leftOffset = [(WALL_WIDTH / 2) * -1, LEVEL, 0];
  const rightOffset = [WALL_WIDTH / 2, LEVEL, 0];
  const walls: {
    [key: string]: string | number;
  }[] = [
    {
      id: `backWall${idPrefix ? `-${idPrefix}` : ""}`,
      position: getOffsetCoords(backOffset, START_POSITION),
      color: WALL_COLOR,
      height: WALL_HEIGHT,
      width: WALL_WIDTH,
    },
    {
      id: `frontWall${idPrefix ? `-${idPrefix}` : ""}`,
      position: getOffsetCoords(frontOffset, START_POSITION),
      color: WALL_COLOR,
      height: WALL_HEIGHT,
      width: WALL_WIDTH,
      rotation: "0 180 0",
    },
    {
      id: `leftWall${idPrefix ? `-${idPrefix}` : ""}`,
      position: getOffsetCoords(leftOffset, START_POSITION),
      color: WALL_COLOR,
      height: WALL_HEIGHT,
      width: WALL_WIDTH,
      rotation: "0 90 0",
    },
    {
      id: `rightWall${idPrefix ? `-${idPrefix}` : ""}`,
      position: getOffsetCoords(rightOffset, START_POSITION),
      color: WALL_COLOR,
      height: WALL_HEIGHT,
      width: WALL_WIDTH,
      rotation: "0 -90 0",
    },
  ];

  walls.forEach((wall) => {
    const entityEl = document.createElement("a-plane");
    Object.keys(wall).forEach((attr: string) => {
      entityEl.setAttribute(attr, wall[attr]);
    });
    sceneEl.appendChild(entityEl);
  });
};
