from flask import Flask
from flask_cors import CORS
from crawler import crawler


if __name__ == '__main__':       
	app = Flask(__name__)
	CORS(app)
	app.register_blueprint(crawler)
	app.run(debug=True)