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
	this.day = 0;

	// Day when the person was infected
	this.dayInfection = -1;

	// Indicates if the person is in the hospital.
	this.inHospital = false;

	// Indicates if the person is going to die because of the infection.
	this.goingToDie = false;

	// Person age will affect its death probability and recovery rate
	this.age = 0;
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
Person.prototype.contact = function(stranger, simulation, config)
{
	// Healthy people can ge the virus easily
	if(stranger.status === PersonStatus.HEALTHY)
	{
		if(this.status === PersonStatus.INFECTED_NO_SYMPTOMS && RandomUtils.happens(MathUtils.reduction(config.disease.transmissionNoSymptoms, config.measures.reduceTransmission)))
		{
			stranger.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
		else if(this.status === PersonStatus.INFECTED && RandomUtils.happens(MathUtils.reduction(config.disease.transmission, config.measures.reduceTransmission)))
		{
			stranger.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
	}
	// Recovered people have lower probability of getting the virus again (but there is some probability of happening).
	else if(config.disease.transmissionRecovered > 0.0 && stranger.status === PersonStatus.RECOVERED)
	{
		if(this.status === PersonStatus.INFECTED_NO_SYMPTOMS && RandomUtils.happens(config.disease.transmissionRecovered * MathUtils.reduction(config.disease.transmissionNoSymptoms, config.measures.reduceTransmission)))
		{
			stranger.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
		else if(this.status === PersonStatus.INFECTED && RandomUtils.happens(config.disease.transmissionRecovered * MathUtils.reduction(config.disease.transmission, config.measures.reduceTransmission)))
		{
			stranger.status = PersonStatus.INFECTED_NO_SYMPTOMS;
		}
	}
};

/**
 * Simulate the daily contact with other people in the simulation world.
 */
Person.prototype.dailyMovement = function(simulation, config)
{
	// Only needs to perform if the person is not healthy
	if(this.isInfected())
	{
		// Contact with other people at home
		var peopleHome = this.block.people;
		for(var i = 0; i < peopleHome.length; i++)
		{
			this.contact(peopleHome[i], simulation, config);
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
				this.contact(RandomUtils.randomElement(this.block.parent.parent.cache.people), simulation, config);
			}
			else
			{
				this.contact(RandomUtils.randomElement(this.block.parent.cache.people), simulation, config);
			}
		}
	}
};

/**
 * Perform a step in this person life representing a day of activity.
 *
 * @param simulation Simulation environment where the person is placed.
 * @param config Configuration of the simulation.
 */
Person.prototype.step = function(simulation, config)
{
	// If person is death just skip it
	if(this.status === PersonStatus.DEATH)
	{
		return;
	}

	// Perform daily routine
	this.dailyMovement(simulation, config);

	// Increase people time
	this.day++;

	// Person starts showing symptoms
	if(this.status === PersonStatus.INFECTED_NO_SYMPTOMS)
	{
		if(RandomUtils.happens(config.disease.symptomsProbability))
		{
			this.status = PersonStatus.INFECTED;
			this.dayInfection = this.day;

			// Try to get in the hospital (if there is space available)
			this.tryHospital(simulation, config);

			// Determine if the person is going to die
			var deathProbability = this.inHospital ? (config.disease.deathProbability / config.hospital.effectiveness) : config.disease.deathProbability;
			this.goingToDie = RandomUtils.happens(deathProbability);
		}
	}
	// Probability of dying or recovering from infection
	else if(this.status === PersonStatus.INFECTED)
	{
		// Check if dies today
		if(this.goingToDie)
		{
			if(RandomUtils.happens(config.disease.deathDailyProbability))
			{
				this.status = PersonStatus.DEATH;
				this.leaveHospital(simulation, config);
			}
		}
		// Check if recoveries today
		else
		{
			if(((this.day - this.dayInfection) > config.disease.recoveryMinimumTime) && RandomUtils.happens(config.disease.recoveryDailyProbability))
			{
				this.status = PersonStatus.RECOVERED;
				this.leaveHospital(simulation, config);
			}
		}
	}
};

/**
 * Person try to enter in the hospital (check the limit of the hospital before).
 *
 * @param simulation
 * @param config
 */
Person.prototype.tryHospital = function(simulation, config)
{
	if(!this.inHospital && (simulation.hospital < (config.hospital.capacity + config.measures.hospitalExtraCapacity)))
	{
		simulation.hospital++;
		this.inHospital = true;
	}
};

/**
 * Leave the hospital (after recovery or death).
 *
 * @param simulation
 * @param config
 */
Person.prototype.leaveHospital = function(simulation, config)
{
	if(this.inHospital)
	{
		simulation.hospital--;
		this.inHospital = false;
	}
};

export {Person, PersonStatus};
