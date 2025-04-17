from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from pydantic import BaseModel

load_dotenv()

DATABASE_URL = os.getenv('AIVEN_SERVICE_URL')

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "sslmode": "require"
        }
    }
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class UserCreate(BaseModel):
    username: str
    email: str
    password: str

