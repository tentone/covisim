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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {ChartCasesAxis} from "./chart-card.jsx";

class ConfigurationCard extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const timeAxisChange = (event) => {
			if(GuiState.chartCard.current !== null)
			{
				GuiState.chartCard.current.setTimeAxisMode(event.target.value);
			}
		};

		const casesAxisChange = (event) => {
			if(GuiState.chartCard.current !== null)
			{
				GuiState.chartCard.current.setCasesAxisMode(event.target.value);
			}
		};

		const compareCountryChange = (event) => {
			GuiState.selectMultiple = event.target.checked;
		};

		const drawSimulationChange = (event) => {
			GuiState.drawSimulation = event.target.checked;
		};

		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Configuration</Typography>
					<br/>

					<FormControlLabel control={<Checkbox defaultChecked={GuiState.drawSimulation} onChange={drawSimulationChange}/>} color="primary" label="Draw Simulation Chart">
					</FormControlLabel>
					<br/>
					<FormControlLabel style={{marginBottom:"5px"}} control={<Checkbox defaultChecked={GuiState.selectMultiple} onChange={compareCountryChange}/>} color="primary" label="Compare Countries">
					</FormControlLabel>

					<FormControl fullWidth style={{marginBottom:"5px"}} >
						<InputLabel>Chart Cases Mode</InputLabel>
						<Select defaultValue={ChartCasesAxis.ABSOLUTE} onChange={casesAxisChange}>
							<MenuItem value={ChartCasesAxis.ABSOLUTE}>Total Cases</MenuItem>
							<MenuItem value={ChartCasesAxis.DIFF}>Daily Diff.</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth style={{marginBottom:"5px"}} >
						<InputLabel>Chart Time Mode</InputLabel>
						<Select defaultValue={ChartTimeAxis.DAY} onChange={timeAxisChange}>
							<MenuItem value={ChartTimeAxis.DATE}>Date</MenuItem>
							<MenuItem value={ChartTimeAxis.DAY}>Day</MenuItem>
						</Select>
					</FormControl>
				</div>
			</Card>
		);
	}
}

export {ConfigurationCard};
