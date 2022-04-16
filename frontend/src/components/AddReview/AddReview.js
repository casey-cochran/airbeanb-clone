import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/spotReducer";

const AddReview = () => {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const review = {
            spotId,
            userId,
            review,
            rating,
        }
        const value = await dispatch(addReview(review)).catch(async (err) => {
            const errors = await err.json();
            if (errors) {
              return errors;
            }
          });
          if (value.errors) {
            return setErrors(value.errors);
          }
    }

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
            onChange={((e) => setReview)}
            value={review}
            />
        <label htmlFor='rating'>Rating</label>
        <input
        onChange={((e) => setRating)}
        required
        type='number'
        />
        <button>Add Review</button>
      </form>
    </>
  );
};

export default AddReview;
