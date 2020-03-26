/**
 * Stored data about a country.
 *
 * @constructor
 */
function Country()
{
	this.code = null;
	this.codeAlt = null;
	this.name = null;
	this.continent = null;
	this.currency = null;
	this.capital = null;

	this.population = 0;
	this.averageAge = 0;

	this.latitude = null;
	this.longitude = null;
}

export {Country};
