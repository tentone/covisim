import flask
import app.database as database

def start():
    api = flask.Flask(__name__)

    @api.route('/')
    @api.route('/index')
    def index():
        t = database.Country.create(name='charlie')
        t.save()
        return "Hello, World!"
