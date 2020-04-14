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
		population: 10000, //13e6,

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
		dailyVisits: 1e5,

		// How many people a foreign person contacts with
		dailyContact: 20,

		// Probability of person being infected (0.01%)
		infectedProbability: 0.0001,

		// Probability of person being infected w/o symptoms (0.1%)
		infectedNoSymptomsProbability: 0.001,
	};

	// Population movement
	this.movement = {
		// How many people one people contacts with per day
		peopleContact: 50,

		// Percentage of people in contact that are outside of the district.
		outsideContact: 0.3,
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
		symptomsProbability: 0.06,

		// Probability of death based on age (applied when the person gets infected)
		deathProbability: [
			{min: 0, max: 9, rate: 0.002},
			{min: 10, max: 19, rate: 0.003},
			{min: 20, max: 29, rate: 0.002},
			{min: 30, max: 39, rate: 0.004},
			{min: 40, max: 49, rate: 0.006},
			{min: 50, max: 59, rate: 0.02},
			{min: 60, max: 69, rate: 0.05},
			{min: 70, max: 79, rate: 0.1},
			{min: 80, max: 200, rate: 0.2},
		],

		// Time until the person recovers
		recoveryTime: {
			// Minimum time to recovery
			min: 8,

			// Probability of recovery today after being infected
			dailyProbability:  0.01,
		},

		// Time until the person dies
		deathTime: {
			// Minimum time to die
			min: 1,

			// Probability of dying today after being infected
			dailyProbability:  0.08,
		},
	};

	// Hospital configuration
	this.hospital = {
		// Total hospital capacity
		capacity: 5000,

		// Hospital treatment ratio (death probability divided by this value if beds are available)
		effectiveness: 1.5
	};

	// Measures adopted to control the disease
	this.measures = {
		// Limit all kind of movement outside of home
		limitMovement: 0.0,

		// Infected people movement restriction (how much is reduced relative to regular people)
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
