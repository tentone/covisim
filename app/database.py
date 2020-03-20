import peewee
import datetime

# SQLite database
db = peewee.SqliteDatabase("database.db")


# Base database model used as a base for all the other tables.
#
# Common attributes should be placed here.
class BaseModel(peewee.Model):
	class Meta:
		database = db


# Countries data include metadata about the country.
class Country(BaseModel):
	# Country name as used in the english language.
	name = peewee.CharField(unique=True)

	# Country code (UK, PT, ES, etc) as defined in ISO 3166-1 2 characters.
	code_simple = peewee.CharField(unique=True)

	# Country code as defined in ISO 3166-1 3 characters.
	code = peewee.CharField(unique=True)

	# Currency of the country
	currency = peewee.CharField(unique=False, null=True)

	# Total amount of population of the country
	population = peewee.IntegerField(null=True)

	# Indicates the average population age
	average_age = peewee.FloatField(null=True)


# Daily data with the amount of covid cases.
#
# Data is associated to a country.
class CovidCases(BaseModel):
	# Foreign key pointing to the country of this data
	country = peewee.ForeignKeyField(Country)

	# Date of this data
	date = peewee.DateTimeField(default=datetime.datetime.now)

	# Total amount of identified covid cases
	total = peewee.IntegerField()

	# Active cases of covid
	identified = peewee.IntegerField()

	# Total amount of depath caused by covid
	deaths = peewee.IntegerField()

	# Ammount of people that recovered from covid
	recovered = peewee.IntegerField()


# Country event, measures applied change of emergency state in the country.
class CountryEvent(BaseModel):
	# Foreign key pointing to the country of this data
	country = peewee.ForeignKeyField(Country)

	# Type of the event
	type = peewee.IntegerField()

	# Estimated impact of the event in the virus evolution
	#
	# (e.g -0.1 should prevent 10% of covid cases, 0 means no impact)
	impact = peewee.FloatField()

	# Description of the event
	description = peewee.CharField()


def connect():
	db.connect()
	db.create_tables([Country, CovidCases])
