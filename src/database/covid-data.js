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

/**
 * Generate arrays of time series data {t: Date, y: value} to be drawn into chart.
 *
 * @param data Array of covid data.
 */
CovidData.generateTimeseries = function(data)
{
	var output = {
		infected: [],
		recovered: [],
		deaths: [],
		suspects: []
	};

	for (var i = 0; i < data.length; i++) {
		output.infected.push({t: data[i].date, y: data[i].infected});
		output.recovered.push({t: data[i].date, y: data[i].recovered});
		output.deaths.push({t: data[i].date, y: data[i].deaths});
		output.suspects.push({t: data[i].date, y: data[i].suspects});
	}

	return output;
};

export {CovidData};
