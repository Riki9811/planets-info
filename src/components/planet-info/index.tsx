import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import PlanetData, { PlanetDescription } from "../../types/PlanetData";
import styles from "./styles.module.scss";

const TITLE_ANIMATION: Variants = {
	hidden: {
		scale: 0,
	},
	show: {
		scale: 1,
	},
};

interface PlanetInfoProps {
	data: PlanetData;
}

export default function PlanetInfo({ data }: PlanetInfoProps) {
	const [showing, setShowing] = useState<"overview" | "structure" | "geology">("overview");
	const description = useMemo<PlanetDescription>(() => data[showing], [data, showing]);

	const showOverview = () => setShowing("overview");
	const showStructure = () => setShowing("structure");
	const showGeology = () => setShowing("geology");

	return (
		<div className={`${data.name.toLowerCase()}-col`}>
			<motion.h1 variants={TITLE_ANIMATION} initial="hidden" animate="show" exit="hidden">
				{data.name}
			</motion.h1>
			<p>{description.content}</p>
			<a href={description.source}>Wikipedia</a>
			<button data-active={showing === "overview"} onClick={showOverview}>
				Overview
			</button>
			<button data-active={showing === "structure"} onClick={showStructure}>
				Internal Structure
			</button>
			<button data-active={showing === "geology"} onClick={showGeology}>
				Surface Geology
			</button>
		</div>
	);
}
