import {Person} from "./person";

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
	this.cache = null;

	// Block level name (useful for debug purposes)
	this.name = name ||  "";

	// Parent block
	this.parent = null;

	// Child blocks are the lower organizational levels of the block
	this.children = [];

	// People inside of this simulation block.
	this.people = [];
}

/**
 * Represents a cache of a block level, contains data of all blocks bellow.
 *
 * @constructor
 */
function BlockCache()
{
	// People from all levels bellow (including from this block level)
	this.people = [];

	// All blocks bellow this level.
	this.blocks = null;
}

/**
 * Build caches with reference to all elements in the levels bellow.
 */
Block.prototype.buildCache = function()
{
	this.traverse(undefined, function(block)
	{
		block.cache = new BlockCache();
		block.cache.people = block.getAllPeople();
	});
};

/**
 * Add sub block to this block.
 */
Block.prototype.addSubBlock = function(block)
{
	block.parent = this;
	this.children.push(block);
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

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].traverse(onPeople, onBlock);
	}
};

/**
 * Serialize block and all sub-blocks data into a JSON object.
 *
 * Method is called recursively for each one of the children.
 */
Block.prototype.toJSON = function()
{
	var data = {
		name: this.name,
		people: [],
		children: [],
	};

	for(var i = 0; i < this.children.length; i++)
	{
		data.children.push(this.children[i].toJSON());
	}

	for(var i = 0; i < this.people.length; i++)
	{
		data.people.push(this.people[i].toJSON());
	}

	return data;
};

/**
 * Load state data from JSON file.
 */
Block.prototype.fromJSON = function(data)
{
	this.name = data.name;

	for(var i = 0; i < data.children.length; i++)
	{
		var block = new Block();
		block.fromJSON(data.children[i]);
		this.addSubBlock(block);
	}

	for(var i = 0; i < data.people.length; i++)
	{
		var person = new Person();
		person.fromJSON(data.people[i]);
		this.addPerson(person);
	}
};

export {Block};
