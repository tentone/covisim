import React from "react";
import {Global} from "../global";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
require.context('assets/flags', true, /\.png$/);

/**
 * Sidebar contains a list of all the countries available in the platform.
 *
 * There might not be virus data for all of them in the platform.
 */
class Sidebar extends React.Component
{
	constructor(props) {
		super(props);
	}

	render()
	{
		var listItems = [];
		for(var i = 0; i < Global.database.countries.length; i++)
		{
			var country = Global.database.countries[i];
			listItems.push((<ListItem key={country.code} button={true}>
				<ListItemIcon>
					<img width="40" src={country.codeAlt.toLowerCase() + ".png"}/>
				</ListItemIcon>
				<ListItemText primary={country.name} secondary={country.code}/>
			</ListItem>));
		}

		return (
			<List dense={false}>
				{listItems}
			</List>
		);
	}
}

export {Sidebar};
