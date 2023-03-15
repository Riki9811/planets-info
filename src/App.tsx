import data from "./assets/data.json";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
	
	return (
        <div className="App">
            <Header />
            <Outlet />
		</div>
	);
}

export default App;

/* <div>
    <a href="https://vitejs.dev" target="_blank">
        <img src="/logo.svg" className="logo" alt="Vite logo" />
    </a>
    <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
</div>
<h1>Vite + React</h1>
<div className="card">
    <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    <p>
        Edit <code>src/App.tsx</code> and save to test HMR
    </p>
</div>
<p className="read-the-docs">Click on the Vite and React logos to learn more</p> */
