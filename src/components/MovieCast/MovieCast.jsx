import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cast } from "../../movies-api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [castData, setCastData] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const heandleCast = async () => {
      try {
        const data = await cast(movieId);
        setCastData(data.cast);
      } catch (error) {}
    };
    heandleCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {castData.length > 0 ? (
        <ul className={css.list}>
          {castData.map(({ name, profile_path, character, id }) => {
            return (
              <li key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                  height={320}
                  width={200}
                />
                <h3 className={css.text}>{name}</h3>
                <p className={css.text}>{character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>Тo cast information available</h3>
      )}
    </div>
  );
};

export default MovieCast;
