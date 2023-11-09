import redis
from flask import Flask, request, session
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from flask_socketio import SocketIO, join_room, leave_room, send

# app config
app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)
app.config['FLASK_DEBUG'] = True
app.config['SECRET_KEY'] = open("secret_key.txt", "r").read()
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')

# mongo init
db = MongoClient("localhost", 27017).chatApp

# Create Flask-Session
Session(app)

# Create socketIO
socketio = SocketIO(app, cors_allowed_origins="*", manage_session=False)


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
        data = {}
        if 'username' in session:
            data = {
                "loggedIn": True,
                "username": session.get('username', None)
            }
            return data
        else:
            data = {
                "loggedIn": False,
                "username": None
            }
            return data
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
        db.user.insert_one({'username': username, 'password': password, 'chats': []})
        return 'account created'
    
@app.route("/findchats", methods = ['GET'])
def getChats():
    username = session.get('username', None)
    return db.user.find_one({'username': username})["chats"]


@app.route("/update-account", methods = ['POST'])
def updateAccount():
    # TODO update account
    return "account updated"

@app.route("/create-chat", methods = ['POST'])
def createChat():
    recipient = request.json['recipient']
    username = session.get('username', None)
    if db.user.find_one({'username': recipient}):
        chats = db.user.find_one({'username': username})["chats"]
        if recipient not in chats:
            # update chats for current user
            chats.append(recipient)
            db.user.update_one({'username': username}, {"$set": {"chats": chats}})
            # update chats for recipient
            chats = db.user.find_one({'username': recipient})["chats"]
            chats.append(username)
            db.user.update_one({'username': recipient}, {"$set": {"chats": chats}})
        return "recipient"
    else:
        return "user not found"

@socketio.on('join')
def join_chat(data):
    room = computeRoom(data['user1'], data['user2'])
    username = data['user1']
    join_room(room)
    socketio.emit('chatMessage', {'message': str(username) + ' has entered the room.'}, room=room)

@socketio.on('leave')
def leave_chat(data):
    room = computeRoom(data['user1'], data['user2'])
    username = data['user1']
    leave_room(room)
    socketio.emit('chatMessage', {'message': str(username) + ' has left the room.'}, room=room)

@socketio.on('chatMessage')
def handle_message(data):
    print('received message: ' + data['message'])
    message = data['message']
    room = data['room']
    # get room
    socketio.emit('chatMessage', {'message': message}, room=room)

def computeRoom(user1, user2):
    if user1 > user2:
        temp = user2
        user2 = user1
        user1 = temp
    room = user1 + user2
    return room


if __name__ == '__main__':  
    socketio.run(app)