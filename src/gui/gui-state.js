import {Global} from "../global";
import React from "react";
import {Simulation} from "../simulation/simulation";
import {FileUtils} from "../utils/file-utils";

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
 * Reference to the chart element in the GUI.
 */
GuiState.chart = React.createRef();

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

	GuiState.chart.current.drawCovidCases(data, GuiState.country.name, false);
};

export {GuiState};
