export default function SingleMoviePoster({ moviesArray, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      {moviesArray.map((movie) => {
        <div className="movie-card">
          <div className="movie-card__img-container">
            <img
              className="movie-card__movie-poster"
              src={movie.poster_path}
              alt={movie.title}
            />
          </div>
        </div>;
      })}
      {/* {currentItems &&
      currentItems.map((item) => {
        totalMovies.map((movie) => {
          <div className="movie-card">
            <div className="movie-card__img-container">
              <img
                className="movie-card__movie-poster"
                src={movie.poster_path}
                alt={movie.title}
              />
            </div>
          </div>;
        });
      })} */}
    </>
  );
}
