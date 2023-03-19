import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";
import { AppContext } from "../../App";
import styles from "./styles.module.scss";

const ROUTES = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];

const UL_VARIANTS: Variants = {
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
};

const LI_VARIANTS: Variants = {
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
};

export default function Header() {
    const { isMobile } = useContext(AppContext)!;
	const [expanded, setExpanded] = useState<boolean>(false);

	// Close the mobile nav when the device stops being mobile
	useEffect(() => {
		if (!isMobile) closeMobileMenu();
	}, [isMobile]);

	function closeMobileMenu() {
		setExpanded(false);
	}

	function renderMobileNav() {
		return (
			<nav id="nav-list" className={styles.nav}>
				<motion.ul className={styles["nav-list"]} variants={UL_VARIANTS} initial="hidden" animate="show" exit="hidden">
					{ROUTES.map((planet, index) => (
						<motion.li key={index} variants={LI_VARIANTS}>
							<MobileNavLink key={index} planetName={planet} onClickCallback={closeMobileMenu} />
						</motion.li>
					))}
				</motion.ul>
			</nav>
		);
	}

	if (isMobile) {
		return (
			<header className={styles.header}>
				<Link to="/" className={`pseudo-h2 ${styles["home-link"]}`} onClick={closeMobileMenu}>
					Planet info
				</Link>
				<AnimatePresence>{expanded && renderMobileNav()}</AnimatePresence>
				<span aria-label="Menu toggle" aria-expanded={expanded} aria-controls="nav-list" onClick={(e) => setExpanded((prev) => !prev)}>
					<Hamburger />
				</span>
			</header>
		);
	}

	return (
		<header className={styles.header}>
			<Link to="/" className={`pseudo-h2 ${styles["home-link"]}`}>
				Planet info
			</Link>
			<nav id="nav-list" className={styles.nav}>
				<ul className={styles["nav-list"]}>
					{ROUTES.map((planet, index) => (
						<li key={index}>
							<DesktopNavLink planetName={planet} />
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

interface MobileNavLinkProps {
	planetName: string;
	onClickCallback: MouseEventHandler<HTMLAnchorElement>;
}

function MobileNavLink({ planetName, onClickCallback }: MobileNavLinkProps) {
	return (
		<NavLink to={`/${planetName}`} className={`${planetName}-alt-col pseudo-h3 ${styles["nav-link-mobile"]}`} onClick={onClickCallback}>
			<p>{planetName}</p>
			<Chevron />
		</NavLink>
	);
}

interface DesktopNavLinkProps {
	planetName: string;
}

function DesktopNavLink({ planetName }: DesktopNavLinkProps) {
	return (
		<NavLink
			to={`/${planetName}`}
			className={({ isActive }) => {
				return `${planetName}-col pseudo-h4 ${styles["nav-link"]} ${isActive ? styles.active : ""}`;
			}}
		>
			{planetName}
		</NavLink>
	);
}
