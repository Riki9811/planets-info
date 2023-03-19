import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styles from "./styles.module.scss";

const SOLAR_SYSTEM_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		scale: 2.5,
		rotate: -45,
		transition: {
			duration: 2,
		},
	},
	show: {
		opacity: 1,
		scale: 1,
		rotate: 0,
		transition: {
			duration: 2,
		},
	},
};

export default function HomePage() {
	const btns = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];

	useEffect(() => {
		setBtnActive(0);
	}, []);

	function setBtnActive(nBtn: number, e?: HTMLButtonElement) {
		if (e?.classList.contains("active")) return;

		btns.forEach((btn, index) => {
			btn.current?.classList.toggle("active", index === nBtn);
		});
	}

	return (
		<div className={styles.home}>
			<motion.div className={styles["solar-system"]} variants={SOLAR_SYSTEM_VARIANTS} initial="hidden" animate="show" exit="hidden">
				<div className={styles.sun} />
				<Link to="/neptune" className={`neptune-col ${styles.orbit} ${styles.neptune}`} />
				<Link to="/uranus" className={`uranus-col ${styles.orbit} ${styles.uranus}`} />
				<Link to="/saturn" className={`saturn-col ${styles.orbit} ${styles.saturn}`} />
				<Link to="/jupiter" className={`jupiter-col ${styles.orbit} ${styles.jupiter}`} />
				<Link to="/mars" className={`mars-col ${styles.orbit} ${styles.mars}`} />
				<Link to="/earth" className={`earth-col ${styles.orbit} ${styles.earth}`} />
				<Link to="/venus" className={`venus-col ${styles.orbit} ${styles.venus}`} />
				<Link to="/mercury" className={`mercury-col ${styles.orbit} ${styles.mercury}`} />
			</motion.div>
		</div>
	);
}
