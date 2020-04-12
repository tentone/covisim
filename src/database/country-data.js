/**
 * Country stores everything related to the country, name, GPS position population data etc.
 *
 * @constructor
 */
function CountryData()
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

export {CountryData};
