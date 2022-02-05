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
      <button onClick={click}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
