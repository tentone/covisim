import {Global} from "../global";
import React from "react";

function GuiState(){}

/**
 * Country selected to draw info about.
 */
GuiState.country = null;

GuiState.chart = React.createRef();

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

	GuiState.chart.current.drawCovidCases(data, GuiState.country.name, true);
};

export {GuiState};
