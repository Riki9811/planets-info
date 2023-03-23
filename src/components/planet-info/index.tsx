import { AnimatePresence, motion, Variants } from "framer-motion";
import { useContext, useMemo, useState } from "react";
import PlanetData, { PlanetDescription } from "../../types/PlanetData";
import PlanetSvg from "../planet-svg";
import { ReactComponent as SourceIcon } from "../../assets/icons/source.svg";
import styles from "./styles.module.scss";
import { AppContext } from "../../App";

const TITLE_ANIMATION: Variants = {
	hidden: {
		scale: 0,
	},
	show: {
		scale: 1,
	},
};

const PLANET_ANIMATION: Variants = {
	hidden: {
		scale: 0.7,
		opacity: 0,
		translateX: "20%",
		translateY: "5%",
		rotate: 90,
	},
	show: {
		scale: 1,
		opacity: 1,
		translateX: 0,
		translateY: 0,
		rotate: 0,
	},
	exit: {
		scale: 0.7,
		opacity: 0,
		translateX: "-20%",
		translateY: "5%",
		rotate: -90,
	},
};

const GEOLOGY_BUBBLE_ANIMATION: Variants = {
	hidden: {
		scale: 0,
		opacity: 0,
		transition: {
			ease: [0.5, -0.5, 0.5, 1],
			duration: 0.5,
		},
	},
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			ease: [0.5, 0, 0.5, 1.5],
			duration: 0.5,
		},
	},
};

interface PlanetInfoProps {
	data: PlanetData;
}

export default function PlanetInfo({ data }: PlanetInfoProps) {
	const name = data.name.toLowerCase();
	const { formatters } = useContext(AppContext)!;
	const { rotation, revolution, radius, temperature } = data;

	const [showing, setShowing] = useState<"overview" | "structure" | "geology">("overview");
	const description = useMemo<PlanetDescription>(() => data[showing], [data, showing]);

	const showOverview = () => setShowing("overview");
	const showStructure = () => setShowing("structure");
	const showGeology = () => setShowing("geology");

	return (
		<div className={`${name}-col ${styles.container}`}>
			<div className={styles.planet}>
				<motion.div {...motionProps(PLANET_ANIMATION, false)}>
					<PlanetSvg name={name} internal={showing === "structure"} />
					<AnimatePresence>
						{showing === "geology" && <motion.div {...motionProps(GEOLOGY_BUBBLE_ANIMATION)} className={`${styles.geology} ${styles[name]}`} />}
					</AnimatePresence>
				</motion.div>
			</div>

			<motion.h1 {...motionProps(TITLE_ANIMATION, false)} className={styles.title}>
				{name}
			</motion.h1>

			<div className={styles.desc}>
				<p>{description.content}</p>
				<p className={styles.link}>
					Source:{" "}
					<a href={description.source}>
						Wikipedia <SourceIcon style={{ float: "right" }} />
					</a>
				</p>
			</div>

			<div className={styles.btns}>
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

			<div className={styles.data}>
				<div className={styles["data-container"]}>
					<span className="pseudo-h4">rotation time</span>
					<span className="pseudo-h2">{formatters.timeFormatter.format(rotation)}</span>
				</div>
				<div className={styles["data-container"]}>
					<span className="pseudo-h4">revolution time</span>
					<span className="pseudo-h2">{formatters.timeFormatter.format(revolution)}</span>
				</div>
				<div className={styles["data-container"]}>
					<span className="pseudo-h4">radius</span>
					<span className="pseudo-h2">{formatters.distFormatter.format(radius)}</span>
				</div>
				<div className={styles["data-container"]}>
					<span className="pseudo-h4">average temp.</span>
					<span className="pseudo-h2">{formatters.tempFormatter.format(temperature)}</span>
				</div>
			</div>
		</div>
	);
}

function motionProps(variants: Variants, exitOnInitial: boolean = true) {
	return { initial: "hidden", animate: "show", exit: exitOnInitial ? "hidden" : "exit", transition: { duration: 1 }, variants };
}
