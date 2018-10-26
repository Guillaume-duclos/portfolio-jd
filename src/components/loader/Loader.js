import React from 'react';

const Loader = (props) => {
  return (
    <div className="loading-page flex">
      <img src={props.gif} alt=""/>
    </div>
  );
};

export default Loader;