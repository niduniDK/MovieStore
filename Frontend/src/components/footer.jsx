import React, { useRef } from "react";
import icon from '../assets/movie-clapper-open.png'
import { motion, useInView } from "framer-motion";

function Footer(){

    const ref = useRef(null);
    const isInView = useInView(ref, {once: false});

    const itemVarient = {
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}
    }

    return(
        <div className="flex flex-row bg-slate-200 p-3 m-5 mt-0 pt-0">
            <motion.div
            ref={ref}
            className="flex flex-row bg-slate-200 p-3 m-5 mt-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVarient}
            >
                <div className="flex flex-row p-3 mb-1 pb-0">
                    <img src={icon} alt="" className="w-16 h-auto mx-2 mr-0"/>
                    <h1 className="text-4xl text-green-950 m-5 mx-10 ml-5"><strong>MovieStore</strong></h1>
                </div>
                <div className="justify-center absolute right-6">
                    <p className="text-sm text-gray-700 m-2 mt-5 mr-20">moviestore@gmail.com</p>
                    <p className="text-sm text-gray-700 m-2 mr-20">123 Movie St, Film City, Sri Lanka</p>
                    <p className="text-sm text-gray-700 m-2 mb-5 mr-20">+94 (123) 456-7890</p>
                </div>
                <p className="text-sm text-gray-700 mx-72 my-10 text-center">&copy; 2025 MovieStore. All rights reserved.</p>
            </motion.div>
            
            
            
        </div>
    );
}

export default Footer;