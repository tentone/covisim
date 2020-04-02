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
	this.frequency = 5;

	// Number of days of the governor in the simulation.
	this.days = 0;

	// Last values for reference
	this.last = null;
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

		// Emergency state
		/*if(raw.infected > 50) {
			config.measures.limitMovement = 0.5;
			config.measures.limitInfectedMovement = 0.5;
			config.measures.limitCrossDistrictMovement = 0.5;
			config.measures.limitForeigners = 0.5;
		}*/

		this.last = diff;
	}

	this.days++;
};

export {Governor};
