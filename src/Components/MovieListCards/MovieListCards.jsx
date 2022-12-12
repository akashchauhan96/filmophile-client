import { useState, useEffect } from "react";
import axios from "axios";
import "./MovieListCards.scss";
import deleteIcon from "../../assets/icons/delete-icon.svg";

export default function MovieListCards() {
  const [getAxios, setGetAxios] = useState(null);
  const [renderMovieLists, setRenderMovieLists] = useState(false);
  useEffect(() => {
    const serverURL = process.env.REACT_APP_SERVER_URL;
    console.log(serverURL);
    const getMoviesList = async () => {
      try {
        const resp = await axios.get(`${serverURL}/movie-lists`);
        console.log(resp);
        if (resp.data.length === 0) {
          setRenderMovieLists(false);
        } else {
          setGetAxios(resp.data);
          setRenderMovieLists(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMoviesList();
  }, []);
  return (
    <>
      <h2 className="movie-lists__title">Your Current Lists</h2>
      <article className="movie-lists__cards">
        {!renderMovieLists ? (
          <div className="movie-lists__empty-card"></div>
        ) : (
          getAxios.map((moviecard) => {
            return (
              <div className="movie-lists__card">
                <div className="movie-lists__icon-container">
                  <img
                    src={deleteIcon}
                    alt="Delete icon represented by an X symbol"
                  />
                </div>
                <div className="movie-lists__single-list">
                  <div className="movie-lists__movie-images">
                    <div className="movie_lists__single-movie-image">
                      <img
                        src={getAxios[0].movie_img_url}
                        alt="Image of movie poster of the first movie in user's list"
                      />
                    </div>
                    <div className="movie_lists__single-movie-image">
                      {moviecard[1] ? (
                        <img
                          src={getAxios[1].movie_img_url}
                          alt="Image of movie poster of the second movie in user's list"
                        />
                      ) : (
                        <div className="movie-lists__empty-slot"></div>
                      )}
                    </div>
                    <div className="movie_lists__single-movie-image">
                      {getAxios[2] ? (
                        <img
                          src={getAxios[2].movie_img_url}
                          alt="Image of movie poster of the second movie in user's list"
                        />
                      ) : (
                        <div className="movie-lists__empty-slot"></div>
                      )}
                    </div>
                  </div>
                  <div className="movie-lists__movie-info">
                    <h2 className="movie-lists__movie-title">
                      {moviecard.name}
                    </h2>
                    <p className="movie-lists__total-movies">
                      Number of movies {moviecard.number_of_movies}
                    </p>
                    <p className="movie-lists__movie-description">
                      {moviecard.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </article>
    </>
  );
}
