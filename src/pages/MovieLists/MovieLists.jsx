import "./MovieLists.scss";
import CreateListButton from "../../Components/CreateListButton/CreateListButton";
import MovieListCards from "../../Components/MovieListCards/MovieListCards";

export default function MovieLists() {
  return (
    <section className="movie-lists">
      <CreateListButton />
      <MovieListCards />
    </section>
  );
}
