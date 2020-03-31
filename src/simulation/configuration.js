/**
 * Stored the simulation configuration.
 *
 * @constructor
 */
function Configuration() {
	// World configuration
	this.world = {
		// Start date of simulation
		startDate: new Date(),

		// Population of the simulation
		population: 10e6,

		// Number of districts (cities or provinces) in the simulation
		districts: 156,

		// Family size
		familySize: 5
	};

	// Start conditions for the simulation
	this.start = {
		// Number of people infected at the beginning of the simulation
		infectedNoSymptoms: 0,

		// Number of people infected at the beginning of the simulation
		infected: 1
	};

	// Foreign visit configuration (from outside the country, into a district)
	this.foreign = {
		// Number of foreign visitors daily
		dailyVisits: 1000,

		// How many people a foreign person contacts with
		dailyContact: 50,

		// Probability of person being infected (0.01%)
		infectedProbability: 0.00001,

		// Probability of person being infected w/o symptoms (0.1%)
		infectedNoSymptomsProbability: 0.0001,
	};

	// Population movement
	this.movement = {
		// How many people one people contacts with per day
		peopleContact: 100,

		// Percentage of people in contact that are outside of the district.
		outsideContact: 0.1,
	};

	// Disease configuration
	this.disease = {
		// Transmission configuration
		transmissionNoSymptoms: 0.001,

		// Transmission probability
		transmission: 0.03,

		// Probability of starting showing symptoms (applied on daily basis)
		symptomsProbability: 0.06,

		// Probability of recovery after being infected (applied on daily basis)
		recoveryProbability: 0.015,

		// Probability of death (applied on daily basis)
		deathProbability: 0.01,
	};

	// Hospital configuration
	this.hospital = {
		// Total hospital capacity
		capacity: 1000, // TODO <NOT BEING USED>

		// Hospital treatment ratio (applied to increase recovery probability and reduce death probability)
		effectivenessRatio: 2.0 // TODO <NOT BEING USED>
	};

	// Measures adopted to control the disease
	this.measures = {
		// Limit all kind of movement outside of home
		limitMovement: 0.0,

		// Infected people movement restriction (how much is reduced)
		limitInfectedMovement: 0.0,

		// Restrict movement between districts (how much is reduced) applied to the district percentage
		limitCrossDistrictMovement: 0.0,

		// Limit foreign visitors
		limitForeigners: 0.0,

		// Reduce transmission probability (masks, disinfection, etc)
		reduceTransmission: 0.0, // TODO <NOT BEING USED>

		// Increase capacity of the hospital (number of beds)
		hospitalCapacityIncrease: 0.0, // TODO <NOT BEING USED>

		// Improve treatment effectiveness of the hospital (ventilators, material etc)
		hospitalEffectivenessImprovement: 0.0 // TODO <NOT BEING USED>
	};
}

export {Configuration};
