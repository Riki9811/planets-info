import styles from "./styles.module.scss";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			Developed by:{" "}
			<a href="https://github.com/Riki9811/" className={styles.link}>
				Riccardo Mariotti
			</a>
		</footer>
	);
}
