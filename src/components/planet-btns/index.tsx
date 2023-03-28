import { useContext } from "react";
import { AppContext } from "../../App";
import styles from "./styles.module.scss";

interface PlanetBtnsProps {
	showing: "overview" | "structure" | "geology";
	showOverview: () => void;
	showStructure: () => void;
	showGeology: () => void;
	className?: string;
}

export default function PlanetBtns({ showing, showOverview, showStructure, showGeology, className: parentClassName = "" }: PlanetBtnsProps) {
    const { isMobile } = useContext(AppContext)!;

	if (isMobile) {
		return (
			<div className={`${parentClassName} ${styles.mobile}`}>
				<span data-active={showing === "overview"} onClick={showOverview} className={styles.span}>
					Overview
				</span>
				<span data-active={showing === "structure"} onClick={showStructure} className={styles.span}>
					Structure
				</span>
				<span data-active={showing === "geology"} onClick={showGeology} className={styles.span}>
					Surface
				</span>
			</div>
		);
	}

	return (
		<div className={parentClassName}>
			<button data-active={showing === "overview"} onClick={showOverview}>
				Overview
			</button>
			<button data-active={showing === "structure"} onClick={showStructure}>
				Internal Structure
			</button>
			<button data-active={showing === "geology"} onClick={showGeology}>
				Surface Geology
			</button>
		</div>
	);
}
