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
import {Global} from "../../global";
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
		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Country</Typography>

					<form noValidate autoComplete="off">
						<TextField label="Name"/>
						<TextField label="Code"/>
						<TextField label="Code Alt."/>
						<TextField label="Population"/>
						<TextField label="Capital"/>
						<TextField label="Continent"/>
						<TextField label="Currency"/>
					</form>

					<br/>

					<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
						<Button onClick={() => {this.exportCountry();}}>Export</Button>
					</ButtonGroup>
				</div>
			</Card>
		);
	}
}

export {CountryCard};
