import CellData from "./CellData";
import GridCoordinate from "./GridCoordinate";
import MazeSquare from "./MazeSquare";
import { gridSize } from "./constants";

class MazeManager {
  allCells: MazeSquare[] = [];
  #currentSquare: MazeSquare;

  constructor() {
    const indices = [...Array(gridSize)].map((_, index) => index);
    this.allCells = indices.flatMap((x) =>
      indices.map((y) => new MazeSquare(new GridCoordinate(x, y)))
    );
    this.#currentSquare = this.allCells.find(
      (cell) => cell.coordinate.x == 0 && cell.coordinate.y == 0
    )!;
    //console.log("cs", this.#currentSquare);
  }

  build(descriptions: string) {
    const matcher =
      /([nesw]|\[[0-9]+E[0-9]+N\]|\[>[A-Z_]+\])([0-9A-F])?([0-9A-F])?(?::([a-z ]+);)?(?:\/([nesw])=([a-z -]+)\/)?(?:\{#([A-Z_]+)\})?/g;
    const newCells = descriptions.matchAll(matcher);
    const allCells = [...newCells];
    const directions = [
      { key: "n", direction: { dx: 0, dy: 1 } },
      { key: "s", direction: { dx: 0, dy: -1 } },
      { key: "e", direction: { dx: 1, dy: 0 } },
      { key: "w", direction: { dx: -1, dy: 0 } },
    ];
    allCells.forEach((matches) => {
      //console.log("cs", this.#currentSquare);
      const { x, y } = this.#currentSquare.coordinate;
      let desiredLocation: GridCoordinate;
      const locationIndicator = matches[1];
      if (locationIndicator.length === 1) {
        const direction = directions.find(
          (d) => d.key == matches[1]
        )!.direction;
        desiredLocation = new GridCoordinate(
          x + direction.dx,
          y + direction.dy
        );
      } else if (locationIndicator[1] === ">") {
        const targetLabel = locationIndicator.slice(2, -1);
        //console.log("move to", locationIndicator.slice(2, -1));
        desiredLocation = this.allCells.find(
          (cell) => cell.label === targetLabel
        )!.coordinate;
      } else {
        //console.log(locationIndicator.match(/\[([0-9]+)E([0-9]+)N\]/));
        const [newX, newY] = locationIndicator
          .match(/\[([0-9]+)E([0-9]+)N\]/)!
          .slice(1);
        desiredLocation = new GridCoordinate(parseInt(newX), parseInt(newY));
      }
      //console.log("desired location", desiredLocation);
      if (matches[7]) console.log("label found:", matches[7]);
      if (!matches[2]) {
        // just move to other location
        this.moveTo(desiredLocation);
        return;
      }

      const specialSide = matches[5]
        ? { direction: matches[5], description: matches[6] }
        : undefined;
      const matchData = {
        location: desiredLocation,
        westNorthCode: parseInt(matches[2], 16),
        eastSouthCode: parseInt(matches[3], 16),
        contents: matches[4],
        specialSide,
        label: matches[7],
      };

      this.#moveAndBuild(matchData);
    });
    return this;
  }

  cellCoordinates() {
    return this.#currentSquare.coordinate;
  }

  moveTo(coordinates: GridCoordinate) {
    this.#currentSquare = this.allCells.find(
      (cell) =>
        cell.coordinate.x == coordinates.x && cell.coordinate.y == coordinates.y
    )!;
    return this;
  }

  #updateCurrentSquare(newSquare: MazeSquare) {
    this.#replaceCell(newSquare);
    this.#currentSquare = newSquare;
  }

  #moveAndBuild(cellData: CellData) {
    const newSquare = MazeSquare.from(cellData);
    this.#updateCurrentSquare(newSquare);
    return this;
  }

  #replaceCell(square: MazeSquare) {
    this.allCells = [
      ...this.allCells.filter(
        (cell) =>
          cell.coordinate.x !== square.coordinate.x ||
          cell.coordinate.y !== square.coordinate.y
      ),
      square,
    ];
  }
}

export default MazeManager;
