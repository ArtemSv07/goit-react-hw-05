import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ nextPage }) => {
  return (
    <button className={css.btn} onClick={() => nextPage()}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
