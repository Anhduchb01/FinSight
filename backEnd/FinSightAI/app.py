from flask import Flask
from flask_cors import CORS
from crawler import crawler
from nlp import nlp


if __name__ == '__main__':       
	app = Flask(__name__)
	CORS(app)
	app.register_blueprint(crawler)
	app.register_blueprint(nlp)
	app.run(debug=True)