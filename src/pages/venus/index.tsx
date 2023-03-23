import data from "../../assets/data.json";
import PlanetInfo from "../../components/planet-info";
import parseData from "../../utils/DataParsers";

export default function Venus() {
	return <PlanetInfo data={parseData(data[1])} />;
}
