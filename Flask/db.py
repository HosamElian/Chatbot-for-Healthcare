from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR, select, update
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engin = create_engine("sqlite:///database.db", echo=True)
Base = declarative_base()

class User(Base):
    __tablename__ = "Users"
    Id = Column("Id", Integer, primary_key=True, autoincrement=True)
    Name = Column("Name", String)
    Status = Column("Status", String)
    Gender = Column("Gender", String)
    BloodType = Column("BloodType", String)
    Allergic = Column("Allergic", String)
    MedicalHistory = Column("MedicalHistory", String)
    PhoneNumber = Column("PhoneNumber", String)
    City = Column("City", String)
    Age = Column("Age", Integer)
    
    def __init__(self, name, status, gender,bloodType, allergic, medicalHistory, phoneNumber, city,age):
        self.Name = name
        self.Status = status
        self.Gender = gender
        self.BloodType = bloodType
        self.Allergic = allergic
        self.MedicalHistory = medicalHistory
        self.PhoneNumber = phoneNumber
        self.City = city
        self.Age = age
    
    def __repr__(self):
        return f"Name:{self.Name}, age:{self.Age}, City:{self.City}, Phone number:{self.PhoneNumber} Status:{self.Status}, Gender:{self.Gender}, Blood Type{self.BloodType}, have allergic :{self.Allergic}, medical history:{self.MedicalHistory} end of user data."
    
def initilaize():
    Base.metadata.create_all(bind=engin)
    Session = sessionmaker(bind=engin)
    session = Session()
    
initilaize()
    

       

