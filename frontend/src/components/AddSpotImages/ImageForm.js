import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadImages } from "../../store/spotReducer";
import { loadSingleSpot } from "../../store/spotReducer";


const ImageForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId, userId} = useParams();
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    // const spot = useSelector((state) => state.spotReducer.spot[spotId])
    // console.log(spot)


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
        if(value.errors){
            return setErrors(value.errors)
        }

        history.push(`/api/users/${userId}/spots/${spotId}`)


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
                <button onClick={() => dispatch(loadSingleSpot(userId,spotId))} type='submit'>Add Image!</button>
            </form>
        </div>
    )
}



export default ImageForm;
