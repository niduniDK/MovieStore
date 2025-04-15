import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import movie_bg_3 from "../assets/movie-bg-3.jpg";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Movie } from "./home";

function MovieList(){

    const movie_list = [
        {
            id:1,
            name: "Movie 1",
            description: "Description of Movie 1"
        },
        {
            id:2,
            name: "Movie 2",
            description: "Description of Movie 2"
        },
        {
            id:3,
            name: "Movie 3",
            description: "Description of Movie 3"
        },
        {
            id:4,
            name: "Movie 4",
            description: "Description of Movie 4"
        },
        {
            id:5,
            name: "Movie 5",
            description: "Description of Movie 5"
        },
        {
            id:6,
            name: "Movie 6",
            description: "Description of Movie 6"
        },
        {
            id:7,
            name: "Movie 7",
            description: "Description of Movie 7"
        },
        {
            id:8,
            name: "Movie 8",
            description: "Description of Movie 8"
        },
        {
            id:9,
            name: "Movie 9",
            description: "Description of Movie 9"
        },
        {
            id:10,
            name: "Movie 10",
            description: "Description of Movie 10"
        },
        {
            id:11,
            name: "Movie 11",
            description: "Description of Movie 11"
        },
        {
            id:12,
            name: "Movie 12",
            description: "Description of Movie 12"
        },
        {
            id:13,
            name: "Movie 13",
            description: "Description of Movie 13"
        },
        {
            id:14,
            name: "Movie 14",
            description: "Description of Movie 14"
        },
        {
            id:15,
            name: "Movie 15",
            description: "Description of Movie 15"
        },
        {
            id:16,
            name: "Movie 16",
            description: "Description of Movie 16"
        },
        {
            id:17,
            name: "Movie 17",
            description: "Description of Movie 17"
        },
        {
            id:18,
            name: "Movie 18",
            description: "Description of Movie 18"
        },
        {
            id:19,
            name: "Movie 19",
            description: "Description of Movie 19"
        },
        {
            id:20,
            name: "Movie 20",
            description: "Description of Movie 20"
        }
    ]

    const movieVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    }

    const location = useLocation();
    const genre = location.state?.genre


    return(
        <div>
            <Navbar/>
            <motion.div
            className="m-5"
            style={{
                backgroundImage: `url(${movie_bg_3})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
            >
                <motion.h1 className="text-5xl bg-slate-500 bg-opacity-25 p-5 m-2 text-green-100 text-center"><strong>Check out {genre} Movies!</strong></motion.h1>
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
                    
                    {movie_list.map((movie) => {
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