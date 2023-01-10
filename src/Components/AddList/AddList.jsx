import { useState, useEffect } from "react";
import { isEmpty } from "validator";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AddList.scss";
import deleteIcon from "../../assets/icons/delete-icon.svg";

export default function AddList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [moviesArray, setMoviesArray] = useState([]);
  const [filmSearch, setFilmSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);
  const [newFilmList, setNewFilmList] = useState([]);
  const [saveIsClicked, setSaveIsClicked] = useState(false);
  const [movieFound, setMovieFound] = useState(true);
  const [isListEmpty, setIsListEmpty] = useState(true);

  const axiosBaseURL = process.env.REACT_APP_TMDB_API_BASE_URL;
  const axiosApiKey = process.env.REACT_APP_API_KEY_QUERY;
  const axiosServerURL = process.env.REACT_APP_SERVER_URL;

  const imageBaseURL = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();

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

  const handleOnSubmit = (e) => {
    const findMovie = moviesArray.find((movie) => {
      return movie.title === e.target.filmSearch.value;
    });
    e.preventDefault();
    if (!saveIsClicked) {
      if (
        isEmpty(name, { ignore_whitespace: true }) ||
        isEmpty(description, { ignore_whitespace: true }) ||
        !e.target.filmSearch.value
      ) {
        setError(true);
      } else if (!findMovie && filmSearch) {
        setMovieFound(false);
        setError(true);
      } else {
        setMovieFound(true);
        setError(false);
        if (findMovie) {
          const checkMovieOnList = newFilmList.find((movie) => {
            return movie.id === findMovie.id;
          });
          if (!checkMovieOnList) {
            setNewFilmList([findMovie, ...newFilmList]);
            setIsListEmpty(false);
          } else {
            return;
          }
        } else {
          return;
        }
      }
    } else {
      if (newFilmList.length === 0) {
        setIsListEmpty(true);
      }
      if (newFilmList.length !== 0) {
        setIsListEmpty(false);
        let filmList = {};
        filmList.name = name;
        filmList.description = description;
        filmList.number_of_movies = newFilmList.length;
        filmList.movie_name = [
          ...newFilmList.map((movie) => {
            return movie.title;
          }),
        ];
        filmList.release_year = [
          ...newFilmList.map((movie) => {
            return parseInt(movie.release_date.substring(0, 4));
          }),
        ];
        filmList.image_url = [
          ...newFilmList
            .map((movie) => {
              return movie.poster_path;
            })
            .map((url) => {
              return imageBaseURL + url;
            }),
        ];
        filmList.backdrop_url = [
          ...newFilmList
            .map((movie) => {
              return movie.backdrop_path;
            })
            .map((url) => {
              return imageBaseURL + url;
            }),
        ];

        axios
          .post(`${axiosServerURL}/movie-lists`, filmList)
          .then(() => {
            navigate(`/movie-lists`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleFilmSearch = (e) => {
    setFilmSearch(e.target.value);
    setIsSearching(true);
  };

  const onSearch = (searchTerm) => {
    setFilmSearch(searchTerm);
    setIsSearching(false);
  };

  const handleSaveClick = () => {
    setSaveIsClicked(true);
  };

  const handleAddClick = () => {
    setSaveIsClicked(false);
  };

  const handleDelete = (selectedMovieId) => {
    console.log(newFilmList[0].id);
    const filteredMovies = [...newFilmList];
    console.log(...newFilmList);
    setNewFilmList(
      filteredMovies.filter((movie) => {
        return selectedMovieId !== movie.id;
      })
    );
  };

  return (
    <>
      {!loading && (
        <section className="add-list">
          <h2 className="add-list__title">New List</h2>
          <form className="add-list__form" onSubmit={handleOnSubmit}>
            <div
              className={`add-list__name-container ${
                error && isEmpty(name, { ignore_whitespace: true })
                  ? "add-list__name-container--error"
                  : ""
              }`}
            >
              <label className="add-list__name-label">Name of List</label>
              <input
                className={`add-list__name-input ${
                  error && isEmpty(name, { ignore_whitespace: true })
                    ? "add-list__name-input--error"
                    : ""
                }`}
                type="text"
                name="name"
                autoComplete="off"
                value={name}
                placeholder="Enter movie list name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            {error && isEmpty(name, { ignore_whitespace: true }) ? (
              <div className="add-list__error-container">
                <span className="add-list__error-message">
                  Please fill out the required fields!
                </span>
              </div>
            ) : (
              ""
            )}
            <div
              className={`add-list__description-container ${
                error && isEmpty(description, { ignore_whitespace: true })
                  ? "add-list__description-container--error"
                  : ""
              }`}
            >
              <label className="add-list__description-label">
                Brief Description
              </label>
              <textarea
                className={`add-list__description-input ${
                  error && isEmpty(description, { ignore_whitespace: true })
                    ? "add-list__description-input--error"
                    : ""
                }`}
                type="text"
                name="description"
                autoComplete="off"
                value={description}
                placeholder="Enter movie list description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            {error && isEmpty(description, { ignore_whitespace: true }) ? (
              <div className="add-list__error-container">
                <span className="add-list__error-message">
                  Please fill out the required fields!
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="add-list__add-section">
              <div className="add-list__search-container">
                <label className="add-list__add-label">
                  Search for a film and add to list
                </label>
                <div className="add-list__input-container">
                  <input
                    className={`add-list__film-input ${
                      error && isEmpty(filmSearch, { ignore_whitespace: true })
                        ? "add-list__film-input--error"
                        : ""
                    }`}
                    type="text"
                    name="filmSearch"
                    autoComplete="off"
                    value={filmSearch}
                    placeholder="Enter name of film"
                    onChange={handleFilmSearch}
                  />
                  <button
                    className="add-list__add-button"
                    type="submit"
                    onClick={handleAddClick}
                  >
                    Add New Film
                  </button>
                </div>
                {(error && !filmSearch) || (saveIsClicked && isListEmpty) ? (
                  <div className="add-list__error-container">
                    <span className="add-list__error-message">
                      You need to enter at least one film to create list
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {error && filmSearch && !movieFound ? (
                  <div className="add-list__error-container">
                    <span className="add-list__error-message">
                      This movie does not match any movie in the database.
                      Please select a movie from the dropdown list.
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="add-list__position-container">
                  <div className="add-list__dropdown-container">
                    {moviesArray
                      .filter((movie) => {
                        const searchQuery = filmSearch.toLowerCase();
                        const movieName = movie.title.toLowerCase();
                        return (
                          searchQuery &&
                          movieName.includes(searchQuery) &&
                          isSearching
                        );
                      })
                      .map((movie) => {
                        return (
                          isSearching && (
                            <div
                              className="add-list__dropdown-item"
                              key={movie.id}
                              onClick={() => onSearch(movie.title)}
                            >
                              {movie.title}
                            </div>
                          )
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="add-list__save-section">
                <button
                  className="add-list__save-button"
                  type="submit"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <Link to="/" className="add-list__cancel-button" type="button">
                  Cancel
                </Link>
              </div>
            </div>
            <div className="add-list__added-films">
              {newFilmList.length > 0 ? (
                newFilmList.map((movie) => {
                  return (
                    <div className="add-list__new-film" key={movie.id}>
                      <div className="add-list__film-info">
                        <div className="add-list__img-container">
                          <img
                            src={imageBaseURL + movie.poster_path}
                            alt={movie.title}
                            className="add-list__film-img"
                          />
                        </div>
                        <div className="add-list__film-description">
                          <h3 className="add-list__film-name">{movie.title}</h3>
                          <p className="add-list__release-year">
                            {movie.release_date.substring(0, 4)}
                          </p>
                        </div>
                      </div>
                      <img
                        src={deleteIcon}
                        alt="Delete icon represented by an X symbol"
                        className="add-list__delete-icon"
                        onClick={() => handleDelete(movie.id)}
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  <h3 className="add-list__empty-title">
                    Your list is currently empty
                  </h3>
                  <p className="add-list__empty-description">
                    Add films by using the search feature and click on the Add
                    New Film button to add them to your new list
                  </p>
                </>
              )}
            </div>
          </form>
        </section>
      )}
    </>
  );
}
