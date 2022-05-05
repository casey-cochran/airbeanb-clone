import React, { useEffect, useState } from 'react';
// import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm'
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import Modal from 'react-modal';
import './SignUpFormPage.css';

const SignupFormModal = ({setHideMenu, closeMenu}) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false)


  const customStyles = {
    content: {
      top: '55%',
      left: '50%',
      borderRadius: '10px',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  function openModal(e) {
    e.stopPropagation();
    setHideMenu('hidden-menu')
    document.removeEventListener('click', closeMenu)
    setIsOpen(true);
  }
  function closeModal() {
    closeMenu()
    setHideMenu('profile-dropdown2')
  }



  return (
    <>
      <div className='menu-btn-div'>
        <button className='btn primary form' id='login-btn' onClick={openModal}>Sign Up</button>
      </div>
       <div className='menu-btn-div'><button onClick={(() => dispatch(login({credential: 'demo@user.io', password: 'password'})))} className='btn primary form' >Demo User</button></div>

        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeModal}
          overlayClassName='overlay'
        >
          <SignupFormPage />
        </Modal>

    </>
  );
}

export default SignupFormModal;
