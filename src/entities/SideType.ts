const SideType = {
  DOOR: "door",
  EMPTY: "empty",
  SECRET_DOOR: "secret-door",
  STAIRS_DOWN: "stairs-down",
  STAIRS_UP: "stairs-up",
  UNKNOWN: "unknown",
  WALL: "wall",
};

const colors = {
  [SideType.DOOR]: "brown",
  [SideType.EMPTY]: "white",
  [SideType.SECRET_DOOR]: "purple",
  [SideType.STAIRS_DOWN]: "red",
  [SideType.STAIRS_UP]: "green",
  [SideType.UNKNOWN]: "white",
  [SideType.WALL]: "black",
};

export const sideFromCode = [
  SideType.EMPTY,
  SideType.WALL,
  SideType.DOOR,
  SideType.SECRET_DOOR,
];

export const colorOfSide = (sideType: string) => colors[sideType] ?? "orange";

export default SideType;
