import styles from "./styles.module.scss";

interface IconProps {
	name: string;
	internal: boolean;
}

export default function PlanetSvg({ name, internal }: IconProps) {
	const className = `${styles.planet} ${internal ? styles.internal : ""} ${styles[name]}`;

	return <div className={className}>{name === "saturn" && <div className={styles.rings} />}</div>;
}
