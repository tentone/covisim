import "chart.js";
import {FileUtils} from  "utils/file-utils.js";
import CSV from "csv-js";
import {Country} from "./country";

window.initialize = function() {
	var countries = getCountries();
	getCountriesPopulation(countries);
	getCountriesAge(countries);

	console.log(countries);

	readDSSGPTData();
	readPCMDPCITA();

	/*
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	var chart = new Chart(context, {
		type: 'doughnut',
		data: {},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});*/
}

/**
 * Get list of countries using data from datahub.
 */
function getCountries() {
	var data = FileUtils.readFile("https://datahub.io/core/country-codes/r/country-codes.csv", true);
	var rows = CSV.parse(data);
	var countries = [];

	for(var i = 1; i < rows.length; i++)
	{
		var country = new Country();
		country.code = rows[i][7];
		country.name = rows[i][2];
		country.codeAlt = rows[i][6];
		country.currency = rows[i][9];
		country.continent = rows[i][29];
		country.capital = rows[i][28];
		countries.push(country);
	}

	return countries;
}

/**
 * Get list of countries population as of 2016.
 */
function getCountriesPopulation(countries) {
	var data = FileUtils.readFile("https://datahub.io/JohnSnowLabs/population-figures-by-country/r/population-figures-by-country-csv.csv", true);
	var rows = CSV.parse(data);

	for(var i = 1; i < rows.length; i++)
	{
		var population = Number.parseInt(rows[i][58], 10);
		var country = rows[i][1];

		for(var j = 0; j < countries.length; j++)
		{
			if(countries[j].code === country)
			{
				countries[j].population = population;
			}
		}
	}

	return countries;
}

/**
 * Get list of countries populational age as of
 */
function getCountriesAge(countries) {
	// 0-14 Years Old
	var data = FileUtils.readFile("https://datahub.io/world-bank/sp.pop.0014.to.zs/r/data.csv", true);
	var rows = CSV.parse(data);

	console.log(rows);

	/*
	for(var i = 1; i < rows.length; i++)
	{
		var population = Number.parseInt(rows[i][58], 10);
		var country = rows[i][1];

		for(var j = 0; j < countries.length; j++)
		{
			if(countries[j].code === country)
			{
				countries[j].population = population;
			}
		}
	}
	*/

	return countries;
}

// Read covid 19 data from DSSG-PT
function readDSSGPTData() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
}

// Italia Covid 19 data
function readPCMDPCITA() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
}
