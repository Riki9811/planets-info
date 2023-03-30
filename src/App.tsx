import { createContext, useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
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

	return (
		<AppContext.Provider value={{ isMobile, formatters: formatters.current }}>
			<div className={styles.app}>
				<Header />
				<section className={styles.outlet}>
					<Outlet />
				</section>
			</div>
		</AppContext.Provider>
	);
}
