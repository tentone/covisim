from peewee import *
import datetime

# SQLite database
db = SqliteDatabase("database.db")

# Base database model
class BaseModel(Model):
    class Meta:
        database = db

# Countries data
class Country(BaseModel):
    name = CharField(unique=True)
    code = CharField(unique=True)
    population = IntegerField()

# Daily data
class DailyData(BaseModel):
    country = ForeignKeyField(Country)
    date = DateTimeField(default=datetime.datetime.now)

def connectDB():
    db.connect()
    db.create_tables([Country, DailyData])