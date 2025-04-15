import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import {animate, AnimatePresence, motion, useInView} from "framer-motion";
import movie_bg from "../assets/movie-bg.jpg";
import movie_bg_2 from "../assets/movie-bg-2.jpg";
import Footer from "../components/footer";

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
        },
        {
            id: 6,
            name: "Sci-Fi"
        },
        {
            id: 7,
            name: "Fantasy"
        },
        {
            id: 8,
            name: "Thriller"
        },
        {
            id: 9,
            name: "Adventure"
        },
        {
            id: 10,
            name: "Animation"
        }
    ]

    const  [currentGenre, setCurrentGenre] = useState(0);
    const [currentMovie, setCurrentMovie] = useState(0);

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

    const visibleGenres = [
        genres[currentGenre % genres.length],
        genres[(currentGenre + 1) % genres.length],
        genres[(currentGenre + 2) % genres.length],
        genres[(currentGenre + 3) % genres.length],
        genres[(currentGenre + 4) % genres.length],
    ]

    const visibleMovies = [
        movies[currentMovie % movies.length],
        movies[(currentMovie + 1) % movies.length],
        movies[(currentMovie + 2) % movies.length]
    ]

    const ref = useRef(null);
    const isInView = useInView(ref, {once: false});

    const Movie = ({ movie, itemVariants }) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
    
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
                <h1 className="text-4xl text-center text-green-900 p-3 m-2"><strong>{movie.name}</strong></h1>
                <p className="text-2xl text-center text-green-800 p-3 m-2">{movie.description}</p>
                <div className="flex flex-row justify-between items-center m-5">
                    <button className="items-center p-2 mx-5 m-2 bg-green-700 text-white rounded-lg">Watch Online</button>
                    <button className="items-center p-2 mx-5 m-2 bg-green-900 text-white rounded-lg">Add to Cart</button>
                </div>
            </motion.div>
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGenre((prev) => (prev+5) % genres.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovie((prev) => (prev+3) % movies.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return(
        <div>
            <Navbar/>
            <motion.div className="dark:bg-slate-200 opacity-80 justify-center m-5" ref={ref} variants={itemVarient} initial="hidden" animate={isInView ? "visible" : "hidden"}>
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
                <motion.h1 className="text-white bg-slate-700 bg-opacity-30 text-5xl m-0 py-5 text-center"><strong>Explore Genres!</strong></motion.h1>
                <motion.div className="flex flex-row justify-center p-5 space-x-6">
                <motion.div
                    key={genres[currentGenre].id}
                    className="flex w-full justify-center space-x-4 p-3 shadow-xl rounded-lg text-lg"
                    variants={slideVarients}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                >
                    <AnimatePresence mode="wait">
                        {visibleGenres.map((genre) => (
                            <motion.div
                                key={genre.id}
                                className="flex w-full justify-center space-x-4 p-2 shadow-xl rounded-lg text-lg"
                                variants={itemVarient}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.6 }}
                            >
                                <div className="dark:bg-slate-300 p-2 m-5 rounded-lg" key={genre.id}>
                                    <h1 className="text-3xl text-center text-green-900 p-2 m-2"><strong>{genre.name}</strong></h1>
                                    <div className="flex flex-row justify-between items-center m-5">
                                        <button className="items-center justify-center p-2 mx-3 m-2 bg-green-900 text-white rounded-lg">Check Movies</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    
                    </AnimatePresence>
                </motion.div>
                </motion.div>
            </motion.div>
           

            <motion.div className="m-5 mb-0"
             style={{
                backgroundImage: `url(${movie_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            >
                <motion.h1 className="text-slate-800 bg-slate-400 bg-opacity-40 text-5xl m-0 py-10 text-center" variants={itemVarient}><strong>Check Our Movie Collection!</strong></motion.h1>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-10 px-10 py-20 mx-5"
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
                    
                    {visibleMovies.map((movie) => (
                        <Movie key={movie.id} movie={movie} itemVariants={itemVarient}/>
                    ))}
                </motion.div>

            </motion.div>
           

            <Footer/>
            
        </div>
    )
}

export default Home;