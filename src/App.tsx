import data from "./assets/data.json";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import StarBackground from "./components/star-background";

export default function App() {
	return (
		<>
			<StarBackground />
			<div className={styles.app}>
				<Header />
				<section>
					<Outlet />
				</section>
			</div>
		</>
	);
}
