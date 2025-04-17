import React from "react";
import { useNavigate } from "react-router-dom";

function SearchBar(){

    const navigate = useNavigate();

    return(
        <div className="flex flex-row m-2">
            <input type="text" placeholder="Search Movie" className="p-2 m-5 w-full min-w-full h-1/2 text-black bg-slate-50 bg-opacity-80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="p-2 mx-0 my-5 w-full min-w-20 bg-green-900 text-white rounded-lg hover:bg-green-200 hover:text-green-950"
            onClick={() => {
                const searchInput = document.querySelector('input[type=text]'.valueOf());
                navigate('/search', {state: {title: searchInput.value}});
            }}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar;