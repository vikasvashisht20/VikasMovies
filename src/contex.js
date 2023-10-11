import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

// fist we need to create context
const AppContext = React.createContext();

// we need to create a provider function
const AppProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({show: "false", msg: "" });
  const [query, setQuery] = useState("titanic");


  const getMovies = async(url) => {
    setIsLoading(true);
    try { 
      const res =  await fetch(url);  //response we are geeting by using a fetch api and will return a promise for that we need to await..
      const data = await res.json(); // it will givr the promised data but we need to use await else the data will show pending.its returning the promise to return data so we need to wait thats why await is used  
      console.log(data);
      if( data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({
          show: false,
          msg:"",
        })
        setMovie(data.Search);
        } else {
        setIsError({
          show: true,
          msg:data.Error,

        })

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    let timerOut = setTimeout (() => {
      getMovies (`${API_URL}&s=${query}`);
    }, 800);

    return () => clearTimeout(timerOut);
    
  }, [query]);

  return  <AppContext.Provider value = {{isLoading, isError, movie, setQuery}}>
    {children}
  </AppContext.Provider>
};

//global custom hooks
const useGlobalContext = () => {
  return useContext (AppContext);
}

export {AppContext , AppProvider , useGlobalContext};



