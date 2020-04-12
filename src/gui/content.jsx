import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {ChartComponent} from "./chart-component.jsx";
import {GuiState} from "./gui-state";


class Content extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		return (
			<div>
				<ChartComponent ref={GuiState.chart} style={{margin: "10px", width: "100%", height: "500px"}}/>

				<FormControl>
					<InputLabel htmlFor="my-derp">Derp</InputLabel>
					<Input id="my-derp"/>
				</FormControl>
				<br/>
				<FormControl>
					<InputLabel htmlFor="my-input">Email address</InputLabel>
					<Input id="my-input"/>
				</FormControl>
			</div>
		);
	}
}

export {Content};
