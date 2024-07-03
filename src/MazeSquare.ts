import GridCoordinate from "./GridCoordinate";
import SideType, { sideFromCode } from "./SideType";

class MazeSquare {
  constructor(
    public coordinate: GridCoordinate,
    public sides: string[] = Array(4).fill(SideType.UNKNOWN),
    public content: string | undefined = undefined
  ) {}

  static fromInternal(
    x: number,
    y: number,
    westNorthCodeAsString: string,
    eastSouthCodeAsString: string,
    squareContents: string,
    specialDirection: string,
    directionDescription: string
  ) {
    const westNorthCode = parseInt(westNorthCodeAsString, 16);
    const westCode = westNorthCode % 4;
    const northCode = Math.floor(westNorthCode / 4);

    const eastSouthCode = parseInt(eastSouthCodeAsString, 16);
    const eastCode = eastSouthCode % 4;
    const southCode = Math.floor(eastSouthCode / 4);

    const sides = [northCode, eastCode, southCode, westCode].map(
      (code) => sideFromCode[code]
    );
    const contents = squareContents ?? "";

    if (specialDirection) {
      const sideIndex =
        specialDirection == "n"
          ? 0
          : specialDirection == "e"
          ? 1
          : specialDirection == "s"
          ? 2
          : 3;
      sides[sideIndex] = directionDescription;
    }
    return new MazeSquare(new GridCoordinate(x, y), sides, contents);
  }

  static from(x: number, y: number, squareDescription: string) {
    // [0-F][0-F]
    // [0-F][0-F]:silver key;/n=bear door/
    // later: H =, V=||
    if ([...squareDescription].filter((ch) => ch === "/").length % 2 !== 0)
      throw Error("no even number of /");
    if (squareDescription.includes(":") && !squareDescription.includes(";"))
      throw Error(": without ;");
    const matcher =
      /([0-9A-F])([0-9A-F])(?::([a-z ]+);)?(?:\/([nesw])=([a-z -]+)\/)?/;
    // "11:silver key;/n=bear door/".match(matcher)
    const [
      westNorthCodeAsString,
      eastSouthCodeAsString,
      squareContents,
      specialDirection,
      directionDescription,
    ] = squareDescription.match(matcher)!.slice(1);

    const westNorthCode = parseInt(westNorthCodeAsString, 16);
    const westCode = westNorthCode % 4;
    const northCode = Math.floor(westNorthCode / 4);

    const eastSouthCode = parseInt(eastSouthCodeAsString, 16);
    const eastCode = eastSouthCode % 4;
    const southCode = Math.floor(eastSouthCode / 4);

    const sides = [northCode, eastCode, southCode, westCode].map(
      (code) => sideFromCode[code]
    );
    const contents = squareContents ?? "";

    if (specialDirection) {
      const sideIndex =
        specialDirection == "n"
          ? 0
          : specialDirection == "e"
          ? 1
          : specialDirection == "s"
          ? 2
          : 3;
      sides[sideIndex] = directionDescription;
    }
    return new MazeSquare(new GridCoordinate(x, y), sides, contents);
  }

  east(description: string) {
    return MazeSquare.from(
      this.coordinate.x + 1,
      this.coordinate.y,
      description
    );
  }

  north(description: string) {
    return MazeSquare.from(
      this.coordinate.x,
      this.coordinate.y + 1,
      description
    );
  }
}

export default MazeSquare;
