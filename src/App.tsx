import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { createContext } from "react";
import useMediaQuery from "./hooks/useMediaQuery";
import styles from "./App.module.scss";

type Context = {
	isMobile: boolean;
};

export const AppContext = createContext<Context | undefined>(undefined);

export default function App() {
	const isMobile = useMediaQuery("only screen and (max-width: 48em)");

	return (
		<AppContext.Provider value={{ isMobile }}>
			<div className={styles.app}>
				<Header />
				<Outlet />
			</div>
		</AppContext.Provider>
	);
}
