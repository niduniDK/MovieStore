import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import genrelist
import watch_movie

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
)

app.include_router(genrelist.router, prefix='/genres', tags=['Genres'])
app.include_router(watch_movie.router, prefix='/movies', tags=['Movies'])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
