import React from "react";
import Navbar from "../components/navbar";
import {motion} from "framer-motion";

function Home(){

    const headerVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:0.8, y: 0, transition: {duration: 0.5, ease: "easeOut"}, staggerChildren: 0.2, when: "beforeChildren"}
    }

    const textVarient = {
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
        </div>
    )
}

export default Home;