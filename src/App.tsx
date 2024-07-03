import Cell from "./Cell";
import CSS from "csstype";
import maze from "./entities/maze";
import { useState } from "react";

/* Model: Assume (for now) 20x20 field, likely toroidal (moving north you will reenter on the south side, et cetera) */

const floorLevelStyle: CSS.Properties = {
  font: "40 px sans-serif",
  fill: "black",
  position: "absolute",
  left: "420px",
  fontWeight: "500",
  paddingBottom: "80px",
};

function App() {
  const [level, setLevel] = useState(1);
  const levels = [...Array(10)].map((_, index) => index + 1);

  return (
    <>
      <div style={floorLevelStyle}>
        Level
        <select onChange={(e) => setLevel(parseInt(e.target.value))}>
          {levels.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <svg height="1000" width="1000" viewBox="-20 -20 1000 1000">
        {maze[level - 1].allCells.map((square) => (
          <Cell
            key={square.coordinate.x + "-" + square.coordinate.y}
            square={square}
          />
        ))}
      </svg>
    </>
  );
}

export default App;
