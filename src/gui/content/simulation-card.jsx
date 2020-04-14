import React from "react";
import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {GuiState} from "../gui-state";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {FileUtils} from "../../utils/file-utils";
import {Simulation} from "../../simulation/simulation";

class SimulationCard extends React.Component
{
	constructor(props)
	{
		super(props);

		/**
		 * Number of steps on each simulation run.
		 */
		this.steps = 1;
	}

	/**
	 * Import full simulation data with configuration current simulation state and governor data from JSON file.
	 */
	importSimulation()
	{
		FileUtils.chooseFile(function (files){
			if(files.length > 0)
			{
				const reader = new FileReader();
				reader.onload = function()
				{
					try
					{
						let simulation = new Simulation();
						simulation.fromJSON(JSON.parse(reader.result));
						GuiState.simulation = simulation;
						alert("Simulation data loaded from JSON file.");
					}
					catch(e)
					{
						alert("Failed to load simulation from JSON.");
					}
				};
				reader.readAsText(files[0]);
			}
		});
	}

	/**
	 * Export full simulation data and state into a JSON file.
	 */
	exportSimulation()
	{
		try
		{
			FileUtils.writeFile("simulation.json", JSON.stringify(GuiState.simulation.toJSON()));
		}
		catch(e)
		{
			alert("Failed to write simulation state to JSON.");
			console.error("COVID-19: Failed to export simulation.", e);
		}
	}

	/**
	 * Run a number of step in the simulation.
	 */
	step()
	{
		let time = performance.now();
		GuiState.simulation.step();
		GuiState.updateCharts();
		let delta = performance.now() - time;
		console.log("COVID-19: Simulation step finished. Took " + delta + " ms.");
	}

	/**
	 * Reset the state of the simulation.
	 */
	reset()
	{
		GuiState.simulation.reset();
		GuiState.updateCharts();
	}

	render()
	{
		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Simulation</Typography>
					<br/>
					<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
						<Button onClick={this.step}>Step</Button>
						<Button onClick={this.reset}>Reset</Button>
						<Button onClick={this.importSimulation}>Import</Button>
						<Button onClick={this.exportSimulation}>Export</Button>
					</ButtonGroup>
				</div>
			</Card>
		);
	}
}

export {SimulationCard};
