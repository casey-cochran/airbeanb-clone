import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const user = { credential, password };

    return dispatch(login(user)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
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
