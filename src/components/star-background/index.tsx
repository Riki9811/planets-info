import { CSSProperties, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const STARS = {
	AMOUNT: 100,
	MAX_SIZE: 3,
	MIN_SIZE: 2,
	MIN_FLICKER_SPEED: 6,
	MAX_FLICKER_SPEED: 8,
	FLICKER_DELAY: 10,
};

class Star {
	x: string;
	y: string;
	size: string;
	style: CSSProperties;

	constructor() {
		this.x = `${getRandomInt(1, 100)}%`;
		this.y = `${getRandomInt(1, 100)}%`;
		this.size = `${getRandomFloat(STARS.MIN_SIZE, STARS.MAX_SIZE)}`;

		this.style = {
			animationDuration: `${getRandomFloat(STARS.MIN_FLICKER_SPEED, STARS.MAX_FLICKER_SPEED)}s`,
			animationDelay: `${getRandomFloat(-STARS.FLICKER_DELAY, STARS.FLICKER_DELAY)}s`,
		};
	}

	render(key: number): JSX.Element {
		return <circle key={key} cx={this.x} cy={this.y} r={this.size} className={styles.star} style={this.style}></circle>;
	}
}

const SHOOTING_STARS = {
	AMOUNT: 10,
	DURATION: 20,
};

class ShootingStar {
	style: CSSProperties;

	constructor(index: number) {
		const ratio = SHOOTING_STARS.DURATION / SHOOTING_STARS.AMOUNT;
		const minDelay = ratio * index + ratio;
		const maxDelay = ratio * index - ratio;

		this.style = {
			top: `${getRandomInt(0, 70)}%`,
			left: `${getRandomInt(10, 110)}%`,
			animationDuration: `${SHOOTING_STARS.DURATION}s`,
			animationDelay: `${getRandomFloat(minDelay, maxDelay)}s`,
		};
	}

	render(key: number): JSX.Element {
		return <div key={key} className={styles["shooting-star"]} style={this.style} />;
	}
}

export default function StarBackground() {
	const [stars, setStars] = useState<Star[]>([]);
	const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

	useEffect(() => {
		var newStars: Star[] = [];
		for (let i = 0; i < STARS.AMOUNT; i++) {
			newStars.push(new Star());
		}
		setStars(newStars);

		var newShootingStars: ShootingStar[] = [];
		for (let i = 0; i < SHOOTING_STARS.AMOUNT; i++) {
			newShootingStars.push(new ShootingStar(i));
		}
		setShootingStars(newShootingStars);
	}, []);

	return (
		<>
			<svg className={styles.stars}>{stars.map((star, index) => star.render(index))}</svg>
			<div className={styles["shooting-stars"]}>{shootingStars.map((star, index) => star.render(index))}</div>
		</>
	);
}

function getRandomFloat(min: number, max: number) {
	const str = (Math.random() * (max - min) + min).toFixed(4);
	return parseFloat(str);
}

function getRandomInt(min: number, max: number) {
	const str = (Math.random() * (max - min) + min).toFixed(0);
	return parseInt(str);
}
