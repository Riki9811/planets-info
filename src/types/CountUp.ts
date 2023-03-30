type VoidFn = () => void;
type UpdateFn = (newEnd: number, startOnUpdate?: boolean) => void;

export interface CountUpApi {
	invert: VoidFn;
	pauseResume: VoidFn;
	reset: VoidFn;
	start: VoidFn;
	update: UpdateFn;
	value: number;
}

export interface OnEndArgs {
	invert: VoidFn;
	pauseResume: VoidFn;
	reset: VoidFn;
	start: VoidFn;
	update: UpdateFn;
}
export type OnEndCallback = (args: OnEndArgs) => void;

export interface OnStartArgs {
	invert: VoidFn;
	pauseResume: VoidFn;
	reset: VoidFn;
	update: UpdateFn;
}
export type OnStartCallback = (args: OnStartArgs) => void;

export interface OnPauseResumeArgs {
	invert: VoidFn;
	reset: VoidFn;
	start: VoidFn;
	update: UpdateFn;
}
export type OnPauseResumeCallback = (args: OnPauseResumeArgs) => void;

export interface OnResetArgs {
	invert: VoidFn;
	pauseResume: VoidFn;
	start: VoidFn;
	update: UpdateFn;
}
export type OnResetCallback = (args: OnResetArgs) => void;

export interface OnUpdateArgs {
	invert: VoidFn;
	pauseResume: VoidFn;
	reset: VoidFn;
	start: VoidFn;
}
export type OnUpdateCallback = (args: OnUpdateArgs) => void;

export interface OnInvertArgs {
	pauseResume: VoidFn;
	reset: VoidFn;
	start: VoidFn;
	update: UpdateFn;
}
export type OnInvertCallback = (args: OnInvertArgs) => void;

export interface CountUpProps {
	start?: number;
	end: number;
	duration?: number;
	decimals?: number;
	startOnMount?: boolean;
	formatter?: Intl.NumberFormat;

	onEnd?: OnEndCallback;
	onStart?: OnStartCallback;
	onPauseResume?: OnPauseResumeCallback;
	onReset?: OnResetCallback;
	onUpdate?: OnUpdateCallback;
	onInvert?: OnInvertCallback;
}
