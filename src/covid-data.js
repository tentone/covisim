import {FileUtils} from "./utils/file-utils";
import CSV from "csv-js";

/**
 * Stores data for the covid 19 disease on a daily basis.
 */
function CovidData(date, day)
{
	/**
	 * Day of the data since the first case in the country.
	 */
	this.day = day;

	/**
	 * Date of this data entry, stored as a Date object.
	 */
	this.date = date;

	/**
	 * Total number of currently infected people.
	 */
	this.infected = null;

	/**
	 * Amount of people that recovered.
	 */
	this.recovered = null;

	/**
	 * Number of deaths cause by the virus.
	 */
	this.deaths = null;

	/**
	 * Suspect cases waiting for test results/isolated.
	 */
	this.suspects = null;
}

// Read covid 19 data from CSSE (Global data)
CovidData.getCSSE = function() {
	// https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv
	// https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv
};


// Read covid 19 data from DSSG-PT (official Portuguese data)
CovidData.getDSSGPT = function() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", true);
	var rows = CSV.parse(data);
	var cases = [];

	for(var i = 1; i < rows.length; i++)
	{
		var values = rows[i][0].split("-");
		var date = new Date(Number.parseInt(values[2]), Number.parseInt(values[1]) - 1, Number.parseInt(values[0]));
		var data = new CovidData(date, i - 1);
		data.infected = Number.parseInt(rows[i][2]);
		data.recovered = Number.parseInt(rows[i][12]);
		data.deaths = Number.parseInt(rows[i][13]);
		data.suspects = Number.parseInt(rows[i][17]);
		cases.push(data);
	}

	return cases;
};

// Italia Covid 19 data (official Italian data)
CovidData.getPCMDPCITA = function() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv", true);
	var rows = CSV.parse(data);
	var cases = [];

	for(var i = 1; i < rows.length; i++)
	{
		var date = new Date(rows[i][0]);
		var data = new CovidData(date, i - 1);
		data.infected = Number.parseInt(rows[i][10]);
		data.recovered = Number.parseInt(rows[i][8]);
		data.deaths = Number.parseInt(rows[i][9]);
		data.suspects = Number.parseInt(rows[i][11]);
		cases.push(data);
	}

	 return cases;
};

export {CovidData};
