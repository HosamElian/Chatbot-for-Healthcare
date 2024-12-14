from flask import Flask, render_template, request, jsonify
from chat import *

app = Flask(__name__)
def add_to_db(user) -> bool:
    try:
        Session = sessionmaker(bind=engin)
        session = Session()
        person = User(user["name"], user["status"], user["gender"], user["bloodType"],user["allergic"],user["cityHistory"],user["phoneNumber"], user["medicalHistory"], user["age"] )
        session.add(person)
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False

@app.route("/")
def hello():
    return render_template('chat.html')

@app.route("/ask", methods=['POST', 'GET'])
def ask():
    message = request.get_json()
    bot_response = chatbot(message["message"], message["includeData"]) 
    return jsonify({'status':'OK','answer':bot_response.text})

@app.route("/add", methods=['POST', 'GET'])
def add():
    user = request.get_json()
    print(user)
    isSuccess = add_to_db(user) 
    return jsonify({'status':'OK','Add':isSuccess})

if __name__ == "__main__":
    app.run(debug=True)
