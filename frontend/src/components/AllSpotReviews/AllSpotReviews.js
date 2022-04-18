import './AllSpotReviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadSpotReviews, deleteOneReview } from '../../store/reviewsReducer';
import AddReview from '../AddReview/AddReview';
import Modal from 'react-modal';



const AllSpotReviews = ({spotId, userId}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const spotReviews = useSelector((state) => Object.values(state.reviewsReducer?.Reviews))
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      function openModal() {
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }



    useEffect(() => {
        dispatch(loadSpotReviews(spotId))
    },[dispatch])


    return (
        <>
            <div>
                <h2>Add review here</h2>
                <button onClick={openModal}>Add Review</button>
            </div>
            <div>
          {spotReviews.map((review, i) => {
              return (
                  <>
                <div>
                    {review.review},  {review.rating}
                </div>
                {user?.id === review.userId && <>
                <button onClick={(() => dispatch(deleteOneReview(review)))}>delete</button>
                <button>edit</button>
         </> }
                </>
              )
          })}
      </div>
      <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          >
          <AddReview spotId={spotId} userId={userId} openModal={openModal} />

          </Modal>
        </>
    )
}


export default AllSpotReviews;
