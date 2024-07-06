import MazeSquare from "./entities/MazeSquare";
import { colorOfSide } from "./entities/SideType";
import { gridSize } from "./entities/constants";
import CSS from "csstype";

const Cell = ({ square }: { square: MazeSquare }) => {
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

  const paths = [
    `M ${westDisplay} ${northDisplay} h ${cellSize} l -${insetSize} +${insetSize} h -${innerSize}`,
    `M ${eastDisplay} ${northDisplay} v ${cellSize} l -${insetSize} -${insetSize} v -${innerSize}`,
    `M ${westDisplay} ${southDisplay} h ${cellSize} l -${insetSize} -${insetSize} h -${innerSize}`,
    `M ${westDisplay} ${northDisplay} v ${cellSize} l ${insetSize} -${insetSize} v -${innerSize}`,
  ];

  const colors = square.sides.map(colorOfSide);

  const sides = paths.map((path, index) => ({ path, color: colors[index] }));

  const innerColor =
    square.content == "d" ? "lightgrey" : square.content ? "orange" : "white";

  const coordinateStyle: CSS.Properties = {
    dominantBaseline: "middle",
    textAnchor: "middle",
    fill: "black",
    font: "12px serif",
  };

  const Coordinates = () => {
    const xCenter = (eastDisplay + westDisplay) / 2;
    const yCenter = (northDisplay + southDisplay) / 2;
    const yOffset = 6;
    return (
      <g>
        <text x={xCenter} y={yCenter - yOffset} style={coordinateStyle}>
          {x}E
        </text>
        <text x={xCenter} y={yCenter + yOffset} style={coordinateStyle}>
          {y}N
        </text>
      </g>
    );
  };

  const Cross = () => {
    return (
      <g>
        <line
          x1={eastDisplay}
          y1={northDisplay}
          x2={westDisplay}
          y2={southDisplay}
          stroke="black"
        />
        <line
          x1={eastDisplay}
          y1={southDisplay}
          x2={westDisplay}
          y2={northDisplay}
          stroke="black"
        />
      </g>
    );
  };

  return (
    <>
      <g>
        <rect
          x={westDisplay}
          y={northDisplay}
          width={cellSize}
          height={cellSize}
          fill={innerColor}
        />
        {sides.map(({ path, color }) => (
          <path key={path} d={path} fill={color} />
        ))}

        {square.content === undefined && <Cross />}
        <Coordinates />
      </g>
    </>
  );
};

export default Cell;
