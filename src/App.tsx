import data from "./assets/data.json";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";

export default function App() {
	return (
		<div className={styles.app}>
			<Header />
			<section>
				<Outlet />
			</section>
		</div>
	);
}
