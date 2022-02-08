import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadImages } from "../../store/spotReducer";

const ImageForm = () => {
    const dispatch = useDispatch();
    const historu = useHistory();
    const {spotId} = useParams();
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const image = {
            spotId,
            url
        }
        const value = await dispatch(loadImages(image)).catch(async (err) => {
            const errors = await err.json();
            if(errors) return errors
        })
        //console.log('value on frontend', value);

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <ul>
                {errors?.map((error, index) => (
                <li key={index}>{error}</li>
                ))}
                </ul>
                <div>
                    <label htmlFor='url'>Enter Image Url below</label>
                    <input
                        onChange={((e) => setUrl(e.target.value))}
                        value={url}
                        type='text'
                        id='url'
                    />
                </div>
                <button type='submit'>Add Image!</button>
            </form>
        </div>
    )
}



export default ImageForm;
