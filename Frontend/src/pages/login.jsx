import React, { useState } from "react";
import { motion } from "framer-motion";
import movie_bg_3 from "../assets/movie-bg-3.jpg";
import icon from "../assets/movie-clapper-open.png";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(`http://127.0.0.1:8000/auth/login/${username}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      // body: JSON.stringify({
      //   username: username,
      //   password: password,
      // })
    })
    .then (response => {
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      return response.json()
    })
    .then(data => {
      console.log('Fetched User Details:', data);
      if(data.username === username && data.password === password){
        console.log("Login successful!");
        setUsername('');
        setPassword('');
        navigate("/home");
      }
      else{
        setUsername('');
        setPassword('');
        navigate('/login');
      }
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
      setUsername('');
      setPassword('');
      navigate('/login');
    });
  };

  return (
    <motion.div
      style={{
        backgroundImage: `url(${movie_bg_3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
      className="fixed top-0 left-0 flex justify-center items-center"
    >
      <div className="bg-slate-400 bg-opacity-80 rounded-lg p-10 w-1/3 flex flex-col items-center">
        <div className="flex flex-row justify-center items-center m-2">
          <img src={icon} alt="" className="w-12 h-auto mx-1" />
          <h1 className="text-4xl text-green-950 m-2 ml-5 text-center">
            <strong>MovieStore</strong>
          </h1>
        </div>

        <h1 className="text-3xl text-green-800 m-5 text-center"><strong>Login</strong></h1>

        <div className="flex flex-col w-full px-5">
          <div className="flex flex-col mb-4">
            <label
              htmlFor="username"
              className="text-xl text-black mb-2 text-left"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded border bg-slate-300 text-black border-gray-300"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="text-xl text-black mb-2 text-left"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded border bg-slate-300 text-black border-gray-300"
            />
          </div>

          <button className="bg-green-800 text-white p-3 rounded-lg mt-5"
          onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-sm text-gray-700 m-2 mt-5 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-green-850 font-bold">
              Register here
            </a>
        </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
