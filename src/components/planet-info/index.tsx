import { AnimatePresence, motion, Variants } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import PlanetData, { PlanetDescription, PlanetName } from "../../types/PlanetData";
import PlanetSvg from "../planet-svg";
import DataDisplay from "../data-display";
import { ReactComponent as SourceIcon } from "../../assets/icons/source.svg";
import useCountUp from "../../hooks/useCountUp";
import { AppContext } from "../../App";
import styles from "./styles.module.scss";

//#region ANIMATIONS
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
		translateX: "30%",
	},
	show: {
		scale: 1,
		opacity: 1,
		translateX: 0,
	},
	exit: {
		scale: 0.7,
		opacity: 0,
		translateX: "-30%",
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
//#endregion

interface PlanetInfoProps {
	data: PlanetData;
}

export default function PlanetInfo({ data }: PlanetInfoProps) {
	// Planet name (title)
	const name = data.name.toLowerCase() as PlanetName;
	// What info to show
	const [showing, setShowing] = useState<"overview" | "structure" | "geology">("overview");
	const description = useMemo<PlanetDescription>(() => data[showing], [data, showing]);
	// Planet stats
	const { formatters } = useContext(AppContext)!;
	const [countUpDuration, setCountUpDuration] = useState<number>(0.8);
	const { update: updateRotation, value: rotation } = useCountUp({ end: data.rotation, decimals: 2, duration: countUpDuration });
	const { update: updateRevolution, value: revolution } = useCountUp({ end: data.revolution, decimals: 2, duration: countUpDuration });
	const { update: updateRadius, value: radius } = useCountUp({ end: data.radius, decimals: 2, duration: countUpDuration });
	const { update: updateTemp, value: temperature } = useCountUp({ end: data.temperature, decimals: 2, duration: countUpDuration });

	const showOverview = () => setShowing("overview");
	const showStructure = () => setShowing("structure");
	const showGeology = () => setShowing("geology");

	function onAnimationStart(animName: string) {
		if (animName === "exit") {
            setCountUpDuration(0.4);
            updateRotation(0, true);
			updateRevolution(0, true);
			updateRadius(0, true);
			updateTemp(0, true);
		}
	}

	//#region RENDERERS
	function renderPlanet() {
		return (
			<div className={styles.planet}>
				<motion.div {...motionProps(PLANET_ANIMATION, false)}>
					<PlanetSvg name={name} internal={showing === "structure"} />
					<AnimatePresence>
						{showing === "geology" && <motion.div {...motionProps(GEOLOGY_BUBBLE_ANIMATION)} className={`${styles.geology} ${styles[name]}`} />}
					</AnimatePresence>
				</motion.div>
			</div>
		);
	}

	function renderTitle() {
		return (
			<motion.h1 {...motionProps(TITLE_ANIMATION, false)} className={styles.title} onAnimationStart={onAnimationStart}>
				{name}
			</motion.h1>
		);
	}

	function renderDescription() {
		return (
			<div className={styles.desc}>
				<p>{description.content}</p>
				<p className={styles.link}>
					Source:{" "}
					<a href={description.source}>
						Wikipedia <SourceIcon style={{ float: "right" }} />
					</a>
				</p>
			</div>
		);
	}

	function renderButtons() {
		return (
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
		);
	}

	function renderData() {
		return (
			<div className={styles.data}>
				<DataDisplay title="rotation time" data={rotation} formatter={formatters.timeFormatter} />
				<DataDisplay title="revolution time" data={revolution} formatter={formatters.timeFormatter} />
				<DataDisplay title="radius" data={radius} formatter={formatters.distFormatter} />
				<DataDisplay title="average temp." data={temperature} formatter={formatters.tempFormatter} />
			</div>
		);
	}
	//#endregion

	return (
		<div className={`${name}-col ${styles.container}`}>
			{renderPlanet()}
			{renderTitle()}
			{renderDescription()}
			{renderButtons()}
			{renderData()}
		</div>
	);
}

function motionProps(variants: Variants, exitOnInitial: boolean = true) {
	return {
		initial: "hidden",
		animate: "show",
		exit: exitOnInitial ? "hidden" : "exit",
		transition: { duration: 1 },
		variants,
	};
}
