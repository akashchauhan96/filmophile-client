import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MovieLists from "./pages/MovieLists/MovieLists";
import MovieHome from "./pages/MovieHome/MovieHome";
import NewMovieList from "./pages/NewMovieList/NewMovieList";
import SingleList from "./pages/SingleList/SingleList";
import Footer from "./Components/Footer/Footer";
import "./App.scss";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MovieHome />} />
          <Route path="/movie-lists" element={<MovieLists />} />
          <Route path="/movie-lists/:id" element={<SingleList />} />
          <Route path="/movie-lists/add" element={<NewMovieList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
