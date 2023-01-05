import "./SingleMoviePoster.scss";

export default function SingleMoviePoster({
  moviesArray,
  moviesPerPage,
  searchResult,
}) {
  const imageBaseURL = "https://image.tmdb.org/t/p/original";

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
                  </div>
                </div>
              );
            })}
      </section>
    </>
  );
}
