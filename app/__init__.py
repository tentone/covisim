from flask import Flask
from app.database import *

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    charlie = User.create(username='charlie')
    huey = User(username='huey')
    huey.save()

    # No need to set `is_published` or `created_date` since they
    # will just use the default values we specified.
    Tweet.create(user=charlie, message='My first tweet')

    return "Hello, World!"

connectDB()

# WorldWide cases
# https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-17.xlsx

# Portugal
# https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv