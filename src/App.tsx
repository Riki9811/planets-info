import { useRef, useState, useEffect } from "react";
import "./App.scss";

function App() {
	const [count, setCount] = useState(0);
	const btns = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];

	useEffect(() => {
		setBtnActive(0);
	}, []);

    function setBtnActive(nBtn: number, e?: HTMLButtonElement) {
        if (e?.classList.contains("active")) return;
        
		btns.forEach((btn, index) => {
			btn.current?.classList.toggle("active", index === nBtn);
		});
	}

	return (
		<div className="App">
			<h1>Donec justo eget</h1>
			<h2>felis facilisis fermentum</h2>
			<h3>Aliquam porttitor mauris sit amet orci</h3>
			<h4>aenean dignissim pellentesque felis.</h4>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, sequi.
				<br />
				Dolorem ullam rem quas debitis quo iure aperiam totam accusamus!
				<br />
				Autem ipsa excepturi sapiente ex voluptatibus facilis libero fugit voluptatum?
				<br />
			</p>
			<br />
			<br />
			<button ref={btns[0]} onClick={(e) => setBtnActive(0, e.currentTarget)}>
				button
			</button>
			<br />
			<br />
			<button ref={btns[1]} onClick={(e) => setBtnActive(1, e.currentTarget)}>
				button
			</button>
			<br />
			<br />
			<button ref={btns[2]} onClick={(e) => setBtnActive(2, e.currentTarget)}>
				button
			</button>
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
