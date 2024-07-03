import MazeManager from "./MazeManager";
import SideType from "./SideType";

const maze = new MazeManager();
const start = maze.start(0, 0, `10/s=${SideType.STAIRS_UP}/`).cellCoordinates();
maze.build("e44e44e44e44e44e44e84e45n05n41w40w50s14e08");
const secondSplit = maze
  .moveTo(start)
  .build("n11n11n11n11n11n11n11n50e44e44e40")
  .cellCoordinates();
maze.build("s11s11s11s19s80e41s05w04w14n50");
const thirdSplit = maze
  .moveTo(secondSplit)
  .build("e44e44e40")
  .cellCoordinates();
maze.build("s19s80e41s05w04w14n50");
const beforeEast = maze
  .moveTo(thirdSplit)
  .build("e44e46e25n10e04")
  .cellCoordinates();
const bigUp = maze.build("e84").cellCoordinates();
maze
  .build("n19n11n11n11n11n11n11n11n11n52e6Cs95")
  .moveNorth()
  .build("e4Es95:silver key;")
  .moveNorth()
  .build("e64e46e40e41s05w14");
const secondUp = maze.moveTo(bigUp).build("e44e84").cellCoordinates();
maze
  .build("n19n11n11n11n11n11n11n52e64eC6n49w54")
  .moveEast()
  .moveSouth()
  .build("e64e46e04e05nC1wD0n5De5D");
const thirdUp = maze.moveTo(secondUp).build("e44e84").cellCoordinates();
maze.build("n19n11n11n11n11n52e64n54e49s86e2Cs95e95n0Dn41w50");
const fourthUp = maze.moveTo(thirdUp).build("e44e84").cellCoordinates();
maze.build("n19n11w15n91n58e42e60e41s0Ds95w95n1Cw11");
maze.moveTo(fourthUp).build("e44e47");
const northWest = maze
  .moveTo(beforeEast)
  .build("n01n01n41w10s10s00w44w44w44w84")
  .cellCoordinates();
maze
  .build("n19e14e05n41w60w22n51")
  .moveSouth()
  .build("w42s05w14w05w04w14n50e80e41e10n01w44w58n04w14n10e00n40w50");

export default maze;
