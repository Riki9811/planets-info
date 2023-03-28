import { AnimatePresence, motion } from "framer-motion";
import createMotionProps from "../../utils/MotionAnimations";
import styles from "./styles.module.scss";

interface PlanetSvgProps {
	name: string;
	showInternal: boolean;
	showGeology: boolean;
	className?: string;
}

export default function PlanetSvg({ name, showInternal, showGeology, className: parentClassName = "" }: PlanetSvgProps) {
	const divClassName = `${styles.planet} ${showInternal ? styles.internal : ""}`;
	const mainClassName = `${parentClassName} ${styles[name]}`;

	return (
		<motion.div {...createMotionProps("PlanetSvg", false)} className={mainClassName}>
			<div className={divClassName}>{name === "saturn" && <div className={styles.rings} />}</div>
			<AnimatePresence>{showGeology && <motion.div {...createMotionProps("GeologyBubble")} className={styles.geology} />}</AnimatePresence>
		</motion.div>
	);
}
