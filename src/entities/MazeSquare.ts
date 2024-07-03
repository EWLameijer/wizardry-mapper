import CellData from "./CellData";
import GridCoordinate from "./GridCoordinate";
import SideType, { sideFromCode } from "./SideType";

class MazeSquare {
  constructor(
    public coordinate: GridCoordinate,
    public sides: string[] = Array(4).fill(SideType.UNKNOWN),
    public content: string | undefined = undefined,
    public label: string | undefined = undefined
  ) {}

  static from(cellData: CellData) {
    const westNorthCode = cellData.westNorthCode;
    const westCode = westNorthCode % 4;
    const northCode = Math.floor(westNorthCode / 4);

    const eastSouthCode = cellData.eastSouthCode;
    const eastCode = eastSouthCode % 4;
    const southCode = Math.floor(eastSouthCode / 4);

    const sides = [northCode, eastCode, southCode, westCode].map(
      (code) => sideFromCode[code]
    );
    const contents = cellData.contents ?? "";

    if (cellData.specialSide) {
      const { direction, description } = cellData.specialSide;
      const sideIndex = "nesw".indexOf(direction)!;
      sides[sideIndex] = description;
    }
    return new MazeSquare(cellData.location, sides, contents, cellData.label);
  }
}

export default MazeSquare;
