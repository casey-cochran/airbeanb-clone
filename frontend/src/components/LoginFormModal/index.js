import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);


  const click = (e) => {
    e.stopPropagation();
   // document.removeEventListener('mousedown', clickOutside)
    setShowModal(true)
  }

  return (
    <>
      <div className='menu-btn-div form'>
       <button className='btn primary form' id='login-btn' onClick={click}>Log In</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
