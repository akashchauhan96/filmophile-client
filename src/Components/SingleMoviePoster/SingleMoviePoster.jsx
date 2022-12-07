import "./SingleMoviePoster.scss";
import axios from "axios";

export default function SingleMoviePoster({ moviesArray, loading }) {
  const imageBaseURL = "https://image.tmdb.org/t/p/original";
  const split = moviesArray[0].release_date.substring(0, 4);
  console.log(split);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(moviesArray);
  return (
    <>
      <section className="movie-cards">
        {moviesArray.map((movie) => {
          return (
            <div className="movie-card" key={movie.id}>
              <div className="movie-card__img-container">
                <img
                  className="movie-card__movie-poster"
                  src={imageBaseURL + movie.poster_path}
                  alt={movie.title}
                />
              </div>
              <h2 className="movie-card__movie-title">{movie.title}</h2>
              <p className="movie-card__movie-release">
                {movie.release_date.substring(0, 4)}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
