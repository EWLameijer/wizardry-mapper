import GridCoordinate from "./GridCoordinate";
import SpecialSide from "./SpecialSide";

interface CellData {
  location: GridCoordinate;
  westNorthCode: number;
  eastSouthCode: number;
  contents: string;
  specialSide?: SpecialSide;
  label?: string;
}

export default CellData;
