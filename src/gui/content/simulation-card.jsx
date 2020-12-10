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
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import {AgeRange} from "../../database/age-range";

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
						GuiState.updateCharts();
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
	run()
	{
		let time = performance.now();
		for(let i = 0; i < this.steps; i++)
		{
			GuiState.simulation.step();
		}

		let delta = performance.now() - time;
		console.log("COVID-19: Simulation run finished. Took " + delta + " ms, for " + this.steps + " steps.");

		GuiState.updateCharts();
	}

	/**
	 * Reset the state of the simulation.
	 */
	reset()
	{
		GuiState.simulation.reset();
		console.log("COVID-19: Simulation has been reset.", GuiState.simulation);
		GuiState.updateCharts();
	}

	/**
	 * Build a configuration editor by iterating config object.
	 */
	buildForm()
	{
		function traverseAttributes(object, callback, attribute, level)
		{
			if(attribute === undefined)
			{
				attribute = "";
				level = 0;
			}

			for(let i in object)
			{
				if(object[i] instanceof Object)
				{
					traverseAttributes(object[i], callback, attribute.length === 0 ? i : attribute + '.' + i, level + 1)
				}
				else
				{
					callback(object, i, attribute.length === 0 ? i : attribute + '.' + i);
				}
			}
		}

		let elements = [];

		traverseAttributes(GuiState.simulation.config, function(object, attribute, path)
		{
			elements.push(<TextField key={path} style={{marginBottom:"5px"}} label={path} type="number" defaultValue={object[attribute]} onChange={(event) => {object[attribute] = Number.parseFloat(event.target.value);}}/>);
		});

		return elements;
	}

	render()
	{
		let elements = this.buildForm();

		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Simulation</Typography>
					<br/>
					<Typography gutterBottom>Steps p/ Iteration</Typography>
					<Slider defaultValue={1.0} step={1.0} marks min={1} max={500} valueLabelDisplay="auto" onChange={(event, value) => {this.steps = value;}}/>
					<br/>
					<Typography gutterBottom>Simulation Parameters</Typography>
					<form noValidate autoComplete="off">
						{elements}
					</form>
					<br/>
					<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
						<Button onClick={() => {this.run();}}>Run</Button>
						<Button onClick={() => {this.reset();}}>Reset</Button>
						<Button onClick={() => {this.importSimulation();}}>Import</Button>
						<Button onClick={() => {this.exportSimulation();}}>Export</Button>
					</ButtonGroup>
				</div>
			</Card>
		);
	}
}

export {SimulationCard};
