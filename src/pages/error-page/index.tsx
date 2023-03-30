import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import createMotionProps, { ANIMATIONS_MAP } from "../../utils/MotionAnimations";
import styles from "./styles.module.scss";

const ERROR_STRINGS = {
	err404: "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",
};

export default function ErrorPage() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<motion.div id="error-page" className={styles.error} {...createMotionProps("ErrorPageStagger")}>
			<motion.div variants={ANIMATIONS_MAP["ErrorPageZoom"]}>
				<h1>Oops!</h1>
				<h3>{`404 - Page "${location.pathname}" not found`}</h3>
				<p>{ERROR_STRINGS.err404}</p>
			</motion.div>
			<motion.div variants={ANIMATIONS_MAP["ErrorPageZoom"]}>
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
