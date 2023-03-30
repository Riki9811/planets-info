import { motion } from "framer-motion";
import { ReactComponent as SourceIcon } from "../../assets/icons/source.svg";
import useTypeWriter from "../../hooks/useTypeWriter";
import createMotionProps from "../../utils/MotionAnimations";
import styles from "./styles.module.scss";

interface PlanetDescriptionProps {
	content: string;
    source: string;
    className?: string;
}

export default function PlanetDescription({ content, source, className: parentClassName = "" }: PlanetDescriptionProps) {
	const desc = useTypeWriter({ fullText: content, delay: 10, grouping: 3, instantErase: true });

	return (
		<motion.div {...createMotionProps("GeneralSlideLeft")} className={parentClassName}>
			<p className={styles.desc}>{desc}</p>

			<p className={styles.link}>
				Source:{" "}
				<a href={source}>
					Wikipedia <SourceIcon style={{ float: "right" }} />
				</a>
			</p>
		</motion.div>
	);
}
