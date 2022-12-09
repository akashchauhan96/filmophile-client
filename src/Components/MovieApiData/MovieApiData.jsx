import axios from "axios";
import { useEffect, useState } from "react";
import SingleMoviePoster from "../SingleMoviePoster/SingleMoviePoster";
import { v4 as uuidv4 } from "uuid";
import FilterAndSearch from "../FilterAndSearch/FilterAndSearch";

export default function MovieApiData({ setOpenFilter }) {
  const [moviesArray, setMoviesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const axiosBaseURL = process.env.REACT_APP_TMDB_API_BASE_URL;
  const axiosApiKey = process.env.REACT_APP_API_KEY_QUERY;
  const axiosURL = axiosBaseURL + axiosApiKey;

  let items = [];

  for (let i = 1; i <= 10; i++) {
    items[i - 1] = i;
  }

  useEffect(() => {
    let count = 1;
    let movies = [];
    const getMovies = async (count) => {
      setLoading(true);
      try {
        const resp = await axios.get(
          `${axiosBaseURL}/discover/movie${axiosApiKey}&page=${count}`
        );
        if (count <= 4) {
          count++;
          getMovies(count);
          movies = movies.concat(resp.data.results);
        } else {
          setMoviesArray(movies);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovies(count);
  }, []);

  //Get Current Post
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovie = moviesArray.slice(indexOfFirstMovie, indexOfLastMovie);

  if (moviesArray.length !== 0) {
    return (
      <>
        <FilterAndSearch setOpenFilter={setOpenFilter} />
        <SingleMoviePoster
          moviesArray={currentMovie}
          loading={loading}
          axiosBaseURL={axiosBaseURL}
          axiosApiKey={axiosApiKey}
        />
      </>
    );
  }
}
