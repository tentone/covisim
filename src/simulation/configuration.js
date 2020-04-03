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
		population: 13e6,

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
		dailyVisits: 0, // 1e4,

		// How many people a foreign person contacts with
		dailyContact: 25,

		// Probability of person being infected (0.01%)
		infectedProbability: 0.001,

		// Probability of person being infected w/o symptoms (0.1%)
		infectedNoSymptomsProbability: 0.01,
	};

	// Population movement
	this.movement = {
		// How many people one people contacts with per day
		peopleContact: 25,

		// Percentage of people in contact that are outside of the district.
		outsideContact: 0.1,
	};

	// Disease configuration
	this.disease = {
		// Transmission probability while showing no symptoms (according to "statista" show be around 1.5%)
		transmissionNoSymptoms: 0.015,

		// Transmission probability while showing symptoms (according to "statista" show be around 3.5%)
		transmission: 0.035,

		// Transmission probability variation to people that have recovered
		transmissionRecovered: 0.0,

		// Probability of starting showing symptoms (applied on daily basis).
		symptomsProbability: 0.07,

		// Probability of death (applied when the person gets infected)
		deathProbability: 0.1,

		// Minimum time to recovery
		recoveryMinimumTime: 8,

		// Probability of recovery today after being infected (applied on daily basis)
		recoveryDailyProbability: 0.01,

		// Probability of death today after being infected (applied on daily basis)
		deathDailyProbability: 0.08,
	};

	// Hospital configuration
	this.hospital = {
		// Total hospital capacity
		capacity: 10000,

		// Hospital treatment ratio (death probability divided by this value if beds are available)
		effectiveness: 1.5
	};

	// Measures adopted to control the disease
	this.measures = {
		// Limit all kind of movement outside of home
		limitMovement: 0.0,

		// Infected people movement restriction (how much is reduced)
		limitInfectedMovement: 0.0,

		// Restrict movement between districts (how much is reduced) applied to the district percentage
		limitCrossDistrictMovement: 0.0,

		// Limit foreign visitors (close airports, etc)
		limitForeigners: 0.0,

		// Reduce transmission probability (masks, disinfection, etc)
		reduceTransmission: 0.0,

		// Increase capacity of the hospital (extra number of beds)
		hospitalExtraCapacity: 0,
	};
}

export {Configuration};
