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
			<div style={{margin: "6px"}}>
				<Typography variant="h4">Title</Typography>
			</div>
		);
	}
}

export {Titlebar};
