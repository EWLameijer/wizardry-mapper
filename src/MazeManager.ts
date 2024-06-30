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
    console.log(this.#currentSquare);
  }

  start(x: number, y: number, description: string) {
    const startSquare = MazeSquare.from(x, y, description);
    this.#updateCurrentSquare(startSquare);
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

  east(description: string) {
    return this.#moveAndBuild(description, 1, 0);
  }

  north(description: string) {
    return this.#moveAndBuild(description, 0, 1);
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

  west(description: string) {
    return this.#moveAndBuild(description, -1, 0);
  }

  south(description: string) {
    return this.#moveAndBuild(description, 0, -1);
  }

  #moveAndBuild(description: string, dx: number, dy: number) {
    const { x, y } = this.#currentSquare.coordinate;
    const newSquare = MazeSquare.from(x + dx, y + dy, description);
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
