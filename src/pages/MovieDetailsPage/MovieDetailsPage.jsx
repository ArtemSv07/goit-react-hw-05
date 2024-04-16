import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
import { PiArrowFatLinesLeftFill } from "react-icons/pi";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

import { movieDetails } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.noActive, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef("/movies");

  useEffect(() => {
    backLinkRef.current = location.state || "/movies";
  }, [location.state]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await movieDetails(movieId);

        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    handleSearch();
  }, [movieId]);

  return (
    <div>
      {!error ? (
        <>
          <div className={css.container}>
            <Link className={css.link} to={backLinkRef.current}>
              <PiArrowFatLinesLeftFill /> Go back
            </Link>
            {loader && <Loader />}

            <div className={css.movie}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                alt={`${movies.title} poster`}
                width={300}
                height={450}
              />
              <div className={css.boxText}>
                <h2 className={css.title}>{movies.title}</h2>
                <ul className={css.listText}>
                  <li>
                    <p>{movies.runtime} minutes;</p>
                  </li>
                  <li>
                    <p>release: {movies.release_date};</p>
                  </li>
                </ul>
                <h3>Description:</h3>
                <p className={css.paragraf}>{movies.overview}</p>
              </div>
            </div>
          </div>
          <div className={css.additional}>
            <ul className={css.link}>
              <li>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <Error />
      )}
    </div>
  );
};
export default MovieDetailsPage;
