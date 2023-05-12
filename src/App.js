import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MovieLists from "./pages/MovieLists/MovieLists";
import MovieHome from "./pages/MovieHome/MovieHome";
import NewMovieList from "./pages/NewMovieList/NewMovieList";
import EditMovieList from "./pages/EditMovieList/EditMovieList";
import SingleList from "./pages/SingleList/SingleList";
import AddNewMovie from "./pages/AddNewMovie/AddNewMovie";
import "./App.scss";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MovieHome />} />
            <Route path="/movie-lists" element={<MovieLists />} />
            <Route path="/movie-lists/:id" element={<SingleList />} />
            <Route path="/movie-lists/add" element={<NewMovieList />} />
            <Route path="/movie-lists/add/:id" element={<AddNewMovie />} />
            <Route path="/movie-lists/edit/:id" element={<EditMovieList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
