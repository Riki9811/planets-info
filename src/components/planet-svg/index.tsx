import React, { useMemo } from "react";
import { ReactComponent as MercuryInternalSvg } from "../../assets/planets-internal/mercury.svg";
import { ReactComponent as VenusInternalSvg } from "../../assets/planets-internal/venus.svg";
import { ReactComponent as EarthInternalSvg } from "../../assets/planets-internal/earth.svg";
import { ReactComponent as MarsInternalSvg } from "../../assets/planets-internal/mars.svg";
import { ReactComponent as JupiterInternalSvg } from "../../assets/planets-internal/jupiter.svg";
import { ReactComponent as SaturnInternalSvg } from "../../assets/planets-internal/saturn.svg";
import { ReactComponent as UranusInternalSvg } from "../../assets/planets-internal/uranus.svg";
import { ReactComponent as NeptuneInternalSvg } from "../../assets/planets-internal/neptune.svg";

const SVG_MAPPING: { [name: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
	mercuryInternal: MercuryInternalSvg,
	venusInternal: VenusInternalSvg,
	earthInternal: EarthInternalSvg,
	marsInternal: MarsInternalSvg,
	jupiterInternal: JupiterInternalSvg,
	saturnInternal: SaturnInternalSvg,
	uranusInternal: UranusInternalSvg,
	neptuneInternal: NeptuneInternalSvg,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
	name: string;
	internal: boolean;
}

export default function PlanetSvg({ name, internal, ...svgProps }: IconProps) {
	const planetSvgName = name + "Internal";
	const className = useMemo(() => {
		var baseClass = svgProps.className ?? "";
		var extension = internal ? " showCore" : "";
		return baseClass + extension;
	}, [internal]);

	return <>{React.createElement(SVG_MAPPING[planetSvgName], { ...svgProps, className })}</>;
}
