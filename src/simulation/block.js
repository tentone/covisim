/**
 * Simulation block is a level of organization. Can be a country, district, city etc.
 *
 * When running the simulation these blocks perform their level of the simulation.
 *
 * Contains other blocks inside of it, leaf blocks contain people.
 *
 * @constructor
 */
function Block(name) {
	// Cache of all person in this level and bellow
	this.peopleCache = [];

	// Block level name (useful for debug purposes)
	this.name = name ||  "";

	// Parent block
	this.parent = null;

	// Child blocks are the lower organizational levels of the block
	this.subBlocks = [];

	// People inside of this simulation block.
	this.people = [];
}

/**
 * Add sub block to this block.
 */
Block.prototype.addSubBlock = function(block)
{
	block.parent = this;
	this.subBlocks.push(block);
};

/**
 * Add person to this block.
 */
Block.prototype.addPerson = function(person)
{
	person.block = this;
	this.people.push(person);
};

/**
 * Get all people inside of this block.
 */
Block.prototype.getAllPeople = function()
{
	let people = [];

	this.traverse(function(person) {
		people.push(person);
	});

	return people;
};

/**
 * Traverse block elements and all sub block elements.
 *
 * @param onPeople
 * @param onBlock
 */
Block.prototype.traverse = function(onPeople, onBlock)
{
	// People callback
	if(onPeople !== undefined)
	{
		for(var i = 0; i < this.people.length; i++)
		{
			onPeople(this.people[i]);
		}
	}

	// Sub-block callback
	if(onBlock !== undefined)
	{
		onBlock(this);
	}

	for(var i = 0; i < this.subBlocks.length; i++)
	{
		this.subBlocks[i].traverse(onPeople, onBlock);
	}
};

export {Block};
