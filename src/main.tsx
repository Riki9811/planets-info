import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "./assets/fonts/Spartan/Spartan-Bold.ttf";
import "./assets/fonts/Spartan/Spartan-Regular.ttf";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
