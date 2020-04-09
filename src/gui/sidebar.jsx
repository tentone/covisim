import React from "react";
import {Global} from "../global";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Flag from "assets/flags/ec.png";

class Sidebar extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		return (
			<List dense={false}>
				{Global.database.countries.map(function(country) {
					return (<ListItem key={country.code}>
						<ListItemIcon>
							<img width="40" src={Flag}/>
						</ListItemIcon>
						<ListItemText primary={country.name} secondary={country.code}/>
					</ListItem>);
				})}
			</List>
		);
	}
}

export {Sidebar};
