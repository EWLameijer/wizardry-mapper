import "./App.css";
import Cell from "./Cell";
import CSS from "csstype";
import maze from "./Level1";

/* Model:
    Assume (for now) 20x20 field, likely toroidal (moving north you will reenter on the south side, et cetera)
    Each field has a dimension of n x n (say in pixels)
    Normal dimensions are north and east, so y (-y) and x
    coordinate (0,0) has therefore as coordinates of the gridlines surrounding it
        south line: (0, 20n) -> (n, 20n)
        north line: (0, 19n) -> (n, 19n)
        west line: (0, 19n) -> (0, 20n)
        east line: (n, 19n) -> (n, 20n)

    In general, coordinate x,y has four anchor points:
        NE: (xn, y(19-n))
        NW: ((x+1)n, y(19-n))
        SE: (xn, y(20-n))
        SW: ((x+1)n, y(20-n))

        south line: SW -> SE
        north line NW -> NE
        east line: NE -> SE
        west line: NW -> SW

        Data structure: things can be one-way, so bear on one side of door, normal door on other side. So there is a row of 20 x 20 cells; each has four sides 
        (north, east, south, west, though those can be in an array be be sure. A cell can have contents). So a 20x20 array of objects.
        Note, though, that I 

        // 

        // Tasks
        // 1. make a walled cell 
        // 2. Make a drawing function that takes a cell (which includes coordinates) and draws it on the grid in the right position
        // 3. 
        // 


     */

// class BaseCell {
//   constructor(
//     public coordinate: GridCoordinate,
//     public content: string | undefined = undefined,
//     public sides: string[] = Array(4).fill(SideType.EMPTY)
//   ) {}

//   static walled(coordinate: GridCoordinate) {
//     return new BaseCell(coordinate, undefined, Array(4).fill(SideType.WALL));
//   }
// }

// const wallSizeInPx = 20;
// const gridSize = 20;
// const

// const draw = (cell: BaseCell) => {
//   const {x, y } = { ...cell.coordinate}

//   const northEastCorner = new SvgCoordinate(x * wallSizeInPx, y * (gridSize-1 - y)*wallSizeInPx)) //
//   NW: ((x+1)n, y(19-n))
//   SE: (xn, y(20-n))
//   SW: ((x+1)n, y(20-n))

//   return <g>

//   </g>
// }
// const grid = [];
// for (let y = 0; y < gridSize; y++) {
//   const row = []
//   for ()
// }

// maze;
// maze.east("44");
// maze.east("44");
// maze.east("44");
// maze.east("44");
// maze.east("84");
// maze.east("44");
// maze.north("05");
// maze.north("41");
// ma;
// maze.moveTo(start);
// maze.north("11");
//   .east("44:silver key;")
//   .east("45/e=bear door/");

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
      <div style={floorLevelStyle}>Level 1</div>
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
