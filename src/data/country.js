function Country(code, codeSimple, name)
{
	this.code = code;
	this.codeSimple = codeSimple;
	this.name = name;
	this.continent = null;
	this.latitude = null;
	this.longitude = null;
	this.population = 0;
	this.averageAge = 0;
}

export {Country};
