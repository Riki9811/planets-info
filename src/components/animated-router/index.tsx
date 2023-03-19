import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import App from "../../App";
import HomePage from "../../pages/home-page";
import Mercury from "../../pages/mercury";
import ErrorPage from "../../pages/error-page";

export default function AnimatedRouter() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes key={location.pathname} location={location}>
				<Route path="/" element={<App />}>
					<Route index element={<HomePage />} />
					<Route path="mercury" element={<Mercury />} />
					<Route path="venus" element={<h1>Venus</h1>} />
					<Route path="earth" element={<h1>Earth</h1>} />
					<Route path="mars" element={<h1>Mars</h1>} />
					<Route path="jupiter" element={<h1>Jupiter</h1>} />
					<Route path="saturn" element={<h1>Saturn</h1>} />
					<Route path="uranus" element={<h1>Uranus</h1>} />
					<Route path="neptune" element={<h1>Neptune</h1>} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
}
