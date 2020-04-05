/**
 * Structure to store population age data.
 *
 * @param min Min age range of this entry.
 * @param max Max age range of this entry.
 * @param percentage Percentage of population in this Age range.
 */
function AgeRange(min, max, percentage)
{
	// Min age range of this entry.
	this.min = min;

	// Max age range of this entry.
	this.max = max;

	// Percentage of population in this category
	this.percentage = percentage;
}

/**
 * Receives an array of age range values and calculates a age based on the distribution probability.
 *
 * These are assumed to be sorted by age e.g (0-10, 10-20, etc)
 *
 * @param ranges Array of age ranges.
 * @return Age randomly generated based on the distribution provided.
 */
AgeRange.randomAge = function(ranges)
{
	var random = Math.random() * 100;
	var sum = 0;

	// Iterate over sorted range values
	for(var i = 0; i < ranges.length; i++)
	{
		sum += ranges[i].percentage;

		// Check if random generated number corresponds to the range
		if(random <= sum)
		{
			// Calculate linear interpolation inside of the age range
			var min = sum - ranges[i].percentage;
			var linear = (random - min) / ranges[i].percentage;

			// Calculate age
			var ageRange = ranges[i].max - ranges[i].min;
			return (linear * ageRange) + ranges[i].min;
		}
	}

	return null;
};

export {AgeRange};
