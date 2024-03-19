interface Props {
  rating: number;
  numReviews?: number;
  caption?: string;
}
const Rating = ({ rating, numReviews, caption }: Props) => {
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? "fas fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : numReviews != 0 ? (
        <span>
          <span style={{ color: "rgba(92,108,117,.75)", fontSize:  "13px", marginLeft: "5px" }}>{rating}</span>{" "}
          <span style={{ color: "rgba(92,108,117,.75)", fontSize:  "13px" }}>
            {"(" + numReviews + ")"}
          </span>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Rating;
