from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import relationship
import json
import werkzeug

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost:3306/ifulfill'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "*"}}, support_credentials=True)

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Locations(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    location_description = db.Column(db.String(60))

    def __init__(self, location_description):
        self.location_description = location_description


class Cadre(db.Model):
    __tablename__ = 'cadre'
    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String(100))

    def __init__(self, desc):
        self.desc = desc


class Request(db.Model):
    __tablename__ = 'request'
    id = db.Column(db.Integer, primary_key=True)
    rr_id = db.Column(db.String(15))
    jr_id = db.Column(db.String(15))
    name = db.Column(db.String(50))
    skills = db.Column(db.String(100))
    cadre_id = db.Column(db.Integer, db.ForeignKey('cadre.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(
        'locations.id'), nullable=False)

    def __init__(self, rr_id, jr_id, name, skills, cadre_id, location_id):
        self.rr_id = rr_id
        self.jr_id = jr_id
        self.name = name
        self.skills = skills
        self.cadre_id = cadre_id
        self.location_id = location_id


db.create_all()


class LocationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'location_description')


locationschema = LocationSchema()
locationsschemas = LocationSchema(many=True)


class CadreSchema(ma.Schema):
    class Meta:
        fields = ('id', 'desc')


cadreschema = CadreSchema()
cadresschemas = CadreSchema(many=True)


class RequestSchema(ma.Schema):
    class Meta:
        fields = ('id', 'rr_id', 'jr_id', 'name',
                  'skills', 'cadre_id', 'location_id')


requestschema = RequestSchema()
requestsschemas = RequestSchema(many=True)


@app.route("/cadres", methods=['POST'])
def create_cadre():
    desc = request.json['desc']

    new_cadre = Cadre(desc)
    db.session.add(new_cadre)
    db.session.commit()

    return cadreschema.jsonify(new_cadre)


@app.route("/cadres", methods=['GET'])
def get_cadres():
    all_cadres = Cadre.query.all()
    result = cadresschemas.dump(all_cadres)
    return jsonify(result)


@app.route("/cadres/<id>", methods=['GET'])
def get_cadre(id):
    cadre = Cadre.query.get(id)
    return cadreschema.jsonify(cadre)


@app.route("/cadres/<id>", methods=['PUT'])
def update_cadre(id):
    cadre = Cadre.query.get(id)

    name = request.json['desc']
    cadre.desc = name

    db.session.commit()

    return cadreschema.jsonify(cadre)


@app.route('/cadre/<id>', methods=['DELETE'])
def delete_cadre(id):
    cadre = Cadre.query.get(id)

    db.session.delete(cadre)
    db.session.commit()

    return cadreschema.jsonify(cadre)


@app.route("/locations", methods=['POST'])
def create_location():
    name = request.json['location_description']

    new_location = Locations(name)
    db.session.add(new_location)
    db.session.commit()

    return locationschema.jsonify(new_location)


@app.route("/locations", methods=['GET'])
def get_locations():
    all_locations = Locations.query.all()
    result = locationsschemas.dump(all_locations)
    return jsonify(result)


@app.route('/locations/<id>', methods=['GET'])
def get_location(id):
    location = Locations.query.get(id)
    print(location.location_description)
    return locationschema.jsonify(location)


@app.route('/locations/<id>', methods=['PUT'])
def update_location(id):
    location = Locations.query.get(id)

    name = request.json['name']
    location.location_description = name

    db.session.commit()

    return locationschema.jsonify(location)


@app.route('/locations/<id>', methods=['DELETE'])
def delete_location(id):
    location = Locations.query.get(id)

    db.session.delete(location)
    db.session.commit()

    return locationschema.jsonify(location)


@app.route('/dashboard', methods=['GET'])
def get_requests():
    all_requests = db.session.query(Request.rr_id, Request.jr_id, Request.name,
                                    Request.id, Request.skills, Cadre.desc, Locations.location_description).select_from(Request).outerjoin(Cadre, Request.cadre_id == Cadre.id).outerjoin(Locations, Request.location_id == Locations.id).all()
    all_requests_json = [
        {
            "rr_id": x[0],
            "jr_id": x[1],
            "name": x[2],
            "id": x[3],
            "skills": x[4],
            "cadre": x[5],
            "locations": x[6]
        } for x in all_requests
    ]
    print(json.dumps(all_requests_json))

    return json.dumps(all_requests_json)


@ app.route("/")
def home():
    return "home"


if __name__ == "__main__":
    app.run(debug=True)
