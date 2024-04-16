import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MoviesList = ({ movies }) => {
  return (
    <ul className={css.container}>
      {movies.map((elem) => (
        <li className={css.list} key={elem.id}>
          <Link to={`/movies/${elem.id}`}>
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
