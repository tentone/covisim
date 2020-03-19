import peewee
import datetime

# SQLite database
db = peewee.SqliteDatabase("database.db")

# Base database model
class BaseModel(peewee.Model):
    class Meta:
        database = db

# Countries data
class Country(BaseModel):
    name = peewee.CharField(unique=True)
    code = peewee.CharField(unique=True)
    population = peewee.IntegerField()

# Daily data
class DailyData(BaseModel):
    country = peewee.ForeignKeyField(Country)
    date = peewee.DateTimeField(default=datetime.datetime.now)

def connect():
    db.connect()
    db.create_tables([Country, DailyData])