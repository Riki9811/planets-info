import { useRef, useEffect } from "react";
import styles from "./styles.module.scss";

export default function HomePage() {
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
		<div className={styles.home}>
			<h1>Donec justo eget</h1>
			<h2>felis facilisis fermentum</h2>
			<h3>Aliquam porttitor mauris sit amet orci</h3>
			<h4>aenean dignissim pellentesque felis.</h4>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, sequi. Dolorem ullam rem quas
				debitis quo iure aperiam totam accusamus! Autem ipsa excepturi sapiente ex voluptatibus facilis libero
				fugit voluptatum?
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
