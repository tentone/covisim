import {RandomUtils} from "../utils/random-utils";

/**
 * List of possible person status.
 */
var PersonStatus = {
	HEALTHY: 0,
	INFECTED_NO_SYMPTOMS: 1,
	INFECTED: 2,
	RECOVERED: 3,
	DEATH: 4
};

/**
 * Represents a person in the simulation.
 */
function Person() {
	// Block that this person belongs to
	this.block = null;

	// Status of the person regarding its health (starts as healthy)
	this.status = PersonStatus.HEALTHY;

	// How many days the person if running in the simulation
	this.days = 0;

	// Days since the person was infected.
	this.daysInfected = 0;
}

/**
 * Simulate contact between two persons. Check if person a with infect person b, based on simulation parameters.
 */
Person.contact = function (a, b, simulation) {
	if(b.status === PersonStatus.HEALTHY)
	{
		if(a.status === PersonStatus.INFECTED_NO_SYMPTOMS && RandomUtils.happens(simulation.disease.transmissionNoSymptoms))
		{
			b.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
		else if(a.status === PersonStatus.INFECTED && RandomUtils.happens(simulation.disease.transmission))
		{
			b.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
	}
};

/**
 * Check if this person is infected (w/ or w/o symptoms).
 *
 * @returns {boolean} True if the person is infeceted.
 */
Person.prototype.isInfected = function()
{
	return this.status === PersonStatus.INFECTED_NO_SYMPTOMS || this.status === PersonStatus.INFECTED;
};

/**
 * Perform a step in this person life representing a day of activity.
 *
 * @param simulation Simulation object (to extract configuration)
 */
Person.prototype.step = function(simulation)
{
	// If person is death just skip it
	if(this.status === PersonStatus.DEATH)
	{
		return;
	}

	// Increase people time
	this.days++;

	// Increase infection time
	if(this.status >= PersonStatus.INFECTED_NO_SYMPTOMS)
	{
		this.daysInfected++;

		// Person starts showing symptoms
		if(this.status === PersonStatus.INFECTED_NO_SYMPTOMS && RandomUtils.happens(simulation.disease.symptomsProbability))
		{
			this.status = PersonStatus.INFECTED;
		}

		if(this.status === PersonStatus.INFECTED)
		{
			if(RandomUtils.happens(simulation.disease.treatmentProbability))
			{
				this.status = PersonStatus.RECOVERED;
			}
			else if(RandomUtils.happens(simulation.disease.deathProbability))
			{
				this.status = PersonStatus.DEATH;
			}
		}
	}
};

export {Person, PersonStatus};
