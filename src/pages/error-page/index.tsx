import { motion, Variants } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const ERROR_STRINGS = {
	err404: "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",
};

const FADE_ANIMATION: Variants = {
	hidden: {
		transition: {
            staggerChildren: 0.25,
            staggerDirection: -1,
			when: "afterChildren",
		},
	},
	show: {
		transition: {
			staggerChildren: 0.5,
		},
	},
};

const ZOOM_ANIMATION: Variants = {
	hidden: {
		scale: 0,
		opacity: 0,
		transition: {
			duration: 0.5,
		},
	},
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 1,
		},
	},
};

export default function ErrorPage() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<motion.div id="error-page" className={styles.error} variants={FADE_ANIMATION} initial="hidden" animate="show" exit="hidden">
			<motion.div variants={ZOOM_ANIMATION}>
				<h1>Oops!</h1>
				<h3>{`404 - Page "${location.pathname}" not found`}</h3>
				<p>{ERROR_STRINGS.err404}</p>
			</motion.div>
			<motion.div variants={ZOOM_ANIMATION}>
				<button className={styles["home-btn"]} onClick={(e) => navigate(-1)}>
					Go back
				</button>
				<button className={styles["home-btn"]} onClick={(e) => navigate("/")}>
					Go to homepage
				</button>
			</motion.div>
		</motion.div>
	);
}
