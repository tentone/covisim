import database
import tasks
import data
import flask

database.connect()
tasks.start()
data.load()

app = flask.Flask(__name__)

@app.route('/v1/data')
def index():
	return "Hello, World!"