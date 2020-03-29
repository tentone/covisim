/**
 * Simulation block is a level of organization. Can be a country, district, city etc.
 *
 * When running the simulation these blocks perform their level of the simulation.
 *
 * Contains other blocks inside of it, leaf blocks contain people.
 *
 * @constructor
 */
function Block() {
	// Parent block
	this.parent = null;

	// Child blocks are the lower organizational levels of the block
	this.subBlocks = [];

	// People inside of this simulation block.
	this.people = [];
}

/**
 * Traverse block elements and all sub block elements.
 *
 * @param onPeople
 * @param onSubBlock
 */
Block.prototype.traverse = function(onPeople, onSubBlock)
{
	if(onPeople !== undefined)
	{
		for(var j = 0; j < this.people.length; j++)
		{
			onPeople(this.people[j]);
		}
	}

	for(var i = 0; i < this.subBlocks.length; i++)
	{
		this.subBlocks[i].traverse(onPeople, onSubBlock);

		if(onSubBlock !== undefined)
		{
			onSubBlock(this.subBlocks[i]);
		}
	}
};

export {Block};
