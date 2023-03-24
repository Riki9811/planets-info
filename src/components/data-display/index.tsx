import styles from "./styles.module.scss";

interface DataDisplayProps {
	title: string;
	data: number;
	formatter: Intl.NumberFormat;
}

export default function DataDisplay(props: DataDisplayProps) {
	const { title, data, formatter } = props;

	return (
		<>
			<div className={styles.container}>
				<span className="pseudo-h4">{title}</span>
				<span className="pseudo-h2">{formatter.format(data)}</span>
			</div>
		</>
	);
}
