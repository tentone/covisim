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

class CountryCard extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	exportCountry()
	{
		if(GuiState.country === null)
		{
			alert("No country selected");
			return;
		}

		FileUtils.writeFile("country.json", GuiState.country);
	}

	render()
	{
		if(GuiState.country !== null)
		{
			return (
				<Card style={{margin:"20px"}}>
					<div style={{margin:"20px"}}>
						<Typography variant="h6">Country</Typography>

						<form style={{pointerEvents: "none"}} noValidate autoComplete="off">
							<TextField style={{marginBottom:"5px"}} fullWidth label="Name" value={GuiState.country.name}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Code" value={GuiState.country.code}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Code Alt." value={GuiState.country.codeAlt}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Population" value={GuiState.country.population}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Capital" value={GuiState.country.capital}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Continent" value={GuiState.country.continent}/>
							<TextField style={{marginBottom:"5px"}} fullWidth label="Currency" value={GuiState.country.currency}/>
						</form>

						<br/>

						<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
							<Button onClick={() => {this.exportCountry();}}>Export</Button>
						</ButtonGroup>
					</div>
				</Card>
			);
		}

		return null;
	}
}

export {CountryCard};
