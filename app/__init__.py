import app.database as database
import app.tasks as tasks
import app.data as data
import flask

database.connect()
tasks.start()
data.load()

app = flask.Flask(__name__)

@app.route('/v1/data')
def index():
	return "Hello, World!"