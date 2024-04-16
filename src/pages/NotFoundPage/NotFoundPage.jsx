import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { PiArrowFatLinesLeftFill } from "react-icons/pi";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h2 className={css.text}>Not Found Page</h2>
      <Link className={css.link} to="/">
        <PiArrowFatLinesLeftFill /> Go home
      </Link>
    </div>
  );
};
export default NotFoundPage;
