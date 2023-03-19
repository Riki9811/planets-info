import styles from "./styles.module.scss";
import { motion, Variants } from "framer-motion";

const TITLE_ANIMATION: Variants = {
	hidden: {
		scale: 0,
	},
	show: {
		scale: 1,
	},
};

export default function PlanetInfo() {
	return (
		<>
			<motion.h1 className={styles["solar-system"]} variants={TITLE_ANIMATION} initial="hidden" animate="show" exit="hidden">
				Mercury
			</motion.h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, voluptatem.</p>
		</>
	);
}
