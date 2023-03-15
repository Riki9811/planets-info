import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page/ErrorPage";
import HomePage from "./pages/home-page/HomePage";
import "./index.scss";
import "./assets/fonts/Spartan/Spartan-Bold.ttf";
import "./assets/fonts/Spartan/Spartan-Regular.ttf";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "mercury",
				element: <h1>Mercury</h1>,
			},
			{
				path: "venus",
				element: <h1>Venus</h1>,
			},
			{
				path: "earth",
				element: <h1>Earth</h1>,
			},
			{
				path: "mars",
				element: <h1>Mars</h1>,
			},
			{
				path: "jupiter",
				element: <h1>Jupiter</h1>,
			},
			{
				path: "saturn",
				element: <h1>Saturn</h1>,
			},
			{
				path: "uranus",
				element: <h1>Uranus</h1>,
			},
			{
				path: "neptune",
				element: <h1>Neptune</h1>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
