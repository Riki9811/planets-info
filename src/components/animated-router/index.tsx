import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import App from "../../App";
import HomePage from "../../pages/home-page";
import Mercury from "../../pages/mercury";
import Venus from "../../pages/venus";
import Earth from "../../pages/earth";
import Mars from "../../pages/mars";
import Jupiter from "../../pages/jupiter";
import Saturn from "../../pages/saturn";
import Uranus from "../../pages/uranus";
import Neptune from "../../pages/neptune";
import ErrorPage from "../../pages/error-page";

export default function AnimatedRouter() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes key={location.pathname} location={location}>
				<Route path="/" element={<App />}>
					<Route index element={<HomePage />} />
					<Route path="mercury" element={<Mercury />} />
					<Route path="venus" element={<Venus />} />
					<Route path="earth" element={<Earth />} />
					<Route path="mars" element={<Mars />} />
					<Route path="jupiter" element={<Jupiter />} />
					<Route path="saturn" element={<Saturn />} />
					<Route path="uranus" element={<Uranus />} />
					<Route path="neptune" element={<Neptune />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
}
