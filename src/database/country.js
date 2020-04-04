import CSV from "csv-js";
import Countries from '../data/countries.csv';
import Population from '../data/population.csv';
import GPS from '../data/gps.csv';
import Ages14 from '../data/ages14.csv';
import Ages1564 from '../data/ages15-64.csv';
import Ages65 from '../data/ages65.csv';
import {AgeRange} from "./age-range";

/**
 * Country stores everything related to the country, name, GPS position population data etc.
 *
 * @constructor
 */
function Country()
{
	/**
	 * 3 Digit letters country code.
	 */
	this.code = null;

	/**
	 * 2 Digit letters country code.
	 */
	this.codeAlt = null;

	/**
	 * Country name as used in English language.
	 */
	this.name = null;

	/**
	 * Continent where the country is located.
	 */
	this.continent = null;

	/**
	 * Currency used in the country (EUR, USD, etc)
	 */
	this.currency = null;

	/**
	 * Name of the country capital.
	 */
	this.capital = null;

	/**
	 * Total population of the country.
	 */
	this.population = 0;

	/**
	 * Population age distribution in percentage by age range.
	 */
	this.age = [];

	/**
	 * GPS latitude position of the country.
	 */
	this.latitude = null;

	/**
	 * GPS longitude position of the country.
	 */
	this.longitude = null;
}

/**
 * Load country list from data csv files. With metadata about these countries.
 *
 * Returns a array and a map of countries indexed by their 3 char code.
 */
Country.loadList = function(database) {
	// List of all countries
	var rows = CSV.parse(Countries);
	for(var i = 1; i < rows.length; i++)
	{
		var country = new Country();
		country.code = rows[i][7];
		country.name = rows[i][2];
		country.codeAlt = rows[i][6];
		country.currency = rows[i][9];
		country.continent = rows[i][29];
		country.capital = rows[i][28];

		database.storeCountry(country);
	}

	// Population figure by country as of 2016
	var rows = CSV.parse(Population);
	for(var i = 1; i < rows.length; i++)
	{
		var country = database.getCountry(rows[i][1]);
		if(country !== null)
		{
			country.population = Number.parseInt(rows[i][2], 10);
		}
	}

	// Country GPS location
	var rows = CSV.parse(GPS);
	for(var i = 1; i < rows.length; i++)
	{
		var country = database.getCountry(rows[i][0]);
		if(country !== null)
		{
			country.latitude = Number.parseFloat(rows[i][1]);
			country.longitude = Number.parseFloat(rows[i][2]);
		}
	}

	// Population age by category
	var rows14 = CSV.parse(Ages14);
	var rows1564 = CSV.parse(Ages1564);
	var rows65 = CSV.parse(Ages65);
	for(var i = 1; i < rows14.length; i++)
	{
		var year = Number.parseInt(rows14[i][2]);
		if(year === 2016)
		{
			var country = database.getCountry(rows14[i][1]);
			if(country !== null)
			{
				country.age.push(new AgeRange(1, 14, Number.parseFloat(rows14[i][3])));
				country.age.push(new AgeRange(15, 64, Number.parseFloat(rows1564[i][3])));
				country.age.push(new AgeRange(65, 90, Number.parseFloat(rows65[i][3])));
			}
		}
	}
};

export {Country};
