import "./EditReview.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOneReivew } from "../../store/reviewsReducer";
import { Rating } from 'react-simple-star-rating'


const EditReview = ({ closeEditModal, spotId, userId, modalReview }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);


  const [review, setReview] = useState(modalReview.review);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);
  const reviewId = modalReview?.id

  const handleRating = (rate) => {
    setRating(rate / 20)
  }
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
        <form onSubmit={handleSubmit} className='add-review-form'>
          <div>
            {errors?.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
          <textarea
            onChange={((e) => setReview(e.target.value))}
            value={review}
            type='text'
            placeholder="Write a review"
            />
          <label htmlFor="rating">Please provide a new rating</label>
          <Rating onClick={handleRating} ratingValue={rating}
 />          <button className="review-btn">Edit</button>
        </form>
      </div>
    </>
  );
};

export default EditReview;
