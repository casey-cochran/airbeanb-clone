import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="under-navbar">.</div>
      <div className="container-children one">
        <div className="where-to-go">
          <h2>Not sure where to go? Perfect.</h2>
          <Link to="/spots" className="flexible all-links">
            I'm flexible
          </Link>
        </div>
      </div>
      <div id="gap-space-under"> test </div>
      <div className="container-children two">
        <h2 className="insp-header">Inspiration for your next trip</h2>
        <div className="inspiration">
          <div className="insp-box-children one">
            <img src="https://m.media-amazon.com/images/I/71h-waAyTVL._AC_SY606_.jpg" />
            <p className="insp-box-text">Seattle</p>
          </div>
          <div className="insp-box-children two">
            <img src="https://m.media-amazon.com/images/I/81-NfKLyOYL._AC_SL1500_.jpg" />
            <p className="insp-box-text">Moscow</p>
          </div>
          <div className="insp-box-children three">
            <img src="https://m.media-amazon.com/images/I/71+ViZbDVCL._AC_SY450_.jpg" />
            <p className="insp-box-text">New York City</p>
          </div>
          <div className="insp-box-children four">
            <img src="https://m.media-amazon.com/images/I/712Vyiz8ToL._AC_SY679_.jpg" />
            <p className="insp-box-text">San Francisco</p>
          </div>
        </div>
      </div>
      <h2 className="insp-header"> Discover Airbeanb Experiences </h2>
      <div className="container-children three">
        <img
          src="https://visitutahkenticoprod.blob.core.windows.net/cmsroot/visitutah/media/site-assets/three-season-photography/mighty-5/zion/zion-national-park_the-narrows_istock.jpg"
          alt="narrows picture"
        />
        <img
          src="https://i.pinimg.com/originals/09/2b/c4/092bc4a3192ecd5ae9589be9a0d8ab90.jpg"
          alt="rustic cabin"
        />
      </div>
      <h2 className="insp-header"> Learn More About Me</h2>
      <div className="container-children four">
        <div>
          <Link
            to={{ pathname: "https://github.com/casey-cochran" }}
            target="_blank"
            className="footer-text"
          >
            Github
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "https://linkedin.com/in/casey-cochran-488420219/",
            }}
            target="_blank"
            className="footer-text"
          >
            Linkedin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
