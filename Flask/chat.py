import os
from llama_index.llms.gemini import Gemini
from db import *

engin = create_engine("sqlite:///database.db", echo=True)

GOOGLE_API_KEY = ""  # add your GOOGLE API key here
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

def chatbot(message, includeData=False): 
    if includeData: 
        user_list = []
        Session = sessionmaker(bind=engin)
        session = Session()
        users = session.query(User).all()
        for user in users:
            user_list.append(str(user))
        userJoinData = ' - '.join(user_list)
        resp = Gemini().complete(f"'{message}'from this data: {userJoinData}")
    else:
        resp = Gemini().complete(f"{message}")
    print(resp)
    return resp
