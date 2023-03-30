import { motion } from "framer-motion";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../App";
import useCountUp from "../../hooks/useCountUp";
import PlanetData, { PlanetName } from "../../types/PlanetData";
import createMotionProps from "../../utils/MotionAnimations";
import DataDisplay from "../data-display";
import PlanetBtns from "../planet-btns";
import PlanetDescription from "../planet-description";
import PlanetSvg from "../planet-svg";
import styles from "./styles.module.scss";

interface PlanetInfoProps {
	data: PlanetData;
}

export default function PlanetInfo({ data }: PlanetInfoProps) {
	// Planet name (title)
	const name = data.name.toLowerCase() as PlanetName;
	// What info to show
	const [showing, setShowing] = useState<"overview" | "structure" | "geology">("overview");
	const description = useMemo(() => data[showing], [data, showing]);
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
		if (animName === "hidden") {
			setCountUpDuration(0.4);
			updateRotation(0, true);
			updateRevolution(0, true);
			updateRadius(0, true);
			updateTemp(0, true);
		}
	}

	return (
		<div className={`${name}-col ${styles.container}`}>
			<PlanetSvg name={name} showInternal={showing === "structure"} showGeology={showing === "geology"} className={styles.planet} />

			<motion.h1 {...createMotionProps("GeneralSlideLeft")} className={styles.title} onAnimationStart={onAnimationStart}>
				{name}
			</motion.h1>

			<PlanetDescription content={description.content} source={description.source} className={styles.desc} />

			<PlanetBtns {...{ showing, showGeology, showStructure, showOverview }} className={styles.btns} />

			<motion.div {...createMotionProps("GeneralSlideUp")} className={styles.data}>
				<DataDisplay title="rotation time" data={rotation} formatter={formatters.timeFormatter} />
				<DataDisplay title="revolution time" data={revolution} formatter={formatters.timeFormatter} />
				<DataDisplay title="radius" data={radius} formatter={formatters.distFormatter} />
				<DataDisplay title="average temp." data={temperature} formatter={formatters.tempFormatter} />
			</motion.div>
		</div>
	);
}
