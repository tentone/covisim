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

	// Lockdown stage
	this.stage = 0;
}

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

		// Emergency First Stage (PT)
		if(this.stage === 0 && raw.infected > 10) {
			config.measures.limitMovement = 0.5;
			config.measures.limitInfectedMovement = 0.8;
			config.measures.limitCrossDistrictMovement = 0.5;
			config.measures.limitForeigners = 0.6;
			this.stage++;
		}

		// Emergency Second Stage (PT)
		if(this.stage === 1 && raw.deaths > 100) {
			config.measures.limitMovement = 0.6;
			config.measures.limitInfectedMovement = 0.9;
			config.measures.limitCrossDistrictMovement = 0.8;
			config.measures.limitForeigners = 0.9;
			this.stage++;
		}

		this.last = diff;
	}

	this.days++;
};

export {Governor};
