import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function WatchOnline(){

    const location = useLocation();
    const movie = location.state?.movie
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/movies/watch_movie/${movie.id}`)
        .then((response) => {
            setTrailerUrl(response.data)
        })
        .catch((error) => {
            console.error("Error fetching trailer:", error);
        })
    }, [])

    return(
        <div>
            <div className="flex flex-row mt-5 pt-0 m-10 p-10 bg-slate-50 bg-opacity-80 rounded-lg h-screen">
                {
                    trailerUrl? (
                        <iframe 
                        width="560"
                        height="315"
                        title={movie.name+" Trailer"}
                        src={trailerUrl.replace("watch?v=", "embed/")} 
                        frameborder="0"
                        allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full mt-32"
                        ></iframe>
                    ) : <p>No Trailer Available</p>
                }
                <div className="flex flex-col justify-center p-5">
                    <h1 className="text-4xl text-black text-left m-2"><strong>{movie.name}</strong></h1>
                    <h3 className="text-lg text-black text-left m-2">Original Title: {movie.original_title}</h3>
                    <h3 className="text-lg text-black text-left m-2">Popularity: {movie.popularity}</h3>
                    <h3 className="text-lg text-black text-left m-2">Released: {movie.release_date}</h3>
                    <h3 className="text-lg text-black text-left m-2">Rating: {movie.vote_average}</h3>
                    <h3 className="text-lg text-black text-left m-2">Votes: {movie.vote_count}</h3>
                    <p className="text-lg text-black text-left m-2">{movie.overview}</p>
                </div>
            </div>
        </div>

    )
}

export default WatchOnline;