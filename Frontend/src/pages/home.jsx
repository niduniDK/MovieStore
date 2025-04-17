import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import {animate, AnimatePresence, motion, useInView} from "framer-motion";
import movie_bg from "../assets/movie-bg.jpg";
import movie_bg_2 from "../assets/movie-bg-2.jpg";
import movie_bg_3 from "../assets/movie-bg-3.jpg";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Movie = ({ movie, itemVariants }) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
        const navigate = useNavigate();
    
        return (
            <motion.div
                ref={ref}
                className="bg-slate-200 opacity-80 shadow-lg rounded-xl px-10 py-6 w-full max-w-full mx-auto"
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                    zIndex:1
                }}
            >
                <div className="flex flex-row justify-between items-center m-5">
                    <div>
                        <h1 className="text-3xl text-left text-green-900 p-3 m-2"><strong>{movie.name}</strong></h1>
                        <p className="text-xl text-left text-green-800 p-3 m-2">Release year: {movie.year}</p>
                        <p className="text-xl text-left text-green-800 p-3 m-2">Genres: {movie.genres && movie.genres.join(", ")}</p>
                    </div>
                    <img src={movie.poster} alt="" className="w-1/2"/>
                </div>
                <div className="flex flex-row justify-between items-center m-5">
                    <button className="items-center p-2 mx-5 m-2 bg-green-700 text-white rounded-lg"
                    onClick={() => {
                        navigate('/watchonline', {state: {movie: movie}});
                    }}
                    >
                        Watch Online
                    </button>
                    <button className="items-center p-2 mx-5 m-2 bg-green-900 text-white rounded-lg">Add to Cart</button>
                </div>
            </motion.div>
        );
    };

function Home(){

    const navigate = useNavigate();

    const dummyMovies = []

    const dummyGenres = []

    const [genres, setGenres] = useState(dummyGenres);

    const  [currentGenre, setCurrentGenre] = useState(0);
    const [currentMovie, setCurrentMovie] = useState(0);
    const [movies, setMovies] = useState(dummyMovies);

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

    const slideVarients = {
        initial: {opacity: 0, x: 100},
        animate: {opacity: 1, x: 0},
        exit: {opacity: 0, x: -100}
    }

    const visibleGenres = genres.length > 0
    ? [
        genres[currentGenre % genres.length],
        genres[(currentGenre + 1) % genres.length],
        genres[(currentGenre + 2) % genres.length],
        genres[(currentGenre + 3) % genres.length],
        genres[(currentGenre + 4) % genres.length],
    ]
    : [];
    
    const visibleMovies = movies.length > 0
    ?[
        movies[currentMovie % movies.length],
        movies[(currentMovie + 1) % movies.length],
        movies[(currentMovie + 2) % movies.length]
    ]
    : [];

    const ref = useRef(null);
    const isInView = useInView(ref, {once: false});

    

    useEffect(() => {
        if (genres.length === 0) return;
        const interval = setInterval(() => {
            setCurrentGenre((prev) => (prev+5) % genres.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [genres]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovie((prev) => (prev+3) % movies.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [movies]);

    useEffect(() => {
        console.log('Fetching genre list...');
        axios.get('http://127.0.0.1:8000/genres/genrelist')
        .then((response) => {
            console.log(response.data);
            setGenres(response.data);
        })
        .catch((error) => {
            console.error('Error fetching genre list: ', error);
        })
    }, []);

    useEffect(() => {
        console.log('Fetching movies list...');
        axios.get('http://127.0.0.1:8000/movies/movie_list')
        .then((response) => {
            console.log(response.data);
            setMovies(response.data);
        })
        .catch((error) => {
            console.error('Error fetching movie list: ', error);
        })
    },[])

    

    return(
        <div>
            <Navbar/>

            <motion.div className="m-5 mb-0"
             style={{
                backgroundImage: `url(${movie_bg_3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            >
                <motion.h1 className="text-slate-800 bg-slate-400 bg-opacity-40 text-5xl m-0 py-10 text-center" variants={itemVarient}><strong>Check Our Movie Collection!</strong></motion.h1>
                <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-10 px-10 py-20 mx-5"
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
                    
                    {movies.length > 0 && visibleMovies.filter(Boolean).map((movie) => (
                        <Movie key={movie.id} movie={movie} itemVariants={itemVarient}/>
                    ))}
                </motion.div>

            </motion.div>

            
           <motion.div className="dark:bg-slate-200 opacity-80 justify-center m-5 mt-1" ref={ref} variants={itemVarient} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                <motion.h1 className="text-6xl text-green-800 text-center my-10 mx-5 mb-0 p-10" ><strong>Welcome to MovieStore!</strong></motion.h1>
                 <motion.p className="dark:bg-slate-200 text-lg text-gray-700 text-center m-5 p-16 pt-0">
                Step into a world of cinematic brilliance at MovieStore, where stories come to life and unforgettable moments are just a click away. From timeless classics that have shaped generations to the latest blockbuster hits redefining the art of filmmaking, we bring you a carefully curated collection of movies across every genre imaginable. Whether you're in the mood for a heartwarming romance, an adrenaline-pumping action thriller, or a thought-provoking drama, MovieStore has something special for everyone. Immerse yourself in the magic of storytelling, relive your favorite scenes, discover hidden gems, and experience the wonder of cinema like never before. Your perfect movie night starts right here with us.
                </motion.p>

            </motion.div>

            <motion.div className="m-5 mb-0"
            ref={ref} 
            variants={itemVarient} 
            initial="hidden" 
            animate={isInView ? "visible" : "hidden"}
            style={{
                backgroundImage: `url(${movie_bg_2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            >
                <motion.h1 className="text-white bg-slate-700 bg-opacity-30 text-5xl m-0 py-5 pt-5 text-center"><strong>Explore Genres!</strong></motion.h1>
                <motion.div className="flex flex-row justify-center p-5 space-x-6">
                <motion.div
                    className="flex w-full justify-center space-x-4 p-3 pb-0 shadow-xl rounded-lg text-lg"
                    variants={itemVarient}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.6 }}
                >
                    <AnimatePresence mode="wait">
                        {genres.length > 0 && visibleGenres.filter(Boolean).map((genre) => (
                            <motion.div
                                key={genre.id}
                                className="flex w-full justify-center space-x-4 p-2 shadow-xl rounded-lg text-lg"
                                variants={slideVarients}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.6 }}
                            >
                                <div className="dark:bg-slate-300 p-2 m-5 rounded-lg" key={genre.id}>
                                    <h1 className="text-3xl text-center text-green-900 p-2 m-2"><strong>{genre.name}</strong></h1>
                                    <div className="flex flex-row justify-between items-center m-5">
                                        <button className="items-center justify-center p-2 mx-3 m-2 bg-green-900 text-white rounded-lg"
                                        onClick={() => {
                                            navigate('/movielist', {state: {genre: genre.name}})
                                        }}
                                        >Check Movies</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    
                    </AnimatePresence>
                </motion.div>
                </motion.div>
            </motion.div> 

            <Footer/>
            
        </div>
    )
}

export default Home;
export {Movie};