import "./AllSpotReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadSpotReviews, deleteOneReview } from "../../store/reviewsReducer";
import AddReview from "../AddReview/AddReview";
import Modal from "react-modal";
import {BsTrash} from 'react-icons/bs'
import {FiEdit2} from 'react-icons/fi'

const AllSpotReviews = ({ spotId, userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spotReviews = useSelector((state) =>
    Object.values(state.reviewsReducer?.Reviews)
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(loadSpotReviews(spotId));
  }, [dispatch]);

  return (
    <div className="all-spot-reviews">
      <div>
        <div className="add-review-title">
          <p>Reviews by guests</p>
          <button onClick={openModal}>Add Review</button>
        </div>
        <div className="reviews-list-cont">
          {spotReviews.map((review, i) => {
            return (
              <div key={i} className='reviews-list'>
                <div >
                  {review.review}, {review.rating}
                </div>
                {user?.id === review.userId && (
                  <div>
                    <BsTrash onClick={() => dispatch(deleteOneReview(review))}/>
                    {/* <FiEdit2 onClick={(() =>)}/> */}

                  </div>
                )}
              </div>
            );
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
      </div>
    </div>
  );
};

export default AllSpotReviews;