import redis
from flask import Flask, request, session
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from flask_socketio import SocketIO

# app config
app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)
app.config['SECRET_KEY'] = open("secret_key.txt", "r").read()
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')
socketio = SocketIO(app)

# mongo init
db = MongoClient("localhost", 27017).chatApp

# Create Flask-Session
server_session = Session(app)

@app.route("/auth/login", methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        # check if username & password combination exists in mongoDB
        if db.user.find_one({'username': username, 'password': password}):
            # add user to session
            session['username'] = username
            return 'session created'
        elif db.user.find_one({'username': username}):
            return 'incorrect password'
        else:
            return 'user not found'
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
    if db.user.find_one({'username': username}):
        return "user already exists"
    else:
        db.user.insert_one({'username': username, 'password': password})
        return 'account created'

@app.route("/update-account", methods = ['POST'])
def updateAccount():
    # TODO update account
    return "account updated"

@app.route("/create-chat", methods = ['POST'])
def createChat():
    # TODO create chat
    # NEEDS userFrom, userTo, message
    return "chat created"

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

if __name__ == '__main__':  
    socketio.run(app)