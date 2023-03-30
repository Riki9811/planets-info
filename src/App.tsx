import { createContext, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import Footer from "./components/footer";
import Header from "./components/header";
import useMediaQuery from "./hooks/useMediaQuery";

type Context = {
	isMobile: boolean;
	formatters: {
		tempFormatter: Intl.NumberFormat;
		distFormatter: Intl.NumberFormat;
		timeFormatter: Intl.NumberFormat;
	};
};

export const AppContext = createContext<Context | undefined>(undefined);

export default function App() {
	const isMobile = useMediaQuery("only screen and (max-width: 48em)");
	const formatters = useRef({
		tempFormatter: new Intl.NumberFormat("en-US", { style: "unit", unit: "celsius" }),
		distFormatter: new Intl.NumberFormat("en-US", { style: "unit", unit: "kilometer" }),
		timeFormatter: new Intl.NumberFormat("en-US", { style: "unit", unit: "day" }),
	});
	const location = useLocation();

	return (
		<AppContext.Provider value={{ isMobile, formatters: formatters.current }}>
			<div className={styles.app}>
				<Header />
				<main className={`${styles.outlet} ${location.pathname === "/" ? styles.home : null}`}>
					<Outlet />
					<Footer />
				</main>
			</div>
		</AppContext.Provider>
	);
}
