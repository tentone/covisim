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
}

/**
 * Governor steps each couple of days to adjust the measure taken to control the virus.
 *
 * This method should be called every day.
 */
Governor.prototype.step = function() {
	if(this.frequency % this.days === 0)
	{
		// TODO <ADD CODE HERE>
	}

	this.days++;
};
