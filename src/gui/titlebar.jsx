import React from "react";
import Typography from "@material-ui/core/Typography";

class Titlebar extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		return (
			<div style={this.props.style}>
				<Typography style={{margin: "10px"}} variant="h5">COVID-19 Simulation</Typography>
			</div>
		);
	}
}

export {Titlebar};
