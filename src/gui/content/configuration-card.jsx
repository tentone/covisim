import React from "react";
import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {ChartTimeAxis} from "./chart-card.jsx";
import {GuiState} from "../gui-state";

class ConfigurationCard extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	chartTimeChange(event)
	{
		GuiState.chartCard.current.setTimeAxisMode(event.target.value);
	}

	render()
	{
		var elements = [];
		if(GuiState.chartCard.current !== null)
		{
			elements.push(<FormControl key={0} fullWidth>
				<InputLabel>Chart Time</InputLabel>
				<Select value={GuiState.chartCard.current.timeAxis} onChange={(event) => {this.chartTimeChange(event);}}>
					<MenuItem value={ChartTimeAxis.DATE}>Date</MenuItem>
					<MenuItem value={ChartTimeAxis.DAY}>Day</MenuItem>
				</Select>
			</FormControl>);
		}


		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Configuration</Typography>
					<br/>
					{elements}
				</div>
			</Card>
		);
	}
}

export {ConfigurationCard};
