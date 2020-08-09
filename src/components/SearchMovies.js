import React, { useState } from "react";
import MovieCard from "./MovieCard";

function SearchMovies() {
    
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (event) => {
        event.preventDefault()
        const url = `https://api.themoviedb.org/3/search/movie?api_key=3f4c6da045e3b5d8b2aa73df933e21c2&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <form className = "form" onSubmit = {searchMovies}>
                <label htmlFor = "query" className = "label"> Movie Name </label>
                <input className = "input" type = "text" name = "query" value = { query } onChange = {(event) => setQuery(event.target.value)} placeholder = "i.e. Jurassic Park" />
                <button type = "submit" className = "button"> Search </button>
            </form>

            <div className = "cardList">
                {movies.filter (movie => movie.poster_path).map(movie => (
                    <MovieCard movie = {movie} key = {movie.id}/>
                ))}
            </div>
        </>
    )
}

export default SearchMovies