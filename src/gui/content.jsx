import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

class Content extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		return (
			<AppBar position="static">
				<Tabs value={0}>
					<Tab label="Chart"/>
					<Tab label="Country"/>
				</Tabs>
			</AppBar>
		);
	}
}

export {Content};
