import React from "react";
import Navbar from "../components/navbar";
import {motion} from "framer-motion";
import movie_bg from "../assets/movie-bg.jpg";

function Home(){

    const movies = [
        {
            id: 1,
            name: "Movie 1",
            description: "Description of Movie 1"
        },
        {
            id: 2,
            name: "Movie 2",
            description: "Description of Movie 2"
        },
        {
            id: 3,
            name: "Movie 3",
            description: "Description of Movie 3"
        },
        {
            id: 4,
            name: "Movie 4",
            description: "Description of Movie 4"
        },
        {
            id: 5,
            name: "Movie 5",
            description: "Description of Movie 5"
        }
    ]

    const genres = [
        {
            id: 1,
            name: "Action"
        },
        {
            id: 2,
            name: "Comedy"
        },
        {
            id: 3,
            name: "Drama"
        },
        {
            id: 4,
            name: "Horror"
        },
        {
            id: 5,
            name: "Romance"
        }
    ]

    const headerVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:0.8, y: 0, transition: {duration: 0.5, ease: "easeOut"}, staggerChildren: 0.2, when: "beforeChildren"}
    }

    const textVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    }

    const itemVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    }

    return(
        <div>
            <Navbar/>
            <motion.div className=" bg-slate-200 opacity-80 justify-center m-5" variants={headerVarient} initial="hidden" animate="visible">
                <motion.h1 className="text-3xl text-green-800 text-center mt-10 mb-3 pb-0 p-5" variants={textVarient}><strong>Welcome to MovieStore</strong></motion.h1>
                <motion.p className="text-lg text-gray-700 text-center mb-5 pt-2 p-5" variants={textVarient}>
                    Discover a world of cinematic wonders at MovieStore! From timeless classics to the latest blockbusters, 
                    we bring you an extensive collection of movies to explore and enjoy. Dive into the magic of storytelling 
                    and let your movie journey begin with us today!
                </motion.p>
            </motion.div>
            <motion.div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-20 px-5 py-20 mx-5" variants={itemVarient}>
                {genres.map((genre) => (
                    <div className="bg-slate-300 opacity-80 p-5 m-5 rounded-lg" key={genre.id}>
                        <h1 className="text-3xl text-center text-green-900 p-3 m-2"><strong>{genre.name}</strong></h1>
                        <div className="flex flex-row justify-between items-center m-5">
                            <button className="items-center justify-center p-3 mx-5 m-2 bg-green-900 text-white rounded-lg">Check Movies</button>
                        </div>
                    </div>
                ))}
            </motion.div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-20 px-10 py-20 mx-5"
            initial={{opacity:0, y: 30}}
            animate={{opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}}
            style={{
                backgroundImage: `url(${movie_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            variants={itemVarient}
            >
                {movies.map((movie) => (
                    <div className="bg-slate-300 opacity-80 p-5 m-5 rounded-lg">
                        <h1 className="text-4xl text-center text-green-900 p-3 m-2"><strong>{movie.name}</strong></h1>
                        <p className="text-2xl text-center text-green-800 p-3 m-2">{movie.description}</p>
                        <div className="flex flex-row justify-between items-center m-5">
                            <button className="items-center p-3 mx-5 m-2 bg-green-700 text-white rounded-lg">Watch Online</button>
                            <button className="items-center p-3 mx-5 m-2 bg-green-900 text-white rounded-lg">Add to Cart</button>
                        </div>
                    </div>
                ))}
                
                <h1>Movie 1</h1>
            </motion.div>
        </div>
    )
}

export default Home;