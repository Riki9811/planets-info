import PlanetData from "../types/PlanetData";

interface UnparsedPlanetData {
	name: string;
	overview: {
		content: string;
		source: string;
	};
	structure: {
		content: string;
		source: string;
	};
	geology: {
		content: string;
		source: string;
	};
	rotation: string;
	revolution: string;
	radius: string;
	temperature: string;
	images: {
		planet: string;
		internal: string;
		geology: string;
	};
}

export default function parseData(planetData: UnparsedPlanetData): PlanetData {
	return {
		...planetData,
		rotation: parseBySpace(planetData.rotation),
		revolution: parseBySpace(planetData.revolution),
		radius: parseBySpace(planetData.radius),
		temperature: parseTemperature(planetData.temperature),
	};
}

function parseBySpace(spaceSeparated: string): number {
	return parseFloat(spaceSeparated.split(" ")[0].replace(",", ""));
}

function parseTemperature(temp: string): number {
	return parseFloat(temp.substring(0, temp.length - 2).replace(",", ""));
}
