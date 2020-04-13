import {FileUtils} from "../utils/file-utils";
import {CovidData} from "../database/covid-data";
import CSV from "csv-js";

/**
 * Method to fetch data from different data sources associated with the covid 19 disease.
 */
function CovidCasesSource() {}

/**
 * Update covid 19 data from CSSE (Global data)
 */
CovidCasesSource.fetchCSSE = function(database, onLoad) {

	FileUtils.readFile("https://raw.githubusercontent.com/pomber/covid19/master/docs/timeseries.json", false, function(data)
	{
		var timeseries = JSON.parse(data);

		// Iterate all country names in the timeseries
		for(var countryName in timeseries)
		{
			// Search for country by its name
			var country = database.getCountry(countryName);
			if(country !== null)
			{
				var cases = [];
				var day = 0;
				var timedata = timeseries[countryName];

				// Read covid cases data
				for(var i = 0; i < timedata.length; i++)
				{
					// Skip entries without data
					if(timedata[i].confirmed === 0 && timedata[i].recovered === 0 && timedata[i].recovered === 0)
					{
						continue;
					}

					var entry = new CovidData(new Date(timedata[i].date), day++);
					entry.cases = timedata[i].confirmed;
					entry.recovered = timedata[i].recovered;
					entry.deaths = timedata[i].deaths;
					cases.push(entry);
				}

				database.storeCovidCases(country.code, cases);
			}

		}

		if(onLoad !== undefined)
		{
			onLoad(cases);
		}
	});
};

/**
 * Update covid 19 data from DSSG-PT (official Portuguese data)
 */
CovidCasesSource.fetchDSSGPT = function(database, onLoad)
{
	FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", false, function (data)
	{
		var rows = CSV.parse(data);
		var cases = [];

		for(var i = 1; i < rows.length; i++)
		{
			var values = rows[i][0].split("-");
			var date = new Date(Number.parseInt(values[2]), Number.parseInt(values[1]) - 1, Number.parseInt(values[0]));
			var data = new CovidData(date, i - 1);
			data.cases = Number.parseInt(rows[i][2]);
			data.recovered = Number.parseInt(rows[i][12]);
			data.deaths = Number.parseInt(rows[i][13]);
			data.suspects = Number.parseInt(rows[i][17]);
			cases.push(data);
		}

		database.storeCovidCases("PRT", cases);

		if(onLoad !== undefined)
		{
			onLoad(cases);
		}
	});
};

/**
 * Italia Covid 19 data (official Italian data)
 */
CovidCasesSource.fetchPCMDPCITA = function(database, onLoad)
{
	FileUtils.readFile("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv", false, function (data)
	{
		var rows = CSV.parse(data);
		var cases = [];

		for(var i = 1; i < rows.length; i++)
		{
			var date = new Date(rows[i][0]);
			var data = new CovidData(date, i - 1);
			data.cases = Number.parseInt(rows[i][11]);
			data.recovered = Number.parseInt(rows[i][9]);
			data.deaths = Number.parseInt(rows[i][10]);
			data.suspects = Number.parseInt(rows[i][12]);
			cases.push(data);
		}

		database.storeCovidCases("ITA", cases);

		if(onLoad !== undefined)
		{
			onLoad(cases);
		}
	});
};

export {CovidCasesSource};
