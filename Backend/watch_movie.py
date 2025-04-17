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
    original_title: str
    overview: str
    popularity: float
    release_date: str
    vote_average: float
    vote_count: int
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
            poster=poster_url,
            original_title=movie.get('original_title', ''),
            overview=movie.get('overview', ''),
            popularity=movie.get('popularity', 0.0),
            release_date=movie.get('release_date', ''),
            vote_average=movie.get('vote_average', 0.0),
            vote_count=movie.get('vote_count', 0)
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
    for page in range(1, 5): 
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
            poster=poster_url,
            original_title=movie.get('original_title', ''),
            overview=movie.get('overview', ''),
            popularity=movie.get('popularity', 0.0),
            release_date=movie.get('release_date', ''),
            vote_average=movie.get('vote_average', 0.0),
            vote_count=movie.get('vote_count', 0)
        ))

    return filtered_movies


@router.get('/watch_movie/{movie_id}')
def get_trailer(movie_id: int):
    url = f"{TMDB_BASE_URL}/movie/{movie_id}/videos"
    params = {'api_key':{TMDB_API_KEY}, 'language': 'en-US'}
    response = requests.get(url, params=params)
    video_data = response.json().get('results', [])
    if not video_data:
        return
    for data in video_data:
        if data.get('site') == 'YouTube' and data.get('type') == 'Trailer':
            video_key =  data.get('key')
            video_url = f"https://www.youtube.com/watch?v={video_key}"
            return video_url
    else:
        return
    

@router.get('/search/{title}', response_model=List[Movie])
def get_searched_movies(title: str):
    url = f"{TMDB_BASE_URL}/search/movie"
    params = {'api_key': TMDB_API_KEY, 'query': title}
    response = requests.get(url, params=params)
    response.raise_for_status()
    searched_movies = response.json().get('results', [])

    movie_results = []

    genre_mapping = fetch_genre_mapping()
    
    for movie in searched_movies:
        poster_path = movie.get('poster_path')
        poster_url = f"http://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
        movie_results.append(Movie(
            id=movie['id'],
            name=movie['title'],
            year=movie.get('release_date', '')[:4],
            genres=[genre_mapping.get(gid, "Unknown") for gid in movie.get('genre_ids', [])],
            poster=poster_url,
            original_title=movie.get('original_title', ''),
            overview=movie.get('overview', ''),
            popularity=movie.get('popularity', 0.0),
            release_date=movie.get('release_date', ''),
            vote_average=movie.get('vote_average', 0.0),
            vote_count=movie.get('vote_count', 0)
        ))

    return movie_results