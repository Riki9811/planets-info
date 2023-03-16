import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface ErrorProps {
	h1: string;
	h3: string;
	pContent: ReactNode;
}

export default function Error({ h1, h3, pContent }: ErrorProps) {
	const navigate = useNavigate();
	return (
		<div id="error-page" className={styles.error}>
			<h1>{h1}</h1>
			<h3>{h3}</h3>
			<p>{pContent}</p>
			<button className={styles["home-btn"]} onClick={(e) => navigate(-1)}>
				Go back
			</button>
			<button className={styles["home-btn"]} onClick={(e) => navigate("/")}>
				Go to homepage
			</button>
		</div>
	);
}
