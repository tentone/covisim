function Simulation() {
	this.districts = 12;

	this.hospitalCapacity = 300;
	this.schoolCapacity = 200;
	this.companyCapacity = 40;
	this.familySize = 5;

	this.transmissionProbabilty = 0.3;
	this.symptomsTime = 15;
	this.treatmentTime = 9;

	this.deathProbabilityHospital = 0.2;
	this.deathProbabilityHome = 0.6;
}

/**
 * Perform a day of simulation.
 */
Simulation.prototype.next = function() {

};

export {Simulation};
