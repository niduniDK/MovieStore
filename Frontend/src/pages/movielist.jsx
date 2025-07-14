import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import movie_bg_3 from "../assets/movie-bg-3.jpg";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Movie } from "./home";
import axios from "axios";

function MovieList(){

    const dummymMovieList = []

    const [movieList, setMovieList] = useState(dummymMovieList);

    const movieVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    }

    const location = useLocation();
    const genre = location.state?.genre

    useEffect(() => {
        console.log('Fetching movies by genre list...');
        axios.get(`http://127.0.0.1:8000/movies/movie_list/${genre}`)
        .then((response) => {
            console.log(response.data)
            setMovieList(response.data);
        })
        .catch((error) => {
            console.error("Error fetching movie list:", error);
        })
    }, []);

    return(
        <div>
            <Navbar/>
            <motion.div
            className=" bg-slate-100"
            // style={{
            //     backgroundImage: `url(${movie_bg_3})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center"
            // }}
            >
                <motion.h1 className="text-5xl p-5 text-blue-900 text-center"><strong>Check out {genre} Movies!</strong></motion.h1>
                <motion.div
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-10 px-10 py-20 mx-5"
                initial={{opacity:0, y: 30}}
                animate={{opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}}
            
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                >
                    
                    {movieList.length > 0 && movieList.map((movie) => {
                        return(
                            <Movie movie={movie} itemVariants={movieVarient}/>
                        )
                    })}
                </motion.div>
            </motion.div>
            <Footer/>
        </div>
    );
}

export default MovieList;