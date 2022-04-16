import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import reviewsReducer, { addReview, loadSpotReviews } from "../../store/reviewsReducer";

const AddReview = ({spotId, userId}) => {
  const dispatch = useDispatch();
const spotReviews = useSelector((state) => Object.values(state.reviewsReducer?.Reviews))

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
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
    }

    useEffect(() => {
        dispatch(loadSpotReviews(spotId))
    },[dispatch])

  return (
    <>
      <h2>hello from add review</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <label htmlFor="review">Review</label>
        <input
            onChange={((e) => setReview(e.target.value))}
            value={review}
            type='text'
            />
        <label htmlFor='rating'>Rating</label>
        <input
        onChange={((e) => setRating(e.target.value))}
        required
        type='number'
        />
        <button>Add Review</button>
      </form>
      <div>
          {spotReviews.map((review) => {
              return (
                <div>
                    {review.review},  {review.rating}
                </div>
              )
          })}
      </div>
    </>
  );
};

export default AddReview;
