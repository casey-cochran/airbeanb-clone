import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='signup-btn'>
                <LoginFormModal />
                <NavLink to='/signup'>Sign Up</NavLink>
            </div>
        );
    }

    return (
        <ul className='testing'>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            <li>
                {isLoaded && sessionLinks}

            </li>
        </ul>
    )
}


export default Navigation;
