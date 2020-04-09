import React from "react";
import {Chart} from "./components/chart.jsx";
import {Global} from "../global";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

class Screen extends React.Component
{
	constructor(props) {
		super(props);

		// Sidebar size
		this.sidebarSize = "300px";

		// Sidebar size
		this.titlebarSize = "70px";
	}

	render()
	{
		return (
			<div>
				// Side bar
				<div style={{overflow: "auto",backgroundColor: "#FF0000", position: "absolute", height: "100%", width: this.sidebarSize, left: "0px", top: "0px"}}>
					<ul>
						{Global.database.countries.map(function(item) {
							return <li key={item.code}>{item.name}</li>;
						})}
					</ul>
				</div>
				// Title bar
				<div style={{backgroundColor: "#a5acff", position: "absolute", height: this.titlebarSize, width: "calc(100% - " + this.sidebarSize + ")", right: "0px", top: "0px"}}>
					<Typography variant="h3">Title</Typography>
				</div>
				// Content
				<div style={{backgroundColor: "#00FF00", position: "absolute", height: "calc(100% - " + this.titlebarSize + ")", width: "calc(100% - " + this.sidebarSize + ")", right: "0px", bottom: "0px"}}>
					<AppBar position="static">
						<Tabs value={0} aria-label="simple tabs example">
							<Tab label="Chart"/>
							<Tab label="Country"/>
						</Tabs>
					</AppBar>
				</div>
			</div>
		);
	}
}

export {Screen};
