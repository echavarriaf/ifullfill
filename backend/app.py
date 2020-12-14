from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import werkzeug

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost:3306/ifulfill'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "*"}}, support_credentials=True)

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))

    def __init__(self, name):
        self.name = name


db.create_all()


class LocationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


locationschema = LocationSchema()
locationsschemas = LocationSchema(many=True)


@app.route("/locations", methods=['POST'])
def create_location():
    name = request.json['name']

    new_location = Location(name)
    db.session.add(new_location)
    db.session.commit()

    return locationschema.jsonify(new_location)


@app.route("/locations", methods=['GET'])
def get_locations():
    all_locations = Location.query.all()
    result = locationsschemas.dump(all_locations)
    return jsonify(result)


@app.route('/locations/<id>', methods=['GET'])
def get_location(id):
    location = Location.query.get(id)
    return locationschema.jsonify(location)


@app.route('/locations/<id>', methods=['PUT'])
def update_location(id):
    location = Location.query.get(id)

    name = request.json['name']
    location.name = name

    db.session.commit()

    return locationschema.jsonify(location)


@app.route('/locations/<id>', methods=['DELETE'])
def delete_location(id):
    location = Location.query.get(id)

    db.session.delete(location)
    db.session.commit()

    return locationschema.jsonify(location)


@app.route("/")
def home():
    return "home"


if __name__ == "__main__":
    app.run(debug=True)
