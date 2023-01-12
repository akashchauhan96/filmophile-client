import "./SingleMoviePoster.scss";
import addIcon from "../../assets/icons/add-icon.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SingleMoviePoster({
  moviesArray,
  moviesPerPage,
  searchResult,
  setSelectedMovie,
}) {
  const navigate = useNavigate();
  const imageBaseURL = "https://image.tmdb.org/t/p/original";

  const handleOnClick = (e) => {
    let selectedMovieId = parseInt(e.currentTarget.id);
    const clickedMovie = searchResult.find((movie) => {
      return selectedMovieId === movie.id;
    });
    setSelectedMovie(clickedMovie);
    navigate(`/movie-lists/add/${selectedMovieId.toString()}`);
  };

  return (
    <>
      <section className="movie-cards">
        {searchResult.length === 0
          ? moviesArray.slice(0, moviesPerPage).map((movie) => {
              return (
                <div className="movie-card" key={movie.id}>
                  <div className="movie-card__img-container">
                    <img
                      className="movie-card__movie-poster"
                      src={imageBaseURL + movie.poster_path}
                      alt={movie.title}
                    />
                    <div className="movie-card__movie-info">
                      <h2 className="movie-card__movie-title">{movie.title}</h2>
                      <p className="movie-card__movie-release">
                        {movie.release_date.substring(0, 4)}
                      </p>
                    </div>
                    <div
                      className="movie-card__button-container"
                      onClick={handleOnClick}
                      id={movie.id}
                    >
                      <img
                        className="movie-card__add-button"
                        src={addIcon}
                        alt="Add icon represented by a plus sign"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          : searchResult.slice(0, moviesPerPage).map((result) => {
              return (
                <div className="movie-card" key={result.id}>
                  <div className="movie-card__img-container">
                    <img
                      className="movie-card__movie-poster"
                      src={imageBaseURL + result.poster_path}
                      alt={result.title}
                    />
                    <div className="movie-card__movie-info">
                      <h2 className="movie-card__movie-title">
                        {result.title}
                      </h2>
                      <p className="movie-card__movie-release">
                        {result.release_date.substring(0, 4)}
                      </p>
                    </div>
                    <div
                      className="movie-card__button-container"
                      onClick={handleOnClick}
                      id={result.id}
                    >
                      <img
                        className="movie-card__add-button"
                        src={addIcon}
                        alt="Add icon represented by a plus sign"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
      </section>
    </>
  );
}
