import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function WatchOnline(){

    const location = useLocation();
    const movie = location.state?.movie
    const [trailerUrl, setTrailerUrl] = useState(null);

    const handleWatchOnline = () => {
        window.location.href = `https://www.netflix.com/search?q=${encodeURIComponent(movie.name)}`;
    }

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
            <Navbar/>
            <div className="flex flex-row my-0 pt-0 m-5 p-8 bg-slate-50 bg-opacity-80 h-screen">
            <div className="flex flex-col">
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
                        className="w-full max-w-5xl aspect-video mt-32"
                        ></iframe>
                    ) : <p>No Trailer Available</p>
                }
                <button className="p-2 mx-0 my-10 w-full bg-green-900 text-white rounded-lg hover:bg-green-200 hover:text-green-950" onClick={handleWatchOnline}>Watch Online</button>
            </div>
                
                <div className="flex flex-col justify-center ml-5 p-5">
                    <h1 className="text-4xl text-black text-left m-2"><strong>{movie.name}</strong></h1>
                    <h3 className="text-lg text-black text-left m-2">Original Title: {movie.original_title}</h3>
                    <h3 className="text-lg text-black text-left m-2">Popularity: {movie.popularity}</h3>
                    <h3 className="text-lg text-black text-left m-2">Released: {movie.release_date}</h3>
                    <h3 className="text-lg text-black text-left m-2">Rating: {movie.vote_average}</h3>
                    <h3 className="text-lg text-black text-left m-2">Votes: {movie.vote_count}</h3>
                    <p className="text-lg text-black text-left m-2">{movie.overview}</p>
                </div>
            </div>
            <Footer/>
        </div>

    )
}

export default WatchOnline;