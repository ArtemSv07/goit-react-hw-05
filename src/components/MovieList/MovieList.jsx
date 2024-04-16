import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.container}>
      {movies.map((elem) => (
        <li className={css.list} key={elem.id}>
          <Link to={`/movies/${elem.id}`} state={location}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
                alt={`${elem.title} poster`}
                width={300}
                height={450}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
