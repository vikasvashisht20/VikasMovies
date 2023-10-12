import React from 'react'
import Home from './Home'
import SingleMovie from './SingleMovie'
import {Routes, Route} from "react-router-dom"
import Error from './Error'
import "./App.css"

const App = () => {
  return (  
    
      <Routes>
        <Route path='/VikasMovies' element = {<Home />} />
        <Route path='movie/:id' element= {<SingleMovie />}  />
        <Route path='*' element = {<Error />} />
      </Routes>
    
    )
}

export default App
