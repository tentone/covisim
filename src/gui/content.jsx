import React from "react";
import {ChartComponent} from "./chart-component.jsx";
import {GuiState} from "./gui-state";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";


class Content extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		return (
			<div style={{overflow: "auto", position:"absolute", width: "100%", height:"100%"}}>
				<Card style={{margin:"20px"}}>
					<div style={{margin:"20px"}}>
						<Typography variant="h6">Chart</Typography>
						<ChartComponent ref={GuiState.chart} style={{width: "calc(100% - 20px)", height: "500px"}}/>
						<ButtonGroup onClick={GuiState.exportCountryData} variant="contained" color="primary" aria-label="contained primary button group">
							<Button >Export</Button>
						</ButtonGroup>
					</div>
				</Card>

				<Divider/>

				<Card style={{margin:"20px"}}>
					<div style={{margin:"20px"}}>
						<Typography variant="h6">Simulation</Typography>
						<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
							<Button>Import</Button>
						</ButtonGroup>
					</div>
				</Card>
			</div>
		);
	}
}

export {Content};
