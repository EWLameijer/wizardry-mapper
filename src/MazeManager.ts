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
  }

  start(x: number, y: number, description: string) {
    const startSquare = MazeSquare.from(x, y, description);
    this.#updateCurrentSquare(startSquare);
    return this;
  }

  build(descriptions: string) {
    const matcher =
      /([nesw])([0-9A-F])([0-9A-F])(?::([a-z ]+);)?(?:\/([nesw])=([a-z -]+)\/)?/g;
    const newCells = descriptions.matchAll(matcher);
    const allCells = [...newCells];
    const directions = [
      { key: "n", dx: 0, dy: 1 },
      { key: "s", dx: 0, dy: -1 },
      { key: "e", dx: 1, dy: 0 },
      { key: "w", dx: -1, dy: 0 },
    ];
    allCells.forEach((matchArray) => {
      const [directionStart, wn, es, contents, sideDirection, sideDescription] =
        matchArray.slice(1);
      const method = directions.find(
        (direction) => direction.key === directionStart
      )!;
      this.#moveAndBuildInternal(
        wn,
        es,
        contents,
        sideDirection,
        sideDescription,
        method.dx,
        method.dy
      );
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

  moveNorth() {
    return this.#justMove(0, 1);
  }

  moveEast() {
    return this.#justMove(1, 0);
  }

  moveSouth() {
    return this.#justMove(0, -1);
  }

  #justMove(dx: number, dy: number) {
    const { x, y } = this.#currentSquare.coordinate;
    this.#currentSquare = this.allCells.find(
      (cell) => cell.coordinate.x === x + dx && cell.coordinate.y === y + dy
    )!;
    return this;
  }

  #moveAndBuildInternal(
    wn: string,
    es: string,
    contents: string,
    wallDirection: string,
    walls: string,
    dx: number,
    dy: number
  ) {
    const { x, y } = this.#currentSquare.coordinate;
    const newSquare = MazeSquare.fromInternal(
      x + dx,
      y + dy,
      wn,
      es,
      contents,
      wallDirection,
      walls
    );
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
