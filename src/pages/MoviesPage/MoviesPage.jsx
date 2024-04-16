import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api";
import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { FcSearch } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MovieList/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const valueInput = searchParams.get("value");

  const handleSubmit = (value, actions) => {
    setTotalPage(0);
    setMovies([]);
    setPage(1);
    !value.name
      ? toast("Text must be entered to search for movies")
      : setSearchParams({ value: value.name });

    actions.resetForm();
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!valueInput) return;
    const handleSearch = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await searchMovies(valueInput, page);

        setTotalPage(data.total_pages);
        setMovies((e) =>
          movies.length > 0 ? [...e, ...data.results] : data.results
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    handleSearch();
  }, [searchParams, page]);

  return (
    <div>
      <div className={css.containerForm}>
        <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <Field
              className={css.input}
              autoComplete="off"
              autoFocus
              type="text"
              name="name"
              placeholder="Search movies"
            />

            <button className={css.btn} type="submit">
              <FcSearch />
            </button>
            <Toaster position="top-center" />
          </Form>
        </Formik>
      </div>
      {!error ? movies.length > 0 && <MoviesList movies={movies} /> : <Error />}
      {loader && <Loader />}
      {movies.length > 0 && page * 20 < totalPage && (
        <LoadMoreBtn nextPage={nextPage} />
      )}
    </div>
  );
};
export default MoviesPage;
