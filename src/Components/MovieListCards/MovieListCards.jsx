import { useState, useEffect } from "react";
import axios from "axios";
import "./MovieListCards.scss";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import { Link } from "react-router-dom";
import React from "react";

export default function MovieListCards() {
  const [getAxios, setGetAxios] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);
  const [twoMoviesList, setTwoMoviesList] = useState(null);
  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getMoviesList = async () => {
      try {
        const resp = await axios.get(`${serverURL}/movie-lists`);
        const uniqueId = uniqueIdFilter(resp.data);
        const duplicateId = duplicateIdFilter(resp.data);
        let uniqueIdArray = uniqueId.concat(duplicateId);
        for (let i = 0; i < uniqueIdArray.length; i++) {
          if (
            getAxios.filter((movie) => {
              return movie.id === uniqueIdArray[i];
            }).length === 2
          ) {
            const twoMovies = getAxios.filter((movie) => {
              return movie.id === uniqueIdArray[i];
            });
            setTwoMoviesList(twoMovies);
          }
        }
        setUniqueIds(uniqueIdArray);
        setGetAxios(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMoviesList();
  }, [uniqueIds]);

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

  const handleOnClick = async (id) => {
    id = id.toString();
    const res = await axios.delete(`${serverURL}/movie-lists/${id}`);
    const newList = await axios.get(`${serverURL}/movie-lists`);
    const uniqueId = uniqueIdFilter(newList.data);
    const duplicateId = duplicateIdFilter(newList.data);
    let uniqueIdArray = uniqueId.concat(duplicateId);
    setUniqueIds(uniqueIdArray);
    setGetAxios(newList.data);
  };

  return (
    <section className="movie-lists">
      <div className="movie-lists__button-container">
        <Link to="/movie-lists/add" className="movie-lists__create-button">
          Create A New List
        </Link>
      </div>
      <h2 className="movie-lists__title">Your Movie Lists</h2>
      <article className="movie-lists__cards">
        {!getAxios.length ? (
          <div className="movie-lists__empty-card">
            <h3 className="movie-lists__empty-title">
              Your list is currently empty
            </h3>
            <p className="movie-lists__empty-description">
              Create a new film list of your own choosing by clicking on the
              Create A New List button.
            </p>
          </div>
        ) : (
          <>
            {uniqueIds.map((id) => {
              return (
                <div className="movie-lists__card" key={id}>
                  <div className="movie-lists__icon-container">
                    <img
                      src={deleteIcon}
                      alt="Delete icon represented by an X symbol"
                      className="movie-lists__delete-icon"
                      onClick={() => handleOnClick(id)}
                    />
                  </div>
                  <div className="movie-lists__info-section">
                    <div className="movie-lists__single-list">
                      <div className="movie-lists__images-container">
                        {getAxios.filter((movie) => {
                          return movie.id === id;
                        }).length === 1 ? (
                          getAxios
                            .filter((movie) => {
                              return movie.id === id;
                            })
                            .map((item) => {
                              return (
                                <React.Fragment key={item.id}>
                                  <img
                                    src={item.image_url}
                                    alt="Image of movie poster of the first movie in user's list"
                                    className="movie-lists__image"
                                  />
                                  <div className="movie-lists__image movie-lists__image--empty"></div>
                                  <div className="movie-lists__image movie-lists__image--empty"></div>
                                </React.Fragment>
                              );
                            })
                        ) : getAxios.filter((movie) => {
                            return movie.id === id;
                          }).length === 2 && twoMoviesList ? (
                          <>
                            <img
                              key={twoMoviesList[0].id}
                              src={twoMoviesList[0].image_url}
                              alt="Image of movie poster of the first movie in user's list"
                              className="movie-lists__image"
                            />
                            <img
                              key={twoMoviesList[1].id}
                              src={twoMoviesList[1].image_url}
                              alt="Image of movie poster of the second movie in user's list"
                              className="movie-lists__image"
                            />
                            <div className="movie-lists__image movie-lists__image--empty"></div>
                          </>
                        ) : getAxios.filter((movie) => {
                            return movie.id === id;
                          }).length >= 3 ? (
                          getAxios
                            .filter((movie) => {
                              return movie.id === id;
                            })
                            .slice(0, 3)
                            .map((item) => {
                              return (
                                <>
                                  <img
                                    key={item.id}
                                    src={item.image_url}
                                    alt="Image of movie poster of the first movie in user's list"
                                    className="movie-lists__image"
                                  />
                                </>
                              );
                            })
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="movie-lists__movie-info">
                        <h2 className="movie-lists__movie-title">
                          {
                            getAxios.find((movie) => {
                              return movie.id === id;
                            }).name
                          }
                        </h2>
                        <p className="movie-lists__total-movies">
                          {`
                            ${
                              getAxios.find((movie) => {
                                return movie.id === id;
                              }).number_of_movies
                            } Movies`}
                        </p>
                        <p className="movie-lists__movie-description">
                          {getAxios.find((movie) => {
                            return movie.id === id;
                          }).description.length >= 65
                            ? getAxios
                                .find((movie) => {
                                  return movie.id === id;
                                })
                                .description.slice(0, 65) + "..."
                            : getAxios.find((movie) => {
                                return movie.id === id;
                              }).description}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/movie-lists/${id}`}
                      className="movie-lists__view-button"
                    >
                      View Movies
                    </Link>
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
