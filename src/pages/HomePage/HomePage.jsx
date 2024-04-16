import { useEffect, useState } from "react";
import { getMovies } from "../../movies-api";

import css from "./HomePage.module.css";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import MoviesList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await getMovies(page);

        setMovies((e) =>
          movies.length > 0 ? [...e, ...data.results] : data.results
        );
        setTotalPage(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    handleSearch();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      {!error ? (
        <div>
          {movies.length > 0 && <h3 className={css.title}>Trending today</h3>}
          {movies.length > 0 && <MoviesList movies={movies} />}
          {loader && <Loader />}
          {movies.length > 0 && page * 20 < totalPage && (
            <LoadMoreBtn nextPage={nextPage} />
          )}
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};
export default HomePage;
