import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/reviewsReducer";
import './AddReview.css';
import { Rating } from 'react-simple-star-rating';
import { loadSpotReviews } from "../../store/reviewsReducer";


const AddReview = ({spotId, userId, closeModal}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0)
  const handleRating = (rate) => {
    setRating(rate / 20)
  }

  const [review, setReview] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newReview = {
            spotId,
            userId,
            review,
            rating,
        }
        const value = await dispatch(addReview(newReview)).catch(async (err) => {
            const errors = await err.json();
            if (errors) {
              return errors;
            }
          });
          if (value.errors) {
            return setErrors(value.errors);
          }
          closeModal();
          dispatch(loadSpotReviews(spotId))
    }

  return (
    <>

      <form onSubmit={handleSubmit} className='add-review-form'>
        <div >
          {errors.map((error, index) => (
            <div class="add-review-error"key={index}>{error}</div>
          ))}
        </div>
        <textarea
            onChange={((e) => setReview(e.target.value))}
            value={review}
            type='text'
            placeholder="Write a review"
            />
        <label htmlFor='rating'>Rating</label>
        <Rating onClick={handleRating} ratingValue={rating} />
        <button className="review-btn">Add Review</button>
      </form>
    </>
  );
};

export default AddReview;
