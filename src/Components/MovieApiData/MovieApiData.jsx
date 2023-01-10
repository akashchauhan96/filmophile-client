import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SingleMoviePoster from "../SingleMoviePoster/SingleMoviePoster";
import searchIcon from "../../assets/icons/search-icon.svg";
import resetIcon from "../../assets/icons/reset-icon.svg";
import "./MovieApiData.scss";
import Lottie from "lottie-react";
import resultNotFound from "../../assets/motion-graphics/NoResult.json";
import loading from "../../assets/motion-graphics/Loading.json";

export default function MovieApiData() {
  const [moviesArray, setMoviesArray] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [totalMovies, setTotalMovies] = useState(null);
  const [noResult, setNoResult] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const axiosBaseURL = process.env.REACT_APP_TMDB_API_BASE_URL;
  const axiosApiKey = process.env.REACT_APP_API_KEY_QUERY;

  let items = [];

  for (let i = 1; i <= 10; i++) {
    items[i - 1] = i;
  }

  useEffect(() => {
    let count = 1;
    let movies = [];
    const getMovies = async (count) => {
      try {
        const resp = await axios.get(
          `${axiosBaseURL}/discover/movie${axiosApiKey}&page=${count}`
        );
        if (count <= 20) {
          count++;
          getMovies(count);
          movies = movies.concat(resp.data.results);
        } else {
          setMoviesArray(movies);
          setSearchResult(movies);
          setTotalMovies(movies.length);
          setIsReset(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovies(count);
  }, []);

  console.log(moviesArray);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOnKeyUp = (event) => {
    if (event.key === "Enter" && search) {
      event.preventDefault();
      const results = moviesArray.filter((movie) => {
        const movieName = movie.title.toLowerCase();
        return movieName.includes(search.toLowerCase());
      });
      console.log(results);
      if (results.length === 0) {
        setIsReset(false);
        setNoResult(true);
        setSearchParams({ search: `${search}` });
        setTotalMovies(results.length);
      } else {
        setSearchResult(results);
        setIsReset(false);
        setSearchParams({ search: `${search}` });
        setNoResult(false);
        setTotalMovies(results.length);
        setMoviesPerPage(10);
      }
    }
  };

  const handleOnClick = () => {
    setMoviesPerPage(moviesPerPage + 10);
  };

  const handleReturnOnClick = () => {
    setIsReset(true);
    setNoResult(false);
    setSearchParams({});
    setSearchResult(moviesArray);
    setTotalMovies(moviesArray.length);
    setMoviesPerPage(10);
  };

  const handleReset = () => {
    setIsReset(true);
    setNoResult(false);
    setSearch("");
    setSearchResult(moviesArray);
    setTotalMovies(moviesArray.length);
    setMoviesPerPage(10);
  };

  if (moviesArray.length === 0) {
    return (
      <div className="loading">
        <Lottie animationData={loading} loop={true} />
      </div>
    );
  } else if (moviesArray.length !== 0) {
    return (
      <section className="movie-database">
        <div className="search">
          <div className="search__results-container">
            <h2 className="search__results-title">Movies</h2>
            <p className="search__results-number">
              Showing {totalMovies} results
            </p>
          </div>
          <div className="search__outer-container">
            <div className="search__inner-container">
              <img
                className="search__icon"
                src={searchIcon}
                alt="Magnifying glass icon representing search feature"
              />
              <input
                className="search__input"
                type="text"
                value={search}
                onChange={handleOnChange}
                onKeyUp={handleOnKeyUp}
                placeholder="Search Name and Press Enter"
              />
            </div>
            {!isReset && (
              <div className="search__reset-container" onClick={handleReset}>
                <p className="search__reset-title">Reset</p>
                <img
                  className="search__reset-icon"
                  src={resetIcon}
                  alt="Reset Icon represented by an arrow moving counterclockwise"
                />
              </div>
            )}
          </div>
        </div>
        {!noResult && (
          <SingleMoviePoster
            moviesArray={moviesArray}
            moviesPerPage={moviesPerPage}
            searchResult={searchResult}
          />
        )}
        {noResult && (
          <div className="no-result">
            <h2 className="no-result__heading">
              Ooops... Seems like the movie you are looking does not exist in
              our database. Click on the{" "}
              <span className="no-result__return-statement">
                Return to Home
              </span>{" "}
              button below to return back to home page or try a different search
              query.
            </h2>
            <div className="no-result__animation-container">
              <Lottie animationData={resultNotFound} loop={true} />
            </div>
            <button
              className="no-result__return-button"
              onClick={handleReturnOnClick}
            >
              Return to Home
            </button>
          </div>
        )}
        {searchResult.length > 10 && !noResult ? (
          <button
            className="movie-database__load-button"
            onClick={handleOnClick}
          >
            Load More
          </button>
        ) : (
          ""
        )}
      </section>
    );
  }
}
