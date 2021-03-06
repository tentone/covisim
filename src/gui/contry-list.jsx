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
import {StringUtils} from "../utils/string-utils";
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
		 * Search text applied to filter the countries.
		 *
		 * @type {string}
		 */
		this.search = "";
	}

	getItems()
	{
		// Filter countries based on search text
		let countries = [];
		for(let i = 0; i < Global.database.countries.length; i++)
		{
			if(StringUtils.searchObject(this.search, Global.database.countries[i], ["name", "code"]))
			{
				countries.push(Global.database.countries[i]);
			}
		}

		// Sort based on number of cases.
		countries.sort(function (a, b) {
			const casesB = Global.database.getLastCovidData(b.code);
			if (casesB === null) {
				return -1;
			}

			const casesA = Global.database.getLastCovidData(a.code);
			if (casesA === null) {
				return 1;
			}

			return casesB.cases - casesA.cases;
		});

		// Build items list
		let listItems = [];
		for(let i = 0; i < countries.length; i++)
		{
			let country = countries[i];
			let cases = Global.database.getLastCovidData(country.code);

			listItems.push((<ListItem key={country.code} button={true} onClick={function(event){GuiState.selectCountry(country.code);}}>
				<ListItemIcon>
					<img width="40" src={country.codeAlt.toLowerCase() + ".png"}/>
				</ListItemIcon>
				<ListItemText primary={country.name} secondary={country.code + " | " + (cases !== null ? cases.cases + " Cases" : "No Cases")}/>
			</ListItem>));
		}

		return listItems;
	}

	render()
	{
		let listItems = this.getItems();

		return (
			<div style={{position:"absolute", width: "100%", height:"100%"}}>
				<Input style={{width: "calc(100% - 20px)", height: "40px", margin: "10px"}} onChange={(event) =>
				{
					this.search = event.target.value;
					this.forceUpdate();
				}} startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}/>
				<div style={{width: "100%", height: "calc(100% - 50px)", overflow: "auto"}}>
					<List dense={false}>
						{listItems}
					</List>
				</div>
			</div>
		);
	}
}

export {ContryList};
