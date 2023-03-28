export type PlanetName = "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune";

interface PlanetDescription {
	content: string;
	source: string;
}

export default interface PlanetData {
	name: string;
	overview: PlanetDescription;
	structure: PlanetDescription;
	geology: PlanetDescription;
	rotation: number;
	revolution: number;
	radius: number;
	temperature: number;
	images: {
		planet: string;
		internal: string;
		geology: string;
	};
}
