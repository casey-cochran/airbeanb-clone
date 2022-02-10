import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = { credential, password };

    const value = await dispatch(login(user)).catch(async (err) => {
      const errors = await err.json();
      if (errors){
        return errors
      }
    });
    if(value.errors){
      return setErrors(value.errors)
    }

    setCredential('');
    setPassword('')
    setErrors([])
    history.push('/');

  };


  return (
    <div className="form-container">
      <form className='login-form-data' onSubmit={handleSubmit}>
        <div id='welcome'>
          <label>Welcome to airbeanb !</label>
        </div>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <div className="credentials">
          <label htmlFor="credential">Username or Email</label>
          <input
            onChange={(e) => setCredential(e.target.value)}
            value={credential}
            id="credential"
            type="text"
            className="credentials-input"
            required
            placeholder="Username or Email"
          />
        </div>
        <div className="credentials password">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            type="password"
            placeholder='Password'
            className="credentials-input password"
            required
          />
        </div>
        <div>
          <button className='login-btn-modal' type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
