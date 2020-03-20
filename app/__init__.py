import app.database as database
import app.tasks as tasks
import flask

app = flask.Flask(__name__)


@app.route('/v1')
@app.s('/data')
def index():
	return "Hello, World!"


database.connect()
tasks.start()
