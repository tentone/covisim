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
	 * Total number of covid cases in the country.
	 */
	this.cases = null;

	/**
	 * Number of currently infected people.
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

/**
 * Calculate the diff between two days of covid data.
 *
 * Assuming this to be the most recent data. Returns a new CovidData object with the diff values.
 */
CovidData.prototype.diff = function(last)
{
	var diff = new CovidData(this.date, this.day - last.day);
	diff.infected = this.infected - last.infected;
	diff.recovered = this.recovered - last.recovered;
	diff.deaths = this.deaths - last.deaths;
	diff.suspects = this.suspects - last.suspects;
	return diff;
};

/**
 * Multiply data fields by a scalar (useful to compare data from different countries).
 *
 * They are rounded to the closest integer.
 *
 * @param scalar Scalar value.
 */
CovidData.prototype.multiplyScalar = function(scalar)
{
	this.infected = Math.round(this.infected * scalar);
	this.recovered = Math.round(this.recovered * scalar);
	this.deaths = Math.round(this.deaths * scalar);
	this.suspects = Math.round(this.suspects * scalar);
};

export {CovidData};
