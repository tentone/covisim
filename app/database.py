import peewee
import datetime

# SQLite database
db = peewee.SqliteDatabase("database.db")


# Base database model
class BaseModel(peewee.Model):
    class Meta:
        database = db


# Countries data include metadata about the country.
class Country(BaseModel):
    name = peewee.CharField(unique=True)
    code = peewee.CharField(unique=True)
    population = peewee.IntegerField()


# Daily data with the amount of covid cases.
#
# Data is associated to a country.
class CovidCases(BaseModel):
    country = peewee.ForeignKeyField(Country)
    date = peewee.DateTimeField(default=datetime.datetime.now)
    active = peewee.IntegerField()
    deaths = peewee.IntegerField()
    recovered = peewee.IntegerField()


def connect():
    db.connect()
    db.create_tables([Country, CovidCases])
