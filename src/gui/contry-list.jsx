import React from "react";
import {Global} from "../global";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {GuiState} from "./gui-state";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
require.context('assets/flags', true, /\.png$/);

/**
 * Sidebar contains a list of all the countries available in the platform.
 *
 * There might not be virus data for all of them in the platform.
 */
class ContryList extends React.Component
{
	constructor(props) {
		super(props);

		/**
		 * Search text applied to filter the contries.
		 *
		 * @type {string}
		 */
		this.search = "";
	}

	getItems()
	{
		var countries = [];
		for(let i = 0; i < Global.database.countries.length; i++)
		{

		}


		var listItems = [];
		for(let i = 0; i < Global.database.countries.length; i++)
		{
			let country = Global.database.countries[i];
			let cases = Global.database.getLastCovidData(country.code);

			listItems.push((<ListItem key={country.code} button={true} onClick={function(event){GuiState.selectCountry(country.code);}}>
				<ListItemIcon>
					<img width="40" src={country.codeAlt.toLowerCase() + ".png"}/>
				</ListItemIcon>
				<ListItemText primary={country.name} secondary={country.code + " | " + (cases !== null ? cases.infected : "N/d")}/>
			</ListItem>));
		}

		return listItems;
	}

	render()
	{
		var listItems = this.getItems();

		return (
			<div>
				<Input style={{margin: "10px", width: "calc(100% - 20px)"}} startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}/>
				<div style={{width: "100%", overflow: "auto"}}>
					<List dense={false}>
						{listItems}
					</List>
				</div>
			</div>
		);
	}
}

export {ContryList};
