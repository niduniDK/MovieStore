import requests
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

OMDB_API_KEY = os.getenv('OMDB_API_KEY')

router = APIRouter()

base_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(base_dir, 'data-files', 'title.basics.tsv.gz')

# df = pd.read_csv(file_path, sep='\t', usecols=['tconst', 'primaryTitle', 'startYear', 'runtimeMinutes','genres'], dtype=str)
# df.dropna(subset=['primaryTitle', 'genres'], inplace=True)


class Movie(BaseModel):
    id: str
    name: str
    year: str
    genres: List[str]
    duration: str
    
    class Config:
        from_attributes = True

@router.get('/movie_list', response_model=List[Movie])
def get_movies_list():
    all_movies = []
    chunk_size = 10000  # or 5000, or 2000 depending on memory

    for chunk in pd.read_csv(file_path, sep='\t', usecols=['tconst', 'primaryTitle', 'startYear', 'runtimeMinutes', 'genres'],
                             dtype=str, chunksize=chunk_size):
        chunk.dropna(subset=['primaryTitle', 'genres'], inplace=True)

        for _, row in chunk.iterrows():
            all_movies.append(Movie(
                id=row['tconst'],
                name=row['primaryTitle'],
                year=row['startYear'],
                duration=row['runtimeMinutes'],
                genres=row['genres'].split(',')
            ))

    movies_list = [Movie(id=idx, name=movie.name, year=movie.year, duration=movie.duration, genres=movie.genres) 
                   for idx, movie in enumerate(all_movies, start=1)]
    return movies_list



@router.get('/movie_list/{genre}', response_model=List[Movie])
def get_movies_by_genre(genre: str):
    filtered_movies = []
    chunk_size = 10000

    for chunk in pd.read_csv(file_path, sep='\t', usecols=['tconst', 'primaryTitle', 'startYear', 'runtimeMinutes', 'genres'],
                             dtype=str, chunksize=chunk_size):
        chunk.dropna(subset=['primaryTitle', 'genres'], inplace=True)
        genre_filtered = chunk[chunk['genres'].str.contains(genre, na=False, case=False)]

        for _, row in genre_filtered.iterrows():
            filtered_movies.append(Movie(
                id=row['tconst'],
                name=row['primaryTitle'],
                year=row['startYear'],
                duration=row['runtimeMinutes'],
                genres=row['genres'].split(',')
            ))

    movies_list = [Movie(id=idx, name=movie.name, year=movie.year, duration=movie.duration, genres=movie.genres) 
                   for idx, movie in enumerate(filtered_movies, start=1)]
    return movies_list

