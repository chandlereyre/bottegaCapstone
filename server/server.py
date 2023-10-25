import redis
from flask import Flask, request, session
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient

# app config
app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)
app.config['SECRET_KEY'] = open("secret_key.txt", "r").read()
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')

# mongo init
db = MongoClient().chatApp

# Create Flask-Session
server_session = Session(app)

@app.route("/auth/login", methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        # check if username & password combination exists in mongoDB
        if db.users.find({'username': username, 'password': password}):
            # add user to session
            session['username'] = username
            return 'session created'
    if request.method == 'GET':
        if 'username' in session:
            return 'true'
        else:
            return 'false'
    return ''

@app.route("/auth/logout", methods = ['DELETE'])
def logout():
    session.pop('username')
    return 'session deleted'

@app.route("/create-account", methods = ['POST'])
def createAccount():
    username = request.json['username']
    password = request.json['password']
    if db.users.find({'username': username}):
        return "user already exists"
    else:
        db.insert_one({'username': username, 'password': password})
        return 'account created'

@app.route("/update-account", methods = ['POST'])
def updateAccount():
    # TODO update account
    return "account updated"

app.run(debug=True)