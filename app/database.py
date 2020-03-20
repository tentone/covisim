import peewee

# SQLite database stored in a file
#
# All data gets stored here and uploaded periodically to git.
db = peewee.SqliteDatabase("database.db")

# Countries data include metadata about the country.
class Country(peewee.Model):
	class Meta:
		database = db
		table_name = "country"

	# Country code as defined in ISO 3166-1 3 characters.
	id = peewee.FixedCharField(primary_key=True, max_length=3)

	# Country code (UK, PT, ES, etc) as defined in ISO 3166-1 2 characters.
	code = peewee.FixedCharField(unique=True, max_length=2)

	# Country name as used in the english language.
	name = peewee.CharField(null=False)

	# Capital name as used in the english language.
	capital = peewee.CharField(null=True)

	# Currency of the country
	currency = peewee.CharField(null=True)

	# Continent where the country is situated
	continent = peewee.CharField(null=True)

	# GPS Latitude
	latitude = peewee.DoubleField(null=True)

	# GPS longitude
	longitude = peewee.DoubleField(null=True)

	# Total amount of population of the country
	population = peewee.IntegerField(null=True)

	# Indicates the average population age
	average_age = peewee.FloatField(null=True)


# Daily data with the amount of covid cases.
#
# Data is associated to a country.
class Cases(peewee.Model):
	class Meta:
		database = db
		table_name = "cases"

	# Foreign key pointing to the country of this data
	country = peewee.ForeignKeyField(Country)

	# Date of this data
	date = peewee.DateTimeField(unique=True, null=False)

	# Total amount of identified covid cases
	infected = peewee.IntegerField(null=False)

	# Total amount of depath caused by covid
	deaths = peewee.IntegerField(null=False)

	# Amount of people that recovered from covid
	recovered = peewee.IntegerField(null=False)

	# Amount of people suspected to have covid
	suspects = peewee.IntegerField(null=True)


# Country event, measures applied change of emergency state in the country.
class Events(peewee.Model):
	class Meta:
		database = db
		table_name = "events"

	# Foreign key pointing to the country of this data
	country = peewee.ForeignKeyField(Country)

	# Type of the event
	type = peewee.IntegerField(null=False)

	# Estimated impact of the event in the virus evolution
	#
	# (e.g -0.1 should prevent 10% of covid cases, 0 means no impact)
	impact = peewee.FloatField(null=False)

	# Description of the event
	description = peewee.CharField(null=True)

# Connect to the database and create the tables if necessary
def connect():
	db.connect()
	db.create_tables([Country, Cases, Events])
