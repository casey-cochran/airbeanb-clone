import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddReview = () => {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState([]);

  return (
    <>
      <h2>hello from add review</h2>
      <form>
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
