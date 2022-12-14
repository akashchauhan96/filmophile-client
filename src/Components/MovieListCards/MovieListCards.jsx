import { useState, useEffect } from "react";
import axios from "axios";
import "./MovieListCards.scss";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import { Link } from "react-router-dom";

export default function MovieListCards() {
  const [getAxios, setGetAxios] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);

  useEffect(() => {
    const serverURL = process.env.REACT_APP_SERVER_URL;
    console.log(serverURL);
    const getMoviesList = async () => {
      try {
        const resp = await axios.get(`${serverURL}/movie-lists`);
        console.log(resp.data);
        const uniqueId = uniqueIdFilter(resp.data);
        const duplicateId = duplicateIdFilter(resp.data);
        const uniqueIdArray = uniqueId.concat(duplicateId);
        console.log(uniqueIdArray);
        setUniqueIds(uniqueIdArray);
        setGetAxios(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMoviesList();
  }, []);

  const uniqueIdFilter = (array) => {
    let uniqueIdArray = array;
    let duplicateIdArray = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i].id === array[j].id) {
          uniqueIdArray = uniqueIdArray.filter((item) => {
            return item.id !== array[i].id;
          });
          duplicateIdArray.push(array[i].id);
        }
      }
    }
    const uniqueId = uniqueIdArray.map((item) => {
      return item.id;
    });
    return uniqueId;
  };

  const duplicateIdFilter = (array) => {
    let result = [];
    let count = {};

    for (let i = 0; i < array.length; i++) {
      let item = array[i].id;
      if (count[item] >= 1) {
        count[item] = count[item] + 1;
      } else {
        count[item] = 1;
      }
      if (count[item] === 2) {
        result.push(item);
      }
    }
    return result;
  };

  return (
    <section className="movie-lists">
      <div className="movie-lists__button-container">
        <Link to="/movie-lists/add" className="movie-lists__create-button">
          Create A New List
        </Link>
      </div>
      <h2 className="movie-lists__title">Your Current Lists</h2>
      <article className="movie-lists__cards">
        {!getAxios ? (
          <div className="movie-lists__empty-card"></div>
        ) : (
          <>
            {uniqueIds.map((id) => {
              return (
                <div className="movie-lists__card" key={id}>
                  <div className="movie-lists__icon-container">
                    <img
                      src={deleteIcon}
                      alt="Delete icon represented by an X symbol"
                    />
                  </div>
                  <div className="movie-lists__single-list">
                    <div className="movie-lists__images-container">
                      {getAxios.filter((movie) => {
                        return movie.id === id;
                      }).length === 1
                        ? getAxios
                            .filter((movie) => {
                              return movie.id === id;
                            })
                            .map((item) => {
                              return (
                                <>
                                  <img
                                    key={id}
                                    src={item.image_url}
                                    alt="Image of movie poster of the first movie in user's list"
                                    className="movie-lists__image"
                                  />
                                  <div className="movie-lists__image movie-lists__image--empty"></div>
                                  <div className="movie-lists__image movie-lists__image--empty"></div>
                                </>
                              );
                            })
                        : getAxios.filter((movie) => {
                            return movie.id === id;
                          }).length === 2
                        ? getAxios
                            .filter((movie) => {
                              return movie.id === id;
                            })
                            .slice(0, 2)
                            .map((item) => {
                              return (
                                <>
                                  <img
                                    key={id}
                                    src={item.image_url}
                                    alt="Image of movie poster of the first movie in user's list"
                                    className="movie-lists__image"
                                  />
                                </>
                              );
                            })
                        : getAxios.filter((movie) => {
                            return movie.id === id;
                          }).length >= 3
                        ? getAxios
                            .filter((movie, index) => {
                              return movie.id === id;
                            })
                            .slice(0, 3)
                            .map((item) => {
                              return (
                                <>
                                  <img
                                    key={id}
                                    src={item.image_url}
                                    alt="Image of movie poster of the first movie in user's list"
                                    className="movie-lists__image"
                                  />
                                </>
                              );
                            })
                        : ""}
                    </div>
                    <div className="movie-lists__movie-info">
                      <h2 className="movie-lists__movie-title" key={id}>
                        {
                          getAxios.find((movie) => {
                            return movie.id === id;
                          }).name
                        }
                      </h2>
                      <p className="movie-lists__total-movies" key={id}>
                        {
                          getAxios.find((movie) => {
                            return movie.id === id;
                          }).name
                        }
                      </p>
                      <p className="movie-lists__movie-description" key={id}>
                        {
                          getAxios.find((movie) => {
                            return movie.id === id;
                          }).name
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </article>
    </section>
  );
}
