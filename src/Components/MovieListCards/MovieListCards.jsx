import { useState, useEffect } from "react";
import axios from "axios";
import "./MovieListCards.scss";
import deleteIcon from "../../assets/icons/delete-icon.svg";

export default function MovieListCards() {
  const [getAxios, setGetAxios] = useState(null);
  const [renderMovieLists, setRenderMovieLists] = useState(false);
  useEffect(() => {
    const serverURL = process.env.REACT_APP_SERVER_URL;
    const getMoviesList = async () => {
      try {
        const resp = await axios.get(`${serverURL}/movie-lists`);
        if (resp.data.length === 0) {
          setRenderMovieLists(false);
          setGetAxios(resp.data);
        } else {
          setRenderMovieLists(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
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
                        src={resp.data[0].movie_img_url}
                        alt="Image of movie poster of the first movie in user's list"
                      />
                    </div>
                    <div className="movie_lists__single-movie-image">
                      {resp.data[1] ? (
                        <img
                          src={resp.data[1].movie_img_url}
                          alt="Image of movie poster of the second movie in user's list"
                        />
                      ) : (
                        <div className="movie-lists__empty-slot"></div>
                      )}
                    </div>
                    <div className="movie_lists__single-movie-image">
                      {resp.data[2] ? (
                        <img
                          src={resp.data[2].movie_img_url}
                          alt="Image of movie poster of the second movie in user's list"
                        />
                      ) : (
                        <div className="movie-lists__empty-slot"></div>
                      )}
                    </div>
                  </div>
                  <div className="movie-lists__movie-info">
                    <h2 className="movie-lists__movie-title">
                      {resp.data.name}
                    </h2>
                    <p className="movie-lists__total-movies">
                      {resp.data.number_of_movies}
                    </p>
                    <p className="movie-lists__movie-description">
                      {resp.data.description}
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
