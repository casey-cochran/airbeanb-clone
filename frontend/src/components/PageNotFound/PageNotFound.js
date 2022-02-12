import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="error-main-cont">
      <div className="not-found-cont">
        <p id="error-header"> 404</p>
        <div className="error-text head">
          <p>You won't find your next adventure here...</p>
        </div>
        <div>
            <p className="error-text">Try Looking <Link id='error-lnk' to='/'>Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
