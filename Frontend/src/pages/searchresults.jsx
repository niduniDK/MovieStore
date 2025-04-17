import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Movie } from "./home";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function SearchResults(){

    const location = useLocation();
    const title = location.state?.title

    const dummySearchResults = []
    const [searchResults, setSearchResults] = useState(dummySearchResults);

    const itemVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/movies/search/${title}`)
        .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
        })
        .catch((error) => {
            console.error("Error fetching search results:", error);
        })
    })

    return(
        <div>
            <Navbar/>
            <motion.h1 className="text-slate-800 bg-slate-100 bg-opacity-80 text-5xl m-5 mt-0 py-10 text-center" variants={itemVarient}><strong>Showing results for {title}...</strong></motion.h1>
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
                {searchResults.length > 0 && searchResults.map((movie) => {
                    return(
                        <Movie key={movie.id} movie={movie} itemVariants={itemVarient} />
                    )
                })}
            </motion.div>
            <Footer/>
        </div>
    )
}

export default SearchResults;