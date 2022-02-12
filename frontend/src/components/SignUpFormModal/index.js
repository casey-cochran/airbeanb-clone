import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm'
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

const SignupFormModal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='menu-btn-div'>
        <button className='btn primary form' id='login-btn' onClick={() => setShowModal(true)}>Sign Up</button>
      </div>
       <div className='menu-btn-div'><button onClick={(() => dispatch(login({credential: 'demo@user.io', password: 'password'})))} className='btn primary form' >Demo User</button></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
