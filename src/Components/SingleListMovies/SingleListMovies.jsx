import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleListMovies.scss";
import userPic from "../../assets/images/user-profile-pic.jpg";
import editIcon from "../../assets/icons/edit-icon.svg";
import { useNavigate } from "react-router-dom";

export default function SingleListMovies() {
  const [moviesOnList, setMoviesOnList] = useState([]);

  const serverURL = process.env.REACT_APP_SERVER_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneMovieList = async () => {
      try {
        const resp = await axios.get(`${serverURL}/movie-lists/${id}`);
        setMoviesOnList(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOneMovieList();
  }, []);

  const handleOnClick = () => {
    navigate(`/movie-lists/edit/${id}`);
  };

  if (moviesOnList.length !== 0) {
    console.log(moviesOnList);
    return (
      <section className="single-list">
        <div className="single-list__hero-container">
          <img
            className="single-list__hero-img"
            src={moviesOnList[0].backdrop_url}
            alt="The hero image represented by the first image of the movie on the list"
          />
        </div>
        <div className="single-list__user">
          <div className="single-list__profile-container">
            <img
              className="single-list__profile-pic"
              src={userPic}
              alt="Profile picture of user who created this movie list"
            />
          </div>
          <span className="single-list__user-details">
            List created by Akash Chauhan
          </span>
        </div>
        <h2 className="single-list__title">{moviesOnList[0].name}</h2>
        <p className="single-list__description">
          {moviesOnList[0].description}
        </p>
        <div className="single-list__button-container">
          <button className="single-list__edit-list" onClick={handleOnClick}>
            <img src={editIcon} alt="Edit icon represented by a pencil" />
            Edit This Movie List
          </button>
        </div>
        <div className="single-list__movies">
          {moviesOnList.map((movie) => {
            return (
              <div className="single-list__movie-card" key={movie.id}>
                <div className="single-list__image-container">
                  <img
                    className="single-list__movie-image"
                    src={movie.image_url}
                    alt="Image of movie belonging to this particular list"
                  />
                  <div className="single-list__movie-info">
                    <p className="single-list__movie-title">
                      {movie.movie_name}
                    </p>
                    <p className="single-list__movie-release">
                      {movie.release_year}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
