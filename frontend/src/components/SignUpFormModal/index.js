import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm'

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='menu-btn-div'>
        <button className='btn primary form' id='login-btn' onClick={() => setShowModal(true)}>Sign Up</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
