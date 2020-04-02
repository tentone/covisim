/**
 * Contains test utils mostly used for experiments and value testing.
 */
function TestUtils() {}

/**
 * Test how many iterations in average it takes in average for a event of probability to happen.
 *
 * @param probability Event probability.
 * @param iterations How many tests to execute to obtain the average value.
 * @returns {number} Average iterations until event happens.
 */
TestUtils.averageRandomEventIterations = function (probability, iterations)
{
	var results = [];

	for(var i = 0; i < iterations; i++)
	{
		var d = 0;
		while(true)
		{
			if(Math.random() < probability)
			{
				results.push(d);
				break;
			}
			d++;
		}
	}

	return results.reduce((a, b) => a + b, 0) / results.length;
};

export {TestUtils};
