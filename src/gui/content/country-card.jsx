import React from "react";
import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {GuiState} from "../gui-state";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {FileUtils} from "../../utils/file-utils";
import Divider from "@material-ui/core/Divider";
import clone from "lodash.clone";

class CountryCard extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		if(GuiState.countries.length > 0)
		{
			let elements = [];

			for(let i = 0; i < GuiState.countries.length; i++)
			{
				elements.push(<Card key={GuiState.countries[i].code} style={{margin:"20px"}}>
					<div style={{margin:"20px"}}>
						<Typography variant="h6">Country</Typography>

						<form style={{pointerEvents: "none"}} noValidate autoComplete="off">
							<TextField style={{marginBottom:"5px"}} fullWidth label="Name" defaultValue={GuiState.countries[i].name}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Code" defaultValue={GuiState.countries[i].code}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Code Alt." defaultValue={GuiState.countries[i].codeAlt}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Population" defaultValue={GuiState.countries[i].population}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Capital" defaultValue={GuiState.countries[i].capital}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Continent" defaultValue={GuiState.countries[i].continent}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Currency" defaultValue={GuiState.countries[i].currency}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Latitude" defaultValue={GuiState.countries[i].latitude}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Longitude" defaultValue={GuiState.countries[i].longitude}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Age 1-14 " defaultValue={Math.round(GuiState.countries[i].age[0].percentage) + "%"}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Age 15-65" defaultValue={Math.round(GuiState.countries[i].age[1].percentage) + "%"}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Age 65+" defaultValue={Math.round(GuiState.countries[i].age[2].percentage) + "%"}/>
						</form>
						<br/>
						<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
							<Button onClick={() => {FileUtils.writeFile(GuiState.countries[i].code.toLowerCase() + ".json", GuiState.countries[i]);}}>Export</Button>
							<Button onClick={() => {
								GuiState.simulation.config.world.population = GuiState.countries[i].population;
								GuiState.simulation.config.world.ageDistribution = clone(GuiState.countries[i].age);
								GuiState.simulationCard.current.forceUpdate();
							}}>Copy to Simulation</Button>
						</ButtonGroup>
					</div>
				</Card>);
				elements.push(<Divider key={GuiState.countries[i].codeAlt} style={{margin:"20px"}}/>);
			}

			return elements;
		}

		return null;
	}
}

export {CountryCard};
