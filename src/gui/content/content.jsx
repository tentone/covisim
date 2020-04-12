import React from "react";
import {ChartCard} from "./chart-card.jsx";
import {GuiState} from "../gui-state";
import Divider from "@material-ui/core/Divider";
import {CountryCard} from "./country-card.jsx";
import {SimulationCard} from "./simulation-card.jsx";

class Content extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		return (
			<div style={{overflow: "auto", position:"absolute", width: "100%", height:"100%"}}>
				<ChartCard ref={GuiState.chart}/>
				<Divider style={{margin:"20px"}}/>

				<CountryCard ref={GuiState.countryCard}/>
				<Divider style={{margin:"20px"}}/>

				<SimulationCard/>
				<Divider style={{margin:"20px"}}/>
			</div>
		);
	}
}

export {Content};
