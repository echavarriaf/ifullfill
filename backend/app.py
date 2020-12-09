from flask import Flask
from flask_cors import CORS
import werkzeug

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, support_credentials=True)


@app.route("/")
def home():
    return "home"


if __name__ == "__main":
    app.run()
