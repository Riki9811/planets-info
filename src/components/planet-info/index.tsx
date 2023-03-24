import { AnimatePresence, motion, Variants } from "framer-motion";
import { useContext, useMemo, useState } from "react";
import PlanetData, { PlanetDescription } from "../../types/PlanetData";
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
//#endregion

interface PlanetInfoProps {
	data: PlanetData;
}

const DEFAULT_COUNT_UP = {
	decimals: 2,
};

export default function PlanetInfo({ data }: PlanetInfoProps) {
	// Planet name (title)
	const name = data.name.toLowerCase();
	// What info to show
	const [showing, setShowing] = useState<"overview" | "structure" | "geology">("overview");
	const description = useMemo<PlanetDescription>(() => data[showing], [data, showing]);
	// Planet stats
	const { formatters } = useContext(AppContext)!;
	const { invert: invertRotation, value: rotation } = useCountUp({ end: data.rotation, ...DEFAULT_COUNT_UP });
	const { invert: invertRevolution, value: revolution } = useCountUp({ end: data.revolution, ...DEFAULT_COUNT_UP });
	const { invert: invertRadius, value: radius } = useCountUp({ end: data.radius, ...DEFAULT_COUNT_UP });
	const { invert: invertTemp, value: temperature } = useCountUp({ end: data.temperature, ...DEFAULT_COUNT_UP });

	const showOverview = () => setShowing("overview");
	const showStructure = () => setShowing("structure");
	const showGeology = () => setShowing("geology");

	function onAnimationStart(animName: string) {
		if (animName === "exit") {
			invertRotation();
			invertRevolution();
			invertRadius();
			invertTemp();
		}
	}

	//#region RENDERERS
	function renderPlanet() {
		return (
			<div className={styles.planet}>
				<motion.div {...motionProps(PLANET_ANIMATION, false)}>
					<PlanetSvg name={name} internal={showing === "structure"} />
					<AnimatePresence>
						{showing === "geology" && (
							<motion.div
								{...motionProps(GEOLOGY_BUBBLE_ANIMATION)}
								className={`${styles.geology} ${styles[name]}`}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		);
	}

	function renderTitle() {
		return (
			<motion.h1
				{...motionProps(TITLE_ANIMATION, false)}
				className={styles.title}
				onAnimationStart={onAnimationStart}
			>
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
