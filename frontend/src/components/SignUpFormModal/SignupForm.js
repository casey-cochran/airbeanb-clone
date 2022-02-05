import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import './SignUpFormPage.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if(sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === confirmPassword){
            setErrors([]);
            const user = {username, email, password};
            dispatch(signup(user)).catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })
        }else {
        return setErrors(['Confirm Password field must be the same as the Password field']);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                    onChange={(e => setEmail(e.target.value))}
                    type='email'
                    value={email}
                    required
                    id='email'
                    />
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                    onChange={(e => setUserName(e.target.value))}
                    value={username}
                    required
                    type='text'
                    id='username'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                    onChange={(e => setPassword(e.target.value))}
                    value={password}
                    required
                    type='password'
                    id='password'
                    />
                </div>
                <div>
                    <label htmlFor='confirmPass'>Confirm Password</label>
                    <input
                    onChange={(e => setConfirmPassword(e.target.value))}
                    value={confirmPassword}
                    required
                    type='password'
                    id='confirmPass'
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignupFormPage;
