import IMappedReading from "./IMappedReading";

interface IFormattedChartData {
  id: string;
  color: string;
  data: IMappedReading[];
}

export default IFormattedChartData;
