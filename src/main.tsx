import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import StarBackground from "./components/star-background";
import "./index.scss";
import "./assets/fonts/Spartan/Spartan-Bold.ttf";
import "./assets/fonts/Spartan/Spartan-Regular.ttf";
import AnimatedRouter from "./components/animated-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<StarBackground />
			<AnimatedRouter />
		</BrowserRouter>
	</React.StrictMode>
);
