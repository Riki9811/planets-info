import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<Link to="/" className={`pseudo-h2 ${styles["home-link"]}`}>
				Planet info
			</Link>
			<nav className={styles.nav}>
				<ul className={styles["nav-list"]}>
					<li>
						<NavLink to="/mercury" className={(props) => getNavlinkClass(props, "mercury-col")}>
							Mercury
						</NavLink>
					</li>
					<li>
						<NavLink to="/venus" className={(props) => getNavlinkClass(props, "venus-col")}>
							Venus
						</NavLink>
					</li>
					<li>
						<NavLink to="/earth" className={(props) => getNavlinkClass(props, "earth-col")}>
							Earth
						</NavLink>
					</li>
					<li>
						<NavLink to="/mars" className={(props) => getNavlinkClass(props, "mars-col")}>
							Mars
						</NavLink>
					</li>
					<li>
						<NavLink to="/jupiter" className={(props) => getNavlinkClass(props, "jupiter-col")}>
							Jupiter
						</NavLink>
					</li>
					<li>
						<NavLink to="/saturn" className={(props) => getNavlinkClass(props, "saturn-col")}>
							Saturn
						</NavLink>
					</li>
					<li>
						<NavLink to="/uranus" className={(props) => getNavlinkClass(props, "uranus-col")}>
							Uranus
						</NavLink>
					</li>
					<li>
						<NavLink to="/neptune" className={(props) => getNavlinkClass(props, "neptune-col")}>
							Neptune
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

function getNavlinkClass({ isActive, isPending }: { isActive: boolean; isPending: boolean }, planetColor: string): string {
    var className = `pseudo-h4 ${planetColor} ${styles["nav-link"]}`;
    if (isActive || isPending) {
        className += ` ${styles.active}`
    }
	return className;
}
