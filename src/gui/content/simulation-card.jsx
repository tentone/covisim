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
import TextField from "@material-ui/core/TextField";

class SimulationCard extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Simulation</Typography>

					<br/>
					
					<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
						<Button onClick={function() {
							GuiState.simulation.step();
						}}>Step</Button>

						<Button onClick={function() {
							GuiState.simulation.reset();
						}}>Reset</Button>

						<Button onClick={function()
						{
							FileUtils.chooseFile(function (files){
								if(files.length > 0)
								{
									var reader = new FileReader();
									reader.onload = function()
									{
										try
										{
											var simulation = new Simulation();
											simulation.fromJSON(JSON.parse(reader.result));
											GuiState.simulation = simulation;
										}
										catch(e)
										{
											alert("Failed to load simulation from JSON.");
										}
									};
									reader.readAsText(files[0]);
								}
							});
						}}>Import</Button>

						<Button onClick={function()
						{
							try
							{
								FileUtils.writeFile("simulation.json", GuiState.simulation.toJSON());
							}
							catch(e)
							{
								alert("Failed to write simulation sate to JSON.");
							}
						}}>Export</Button>
					</ButtonGroup>
				</div>
			</Card>
		);
	}
}

export {SimulationCard};
