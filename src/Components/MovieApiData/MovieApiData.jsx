import axios from "axios";
import { useEffect, useState } from "react";
import SingleMoviePoster from "../SingleMoviePoster/SingleMoviePoster";

export default function MovieApiData() {
  const [moviesArray, setMoviesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  // const [totalMovies, setTotalMovies] = useState(null);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  let items = [];

  for (let i = 1; i <= 10; i++) {
    items[i - 1] = i;
  }

  useEffect(() => {
    let count = 1;
    const axiosBaseURL = process.env.REACT_APP_TMDB_API_BASE_URL;
    const axiosApi = process.env.REACT_APP_API_KEY_QUERY;
    const axiosURL = axiosBaseURL + axiosApi;
    let movies = [];
    const getMovies = async (count) => {
      setLoading(true);
      try {
        const resp = await axios.get(
          `${axiosBaseURL}/discover/movie${axiosApi}&page=${count}`
        );
        // .get(`${axiosBaseURL}/discover/movie${axiosApi}&page=${count}`)
        if (count <= 4) {
          count++;
          getMovies(count);
          movies = movies.concat(resp.data.results);
        } else {
          setMoviesArray(movies);
          // paginatedItems(itemsPerPage, movieArray);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovies(count);
  }, []);

  // function paginatedItems(itemsPerPage, totalMovies) {
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   const currentItems = items.slice(itemOffset, endOffset);
  //   console.log(currentItems);
  //   const pageCount = Math.ceil(items.length / itemsPerPage);

  //   const handlePageClick = (event) => {
  //     const newOffset = (event.selected * itemsPerPage) % items.length;
  //     console.log(
  //       `User requested page number ${event.selected}, which is offset ${newOffset}`
  //     );
  //     setItemOffset(newOffset);
  //   };

  return (
    <>
      <div>Hello</div>
      <SingleMoviePoster moviesArray={moviesArray} loading={loading} />
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      /> */}
    </>
  );
}
