import Cell from "./Cell";
import CSS from "csstype";
import maze from "./Level1";

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
  return (
    <>
      <div style={floorLevelStyle}>Level 3</div>
      <svg height="1000" width="1000" viewBox="-20 -20 1000 1000">
        {maze.allCells.map((square) => (
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
