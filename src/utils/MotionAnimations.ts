const MAP = {
	PlanetSvg: {
		hidden: {
			scale: 0.7,
			opacity: 0,
			translateX: "30%",
		},
		show: {
			scale: 1,
			opacity: 1,
			translateX: 0,
		},
		exit: {
			scale: 0.7,
			opacity: 0,
			translateX: "-30%",
		},
	},
	GeologyBubble: {
		hidden: {
			scale: 0,
			opacity: 0,
			transition: {
				ease: [0.5, -0.5, 0.5, 1],
				duration: 0.5,
			},
		},
		show: {
			scale: 1,
			opacity: 1,
			transition: {
				ease: [0.5, 0, 0.5, 1.5],
				duration: 0.5,
			},
		},
	},
	PlanetTitle: {
		hidden: {
			scale: 0,
		},
		show: {
			scale: 1,
		},
	},
};

type VariantNames = keyof typeof MAP;

export default function createMotionProps(animationName: VariantNames, exitOnInitial: boolean = true, duration: number = 1) {
	return {
		initial: "hidden",
		animate: "show",
		exit: exitOnInitial ? "hidden" : "exit",
		transition: { duration },
		variants: MAP[animationName],
	};
}
