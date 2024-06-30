import MazeSquare from "./MazeSquare";
import { colorOfSide } from "./SideType";
import { gridSize } from "./constants";
import CSS from "csstype";

const Cell = ({ square }: { square: MazeSquare }) => {
  if (square.content !== undefined) console.log(square);
  const { x, y } = square.coordinate;
  const cellSize = 40;
  const insetSize = 4;

  const southY = gridSize - y;
  const northY = southY - 1;
  const westX = x;
  const eastX = x + 1;

  const horizontalOffset = 40;
  const verticalOffset = 40;

  const southDisplay = southY * cellSize + verticalOffset;
  const northDisplay = northY * cellSize + verticalOffset;
  const westDisplay = westX * cellSize + horizontalOffset;
  const eastDisplay = eastX * cellSize + horizontalOffset;

  const innerSize = cellSize - 2 * insetSize;

  const northPath = `M ${westDisplay} ${northDisplay} h ${cellSize} l -${insetSize} +${insetSize} h -${innerSize}`;
  const northColor = colorOfSide(square.sides[0]);

  const eastPath = `M ${eastDisplay} ${northDisplay} v ${cellSize} l -${insetSize} -${insetSize} v -${innerSize}`;
  const eastColor = colorOfSide(square.sides[1]);

  const southPath = `M ${westDisplay} ${southDisplay} h ${cellSize} l -${insetSize} -${insetSize} h -${innerSize}`;
  const southColor = colorOfSide(square.sides[2]);

  const westPath = `M ${westDisplay} ${northDisplay} v ${cellSize} l ${insetSize} -${insetSize} v -${innerSize}`;
  const westColor = colorOfSide(square.sides[3]);

  const innerColor =
    square.content === undefined
      ? "gray"
      : square.content == ""
      ? "white"
      : "orange";
  if (square.content !== undefined) {
    //debugger;
  }

  const questionMarkStyle: CSS.Properties = {
    dominantBaseline: "middle",
    textAnchor: "middle",
    fill: "black",
    font: "20px serif",
  };

  const QuestionMark = () => {
    return (
      <text
        x={(eastDisplay + westDisplay) / 2}
        y={(northDisplay + southDisplay) / 2}
        style={questionMarkStyle}
      >
        ?
      </text>
    );
  };

  return (
    <>
      {square.content === undefined ? (
        <QuestionMark />
      ) : (
        <g>
          <path d={northPath} fill={northColor} />
          <path d={eastPath} fill={eastColor} />
          <path d={southPath} fill={southColor} />
          <path d={westPath} fill={westColor} />
          <rect
            x={westDisplay + insetSize}
            y={northDisplay + insetSize}
            width={innerSize}
            height={innerSize}
            fill={innerColor}
          />
        </g>
      )}
    </>
  );
};

export default Cell;
