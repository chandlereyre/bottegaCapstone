import redis
from flask import Flask, request, session, send_file
from PIL import Image, ImageOps
import base64
import io
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from flask_socketio import SocketIO, join_room, leave_room, send

# app config
app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)
app.config['IMG_FOLDER'] = 'img'
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
        db.user.insert_one({'username': username, 'password': password, 'bio': "", 'chats': [], 'profilePic': ""})
        return 'account created'
    
@app.route("/update-account", methods = ['POST'])
def updateAccount():
    # TODO update account
    return "account updated"
    
@app.route("/get-chats", methods = ['GET'])
def getChats():
    username = session.get('username', None)
    data = {}
    chats = db.user.find_one({'username': username})["chats"]
    for user in chats:
        room = computeRoom(username, user)
        lastMessage = ""
        profilePic = ""
        if db.chats.find_one({'room': room}):
            lastMessage = db.chats.find_one({'room': room})['messages'][-1]['message']
            profilePic = db.user.find_one({'username': user})['profilePic']
        data[user] = [lastMessage, profilePic]
    return data

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
    
@app.route("/get-messages", methods = ['POST'])
def getMessages():
    room = computeRoom(request.json['user1'], request.json['user2'])
    if db.chats.find_one({'room': room}):
        messages = db.chats.find_one({'room': room})['messages']
        return messages
    else:
        return []

@app.route("/get-profile-pic", methods=['POST'])
def getProfilePic():
    if db.user.find_one({'username': request.json['username']}):
        return db.user.find_one({'username': request.json['username']})['profilePic']
    else:
        return "user not found"

    
@app.route("/get-profile-info", methods=['POST'])
def getProfileInfo():
    user = request.json['username']
    if db.user.find_one({'username': user}):
        userData = db.user.find_one({'username': user})
        responseData = {
            "username": userData['username'],
            "bio": userData['bio'],
            "profilePic": userData['profilePic']
        }
        return responseData
    else:
        return "user not found"

@app.route("/update-profile", methods=['POST'])
def updateProfile():
    user = session.get('username', None)
    bio = request.json['bio']

    print(request.json['profilePic'][0:5])
    
    if (request.json['profilePic'][0:5] == 'data:'):
        # convert dataURL to image
        head, image = request.json['profilePic'].split(',', 1)

        bits = head.split(';')
        mime_type = bits[0] if bits[0] else 'text/plain'    
        _, file_type = mime_type.split('/')
        
        b = base64.b64decode(image)

        img = Image.open(io.BytesIO(b))

        # save image locally in 'img' folder
        img.save(f'./img/{user}.{file_type}', quality=50)
    
        if db.user.find_one({'username': user}):
            db.user.update_one({'username': user}, {'$set': {'bio': bio, 'profilePic': f'/img/{user}.{file_type}'}})
            return "user updated"
    if db.user.find_one({'username': user}):
        db.user.update_one({'username': user}, {'$set': {'bio': bio}})
        return "user updated"
    else:
        return "user not found"
    
# IMAGE HOSTING
@app.route('/img/<imagename>', methods=["GET"])
def getImage(imagename):
    return send_file(f"./img/{imagename}", mimetype="image/jpeg")

# SOCKET IO / WEBSOCKET
@socketio.on('join')
def join_chat(data):
    room = computeRoom(data['user1'], data['user2'])
    join_room(room)

@socketio.on('leave')
def leave_chat(data):
    room = computeRoom(data['user1'], data['user2'])
    leave_room(room)

@socketio.on('chatMessage')
def handle_message(data):
    # print('received message: ' + data['message'])
    message = data['message']
    recipient = data['user2']
    sender = data['user1']
    room = computeRoom(data['user1'], data['user2'])
    # Add thing
    if not db.chats.find_one({'room': room}):
        db.chats.insert_one({'room': room, 'messages': [{'message': message, 'to': recipient, 'from': sender}]})
    else:
        messages = db.chats.find_one({'room': room})['messages']
        messages.append({'message': message, 'to': recipient, 'from': sender})
        db.chats.update_one({'room': room}, {'$set': {'messages': messages}})
    socketio.emit('chatMessage', {'message': message, 'from': sender, 'to': recipient}, room=room)

# update for arbitrary amount of users
def computeRoom(user1, user2):
    if user1 > user2:
        temp = user2
        user2 = user1
        user1 = temp
    room = user1 + user2
    return room


if __name__ == '__main__':  
    socketio.run(app)