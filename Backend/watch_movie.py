import requests
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
TMDB_BASE_URL = "https://api.themoviedb.org/3"

router = APIRouter()

class Movie(BaseModel):
    id: int
    name: str
    year: Optional[str]
    genres: List[str]
    poster: Optional[str]
    class Config:
        from_attributes = True


def fetch_genre_mapping():
    """Fetches TMDb genres and returns a dict {id: name}"""
    url = f"{TMDB_BASE_URL}/genre/movie/list"
    params = {'api_key': TMDB_API_KEY}
    response = requests.get(url, params=params)
    response.raise_for_status()
    genres = response.json().get('genres', [])
    return {genre['id']: genre['name'] for genre in genres}


@router.get('/movie_list', response_model=List[Movie])
def get_movies_list():
    genre_mapping = fetch_genre_mapping()

    url = f"{TMDB_BASE_URL}/movie/popular"
    params = {'api_key': TMDB_API_KEY, 'language': 'en-US', 'page': 1}
    response = requests.get(url, params=params)
    response.raise_for_status()

    movies_data = response.json().get('results', [])
    all_movies = []

    for movie in movies_data:
        genre_names = [genre_mapping.get(gid, "Unknown") for gid in movie.get('genre_ids', [])]
        poster_path = movie.get('poster_path')
        poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
        all_movies.append(Movie(
            id=movie['id'],
            name=movie['title'],
            year=movie.get('release_date', '')[:4],
            genres=genre_names,
            poster=poster_url
        ))

    return all_movies


@router.get('/movie_list/{genre}', response_model=List[Movie])
def get_movies_by_genre(genre: str):
    genre_mapping = fetch_genre_mapping()
    genre_name_to_id = {v.lower(): k for k, v in genre_mapping.items()}

    genre_id = genre_name_to_id.get(genre.lower())
    if not genre_id:
        return []

    movies_data = []
    filtered_movies = []
    url = f"{TMDB_BASE_URL}/discover/movie"
    for page in range(1, 20): 
        params = {
            'api_key': TMDB_API_KEY,
            'language': 'en-US',
            'sort_by': 'popularity.desc',
            'with_genres': genre_id,
            'page': page
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        movies_data.extend(response.json().get('results', []))
        

    for movie in movies_data:
        genre_names = [genre_mapping.get(gid, "Unknown") for gid in movie.get('genre_ids', [])]
        poster_path = movie.get('poster_path')
        poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
        filtered_movies.append(Movie(
            id=movie['id'],
            name=movie['title'],
            year=movie.get('release_date', '')[:4],
            genres=genre_names,
            poster=poster_url
        ))

    return filtered_movies
