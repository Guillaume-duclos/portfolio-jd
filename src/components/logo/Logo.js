import React from 'react';
import JD from '../../assets/logo.svg';
import Tilt from 'react-tilt';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Tilt className="logo clickable" options={{ max: 25, scale: 1 }}>
      <Link to="/Home">
        <div>
          <div>
            <div></div>
          </div>
          <div>
            <img src={JD} alt=""/>
          </div>
        </div>
        <div>
          <div></div>
          <div className="flex row">
            <p>GRAPHIC & WEB DESIGNER</p>
          </div>
          <div></div>
        </div>
      </Link>
    </Tilt>
  );
};

export default Logo;