import {RandomUtils} from "../utils/random-utils";
import {MathUtils} from "../utils/math-utils";

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
	// Block that this person is placed in
	this.block = null;

	// Status of the person regarding its health (starts as healthy)
	this.status = PersonStatus.HEALTHY;

	// How many days the person if running in the simulation
	this.days = 0;

	// Days since the person was infected.
	this.daysInfected = 0;
}

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
 * Simulate contact between two persons. Check if person a with infect person b, based on simulation parameters.
 */
Person.prototype.contact = function(stranger, config) {
	if(stranger.status === PersonStatus.HEALTHY)
	{
		if(this.status === PersonStatus.INFECTED_NO_SYMPTOMS && RandomUtils.happens(config.disease.transmissionNoSymptoms))
		{
			stranger.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
		else if(this.status === PersonStatus.INFECTED && RandomUtils.happens(config.disease.transmission))
		{
			stranger.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
	}
};

/**
 * Simulate the daily contact with other people in the simulation world.
 */
Person.prototype.dailyMovement = function(config)
{
	// Only needs to perform if the person is not healthy
	if(this.isInfected())
	{
		// Contact with other people at home
		var peopleHome = this.block.people;
		for(var i = 0; i < peopleHome.length; i++)
		{
			this.contact(peopleHome[i], config);
		}

		// Contact with people of the same district
		var contact = MathUtils.reduction(config.movement.peopleContact, config.measures.limitMovement);

		if(this.status === PersonStatus.INFECTED)
		{
			contact = MathUtils.reduction(contact, config.measures.limitInfectedMovement);
		}

		for(var i = 0; i < contact; i++)
		{
			if(RandomUtils.happens(config.movement.outsideContact))
			{
				this.contact(RandomUtils.randomElement(this.block.parent.parent.peopleCache), config);
			}
			else
			{
				this.contact(RandomUtils.randomElement(this.block.parent.peopleCache), config);
			}
		
		}
	}
};

/**
 * Perform a step in this person life representing a day of activity.
 *
 * @param config Simulation object (to extract configuration)
 */
Person.prototype.step = function(config)
{
	// If person is death just skip it
	if(this.status === PersonStatus.DEATH)
	{
		return;
	}

	// Perform daily routine
	this.dailyMovement(config);

	// Increase people time
	this.days++;

	// Increase infection time
	if(this.status >= PersonStatus.INFECTED_NO_SYMPTOMS)
	{
		// Person starts showing symptoms
		if(this.status === PersonStatus.INFECTED_NO_SYMPTOMS && RandomUtils.happens(config.disease.symptomsProbability))
		{
			this.status = PersonStatus.INFECTED;
		}

		// Probability of dying or recovering from infection
		if(this.status === PersonStatus.INFECTED)
		{
			if(RandomUtils.happens(config.disease.recoveryProbability))
			{
				this.status = PersonStatus.RECOVERED;
			}
			else if(RandomUtils.happens(config.disease.deathProbability))
			{
				this.status = PersonStatus.DEATH;
			}
		}

		// Increment days since it was infected
		this.daysInfected++;
	}
};

export {Person, PersonStatus};
