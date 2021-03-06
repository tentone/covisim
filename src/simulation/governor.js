/**
 * Governor applies measures to increase hospital capacity, increase transmission protection, etc.
 *
 * It controls the simulation parameters to prevent the disease.
 *
 * @constructor
 */
function Governor()
{
	// Actuation frequency of the governor in days. It takes action each n days.
	this.frequency = 3;

	// Number of days of the governor in the simulation.
	this.days = 0;

	// Last values for reference
	this.last = null;

	// Governor storage data
	this.data = {};

	// Governor JS code used control the governor behavior.
	this.code = "";
}

/**
 * Method where the governor analyses data and applies measures.
 *
 * @param raw Raw actual epidemic data.
 * @param diff Diff compared to last analysis.
 * @param config Current measures applied by the governor.
 */
Governor.prototype.act = function(raw, diff, config)
{
	/*
	// Emergency First Stage
	if(this.lockdownStage === 0) {
		config.measures.limitMovement = 0.7;
		config.measures.limitInfectedMovement = 0.8;
		config.measures.limitCrossDistrictMovement = 0.5;
		config.measures.limitForeigners = 0.7;
		config.measures.hospitalExtraCapacity += 5000;
		this.lockdownStage++;
	}

	// Emergency First Stage
	if(this.lockdownStage === 1 && raw.deaths > 100) {
		config.measures.limitMovement = 0.8;
		config.measures.limitInfectedMovement = 0.9;
		config.measures.limitCrossDistrictMovement = 0.7;
		config.measures.limitForeigners = 0.9;
		config.measures.reduceTransmission = 0.3;
		config.measures.hospitalExtraCapacity += 5000;
		this.lockdownStage++;
	}
	*/
};

/**
 * Governor steps each couple of days to adjust the measure taken to control the virus.
 *
 * This method should be called every day.
 */
Governor.prototype.step = function(simulation, config)
{
	if(this.days === 0)
	{
		this.last = simulation.data[simulation.data.length - 1];
	}
	else if(this.days % this.frequency === 0)
	{
		var raw = simulation.data[simulation.data.length - 1];
		var diff = raw.diff(simulation.data[simulation.data.length - (this.frequency)]);
		this.act(raw, diff, config);
		this.last = diff;
	}

	this.days++;
};

/**
 * Load governor state data from JSON file.
 */
Governor.prototype.fromJSON = function(data)
{
	// TODO <ADD CODE HERE>
};

/**
 * Store governor state and results into a JSON object.
 */
Governor.prototype.toJSON = function()
{
	// TODO <ADD CODE HERE>
	return null;
};

export {Governor};
