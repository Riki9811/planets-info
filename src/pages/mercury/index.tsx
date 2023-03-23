import PlanetInfo from "../../components/planet-info";
import parseData from "../../utils/DataParsers";
import data from "../../assets/data.json";

export default function Mercury() {
	return <PlanetInfo data={parseData(data[0])} />;
}
