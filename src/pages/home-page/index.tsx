import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import createMotionProps from "../../utils/MotionAnimations";
import styles from "./styles.module.scss";

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
			<motion.div className={styles["solar-system"]} {...createMotionProps("HomePageSolarSystem", false)}>
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
