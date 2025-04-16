import pandas as pd
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import os

router = APIRouter()

class Genre(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

@router.get('/genrelist', response_model=List[Genre])
def get_genre_list():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, 'data-files', 'title.basics.tsv.gz')

    df = pd.read_csv(file_path, sep='\t', usecols=['genres'], dtype=str)
    df.dropna(subset=['genres'], inplace=True)
    all_genres = set()
    for genre_list in df['genres']:
        genres = genre_list.split(',')
        all_genres.update(genres)
    
    all_genres.discard('\\N')

    genres_with_idx = [Genre(id=idx, name=genre) for idx, genre in enumerate(sorted(all_genres), start=1)]

    return genres_with_idx

print(get_genre_list())