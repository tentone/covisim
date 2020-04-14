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
GuiState.countries = [];

/**
 * Draw simulation graph for comparison.
 */
GuiState.drawSimulation = true;

/**
 * Set true to compare data from different countries.
 */
GuiState.selectMultiple = false;

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
	let country = Global.database.getCountry(code);
	if(country === null)
	{
		alert("Country not found in database.");
		return;
	}

	if(!GuiState.selectMultiple)
	{
		GuiState.countries = [];
	}

	let index = GuiState.countries.indexOf(country);
	if(index === -1)
	{
		GuiState.countries.push(country);
	}
	else
	{
		GuiState.countries.splice(index, 1);
	}

	GuiState.countryCard.current.forceUpdate();
	GuiState.updateCharts();
};

/**
 * Update the graphs drawn on chart from the current country selection.
 */
GuiState.updateCharts = function()
{
	if(GuiState.countries.length === 0)
	{
		GuiState.chartCard.current.clear();
	}

	for(let i = 0; i < GuiState.countries.length; i++)
	{
		var data = Global.database.getCovidCases(GuiState.countries[i].code);
		if(data !== null)
		{
			GuiState.chartCard.current.drawCovidCases(data, GuiState.countries[i].name, i !== 0 && GuiState.selectMultiple);
		}
	}

	if(GuiState.drawSimulation)
	{
		if(GuiState.simulation.day > 0)
		{
			GuiState.chartCard.current.drawCovidCases(GuiState.simulation.data, "Simulation", true);
		}
	}

	GuiState.chartCard.current.resetZoom();
};


export {GuiState};
