import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signup } from "../../store/session";
import "./SignUpFormPage.css";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password === confirmPassword) {

      const user = { username, email, password };
      const value = await dispatch(signup(user)).catch(async (err) => {
        const errors = await err.json();
        if (errors) {
          return errors
        }
      });
      if(value.errors){
        return setErrors(value.errors)
      }
    }
    if(password !== confirmPassword) {
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
    setUserName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
    history.push('/')

  };

  return (
    <div className="form-container sign-up">
      <form className="login-form-data sign-up" onSubmit={handleSubmit}>
        <div id="welcome">
          <label>Welcome to airbeanb !</label>
        </div>
        <div className="add-review-error">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
        <div className="credentials">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            className="credentials-input"
            required
            id="email"
          />
        </div>
        <div className="credentials">
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            className="credentials-input"
            required
            type="text"
            id="username"
          />
        </div>
        <div className="credentials">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="credentials-input"
            required
            type="password"
            id="password"
          />
        </div>
        <div className="credentials confirm">
          <label htmlFor="confirmPass">Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="credentials-input"
            required
            type="password"
            id="confirmPass"
          />
        </div>
        <div>
          <button className='login-btn-modal' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignupFormPage;
