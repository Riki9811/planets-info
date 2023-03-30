export const ANIMATIONS_MAP = {
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
	MobilePlanetButtons: {
		hidden: {
			translateY: "-100%",
		},
		show: {
			translateY: 0,
		},
	},
	HeaderUl: {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.1,
				staggerChildren: 0.1,
			},
		},
	},
	HeaderLi: {
		hidden: {
			translateX: "110%",
			transition: {
				ease: [0, 0.5, 0.3, 1],
				duration: 0.5,
			},
		},
		show: {
			translateX: 0,
			transition: {
				ease: [0, 0.5, 0.3, 1],
				duration: 0.5,
			},
		},
	},
	ErrorPageStagger: {
		hidden: {
			transition: {
				staggerChildren: 0.25,
				staggerDirection: -1,
				when: "afterChildren",
			},
		},
		show: {
			transition: {
				staggerChildren: 0.25,
			},
		},
	},
	ErrorPageZoom: {
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
	},
	HomePageSolarSystem: {
		hidden: {
			opacity: 0,
			scale: 2.5,
			rotate: -45,
			transition: {
				duration: 2,
			},
		},
		show: {
			opacity: 1,
			scale: 1,
			rotate: 0,
			transition: {
				duration: 2,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.5,
			rotate: 45,
			transition: {
				duration: 2,
			},
		},
	},
	GeneralSlideLeft: {
		hidden: {
			opacity: 0,
			translateX: "100px",
			transition: {
				delay: 0.2,
				duration: 1,
			},
		},
		show: {
			opacity: 1,
			translateX: 0,
			transition: {
				delay: 0.2,
				duration: 1,
			},
		},
	},
	GeneralSlideUp: {
		hidden: {
			opacity: 0,
			translateY: "50px",
			transition: {
				delay: 0.2,
				duration: 1,
			},
		},
		show: {
			opacity: 1,
			translateY: 0,
			transition: {
				delay: 0.2,
				duration: 1,
			},
		},
	},
};

type VariantNames = keyof typeof ANIMATIONS_MAP;

export default function createMotionProps(animationName: VariantNames, exitOnInitial: boolean = true, duration: number = 1) {
	return {
		initial: "hidden",
		animate: "show",
		exit: exitOnInitial ? "hidden" : "exit",
		transition: { duration },
		variants: ANIMATIONS_MAP[animationName],
	};
}
