import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MovieLists from "./pages/MovieLists/MovieLists";
import MovieHome from "./pages/MovieHome/MovieHome";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import NewMovieList from "./pages/NewMovieList/NewMovieList";
import SingleMovieList from "./pages/SingleMovieList/SingleMovieList";
import Footer from "./Components/Footer/Footer";
import "./App.scss";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MovieHome />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          {/* <Route path="/movie-lists/:id" element={<SingleMovieList />} /> */}
          <Route path="/movie-lists" element={<MovieLists />} />
          <Route path="/movie-lists/add" element={<NewMovieList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
