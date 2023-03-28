import { useEffect, useRef, useState } from "react";

type TypeWriteDelay = number | { writingDelay: number; erasingDelay: number };

export interface TypeWriterProps {
	fullText: string;
	delay: TypeWriteDelay;
	grouping?: number;
	fullErase?: boolean;
	instantErase?: boolean;
}

const DEFAULTS = {
	grouping: 1,
	fullErase: true,
	instantErase: false,
};

export default function useTypeWriter(props: TypeWriterProps): string {
	// Unpack props using defaults
	const { fullText, delay, grouping, fullErase, instantErase } = { ...DEFAULTS, ...props };
	// Further unpack delay prop
	const [writingDelay, erasingDelay] = typeof delay === "number" ? [delay, delay] : [delay.writingDelay, delay.erasingDelay];

	// Current value to display
	const [text, setText] = useState<string>("");
	// The current state of the hook
	const [state, setState] = useState<"erase" | "write" | "idle">("idle");

	// Reference to the current value
	const textRef = useRef("");
	// Reference to the interval
	const intervalRef = useRef<ReturnType<typeof setInterval>>();

	function eraseText() {
		const isEmpty = textRef.current.length === 0;
		const startsWith = fullText.startsWith(textRef.current);
		if (isEmpty || (!fullErase && startsWith)) {
			stop();
			setState("write");
			return;
		}

		const curr = textRef.current;
		const next = curr.substring(0, curr.length - grouping);
		textRef.current = next;
		setText(next);
	}

	function writeText() {
		if (textRef.current === fullText) {
			stop();
			setState("idle");
			return;
		}

		const curr = textRef.current;
		const next = fullText.substring(0, curr.length + grouping);
		textRef.current = next;
		setText(next);
	}

	useEffect(() => {
		// Stop what you are doing by default
		clearInterval(intervalRef.current);
		intervalRef.current = undefined;

		if (state === "write") {
			writeText();
			intervalRef.current = setInterval(writeText, writingDelay);
        }

        if (state === "erase") {
			if (instantErase) {
				const reset = fullErase ? "" : getSameStart(textRef.current, fullText);
				textRef.current = reset;
				setText(reset);
				setState("write");
			} else {
				eraseText();
				intervalRef.current = setInterval(eraseText, erasingDelay);
			}
		}
	}, [state]);

	useEffect(() => {
		setState("erase");
	}, [fullText]);

	return text;
}

function getSameStart(s1: string, s2: string) {
	const shortestLength = Math.min(s1.length, s2.length);
	var sameStart = "";
	for (let i = 0; i < shortestLength; i++) {
		if (s1.charAt(i) !== s2.charAt(i)) break;
		sameStart += s1.charAt(i);
	}
	return sameStart;
}
