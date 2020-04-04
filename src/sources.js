import {FileUtils} from "./utils/file-utils";
import {CovidData} from "./database/covid-data";
import CSV from "csv-js";

/**
 * Method to fetch data from different data sources associated with the covid 19 disease.
 */
function Sources() {}

/**
 * Update covid 19 data from CSSE (Global data)
 */
Sources.fetchCSSE = function() {
	var infected = FileUtils.readFile("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", true);
	infected = CSV.parse(infected);

	var deaths = FileUtils.readFile("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv", true);
	deaths = CSV.parse(deaths);

	var recovered = FileUtils.readFile("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv", true);
	recovered = CSV.parse(recovered);

	console.log(infected, deaths, recovered);
};

/**
 * Update covid 19 data from DSSG-PT (official Portuguese data)
 */
Sources.fetchDSSGPT = function(database)
{
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

	database.storeCovidCases("PRT", cases);
};

/**
 * Italia Covid 19 data (official Italian data)
 */
Sources.fetchPCMDPCITA = function(database)
{
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

	database.storeCovidCases("ITA", cases);
};

export {Sources};
