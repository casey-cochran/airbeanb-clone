import "./EditReview.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editOneReivew } from "../../store/reviewsReducer";


const EditReview = ({ closeEditModal, spotId, userId, modalReview }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);
  const reviewId = modalReview?.id

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editReview = {
      spotId,
      userId,
      review,
      rating,
      reviewId
    };
    const value = await dispatch(editOneReivew(editReview)).catch(
      async (err) => {
        const errors = await err.json();
        if (errors) {
          return errors;
        }
      }
    );
    if (value.errors) {
      return setErrors(value.errors);
    }
    closeEditModal();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {errors?.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
          <label htmlFor="review">Review</label>
          <input
            onChange={(e) => setReview(e.target.value)}
            value={review}
            type="text"
          />
          <label htmlFor="rating">Rating</label>
          <input
            onChange={(e) => setRating(e.target.value)}
            required
            type="number"
          />
          <button>Edit</button>
        </form>
      </div>
    </>
  );
};

export default EditReview;
