import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


const LoginFormModal = ({setHideMenu, closeMenu}) => {
  const [showModal, setShowModal] = useState(false);


  const click = (e) => {
    e.stopPropagation();
    setHideMenu('hidden-menu');
    document.removeEventListener('click', closeMenu);
    setShowModal(true);
  }

  const closeModal = () => {
    setHideMenu('profile-dropdown2');
    closeMenu()
    setShowModal(false)
  }

  return (
    <>
      <div className='menu-btn-div form'>
       <button className='btn primary form' id='login-btn' onClick={click}>Log In</button>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
