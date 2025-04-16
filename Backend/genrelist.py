import requests
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
TMDB_BASE_URL = "https://api.themoviedb.org/3"

router = APIRouter()

class Genre(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

@router.get('/genrelist', response_model=List[Genre])
def get_genre_list():
    url = f"{TMDB_BASE_URL}/genre/movie/list"
    params = {'api_key': TMDB_API_KEY, 'language': 'en-US'}
    
    response = requests.get(url, params=params)
    response.raise_for_status()

    genres_data = response.json().get('genres', [])
    genres_list = [Genre(id=genre['id'], name=genre['name']) for genre in genres_data]

    return genres_list
