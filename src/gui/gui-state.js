import {Global} from "../global";
import React from "react";
import {Simulation} from "../simulation/simulation";

/**
 * Stored the state of the GUI component.
 *
 * Other components call methods from this class to control the GUI.
 */
function GuiState(){}

/**
 * Simulation object used in the GUI.
 */
GuiState.simulation = new Simulation();

/**
 * Country selected to draw info about.
 */
GuiState.country = null;

/**
 * Set true to compare data from different countries.
 */
// TODO <NOT IN USE>
GuiState.compareCountries = false;

/**
 * Reference to the chart element in the GUI.
 */
GuiState.chartCard = React.createRef();

/**
 * Reference to the country card element in the GUI.
 */
GuiState.countryCard = React.createRef();

/**
 * Select country to be displayed on the GUI.
 *
 * @param code
 */
GuiState.selectCountry = function(code)
{
	GuiState.country = Global.database.getCountry(code);
	if(GuiState.country === null)
	{
		alert("Country not found in database.");
		return;
	}

	var data = Global.database.getCovidCases(code);
	if(data === null)
	{
		alert("No Covid 19 data available for this country.");
		return;
	}

	GuiState.countryCard.current.forceUpdate();
	GuiState.chartCard.current.drawCovidCases(data, GuiState.country.name, false);
};

export {GuiState};
