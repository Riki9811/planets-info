import { useEffect, useMemo, useRef, useState } from "react";
import { CountUpApi, CountUpProps } from "../types/CountUp";

const DEFAULTS = {
	start: 0,
	duration: 1,
	decimals: 0,
	startOnMount: true,
};

const UPDATE_FREQUENCY = 10;

export default function useCountUp(props: CountUpProps): CountUpApi {
	// Read props and use dafaults if not specified
	const { start: inputStart, end: inpuEnd, duration, decimals, startOnMount } = { ...DEFAULTS, ...props };

	// The range of the counter
	const [rangeStart, setRangeStart] = useState<number>(inputStart);
	const [rangeEnd, setRangeEnd] = useState<number>(inpuEnd);

	// Current values
	const [value, setValue] = useState<number>(rangeStart);
	const ref = useRef(rangeStart);
	const intervalRef = useRef<ReturnType<typeof setInterval>>();

	// The amount to increase by each iteration
	const accumulator = useMemo(() => {
		/* To calculate the accumulator we must
            1: convert duration from sec to ms
                durationInMs = duration * 1000
            2: get the number of 'UPDATE_FREQUENCY-long' intervals
                nIntervals = durationInMs / UPDATE_FREQUENCY;
            3: divide the total range by the number ov intervals
                (rangeEnd - rangeStart) / nIntervals
        */
		return (rangeEnd - rangeStart) / ((duration * 1000) / UPDATE_FREQUENCY);
	}, [rangeStart, rangeEnd, duration]);

	// Is the counter counting down?
	const countingDown = useMemo(() => accumulator < 0, [accumulator]);

	// Is the counter currently counting (is there an interval active)
	const [isRunning, setIsRunning] = useState<boolean>(startOnMount);

	function updateCounterState() {
		// Check if we should stop counting (by checking if ref.current has gone past the end)
		const stopCounting = (countingDown && ref.current < rangeEnd) || (!countingDown && ref.current > rangeEnd);
		if (stopCounting) {
            // Set value equals to rangeEnd
            setValue(rangeEnd);
			// Stop running
			setIsRunning(false);
			// Call 'onEnd' callback
			props.onEnd?.({ invert, pauseResume, reset, start, update });
            return;
		}

		// Calculate new value
		var newValue = ref.current + accumulator;
		// Update the ref
		ref.current = newValue;
		// Update the value to the new, parsed value
		setValue(parseNewValue(newValue, decimals));
	}

	//#region USE EFFECTS
	useEffect(() => {
		// Call onStart when mounting (if startOnMount is true)
		if (startOnMount) props.onStart?.({ invert, pauseResume, reset, update });
		// Clear interval on dismount
		return () => clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		// Start/stop interval on every isRunning change
		if (isRunning) {
			updateCounterState();
			intervalRef.current = setInterval(updateCounterState, UPDATE_FREQUENCY);
		} else {
			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
		}
	}, [isRunning]);
	//#endregion

	//#region RETURN TRIGGER FUNCTIONS
	function start() {
		setIsRunning(true);
		props.onStart?.({ invert, pauseResume, reset, update });
	}

	function pauseResume() {
		if (isRunning) setIsRunning(false);
		else setIsRunning(true);
		props.onPauseResume?.({ invert, reset, start, update });
	}

	function reset() {
		ref.current = rangeStart;
		setValue(rangeStart);
		props.onReset?.({ invert, pauseResume, start, update });
	}

	function invert() {
		const oldStart = rangeStart;
		setRangeStart(rangeEnd);
		setRangeEnd(oldStart);
        setIsRunning(true);
		props.onInvert?.({ pauseResume, reset, start, update });
	}

	function update(newEnd: number) {
		setRangeEnd(newEnd);
		props.onUpdate?.({ invert, pauseResume, reset, start });
	}
	//#endregion

	return { invert, pauseResume, reset, start, update, value };
}

function parseNewValue(n: number, decimals: number): number {
	if (decimals > 0) return parseFloat(n.toFixed(decimals));
	else return Math.ceil(n);
}
