import flask
import app.database
import app.tasks

app = flask.Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    t = database.Country.create(name='charlie')
    t.save()
    return "Hello, World!"

database.connect()
tasks.start()

# WorldWide cases
# https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-17.xlsx

# Portugal
# https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv