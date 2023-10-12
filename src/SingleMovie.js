import React, {useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom'
import {API_URL} from "./contex"
 

const SingleMovie = () => {
  const {id } = useParams();

  const [isLoading, setIsLoading, setIsError] = useState(true);
  const [movie, setMovie] = useState("");
 
  const getMovies = async(url) => {
    setIsLoading(true);
    try { 
      const res =  await fetch(url);  //response we are geeting by using a fetch api and will return a promise for that we need to await..
      const data = await res.json(); // it will givr the promised data but we need to use await else the data will show pending.its returning the promise to return data so we need to wait thats why await is used  
      console.log(data);
      if( data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
        setIsError({
          show: false,
          msg:"",
        })
        setMovie(data);
        }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    let timerOut = setTimeout (() => {
      getMovies (`${API_URL}&i=${id}`);
    }, 800);

    return () => clearTimeout(timerOut);
    
  }, [id]);

  if (isLoading) {
    return (
      <div className='movie-section'>
        <div className='loading'> Loading...</div>

      </div>
    )
  }
  
  return (
      <section className='movie-section'>
        <div className='movie-card'>
          <figure >
            <img src= {movie.Poster} />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating} /10</p>
            <p className="card-text">{movie.Country}</p>
            <NavLink to = "/VikasMovies" className= "back-btn">Go Back </NavLink>
          </div>
        </div>
      </section>
  )
}

export default SingleMovie

 