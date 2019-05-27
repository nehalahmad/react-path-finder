import React from "react";

const Loader = props => {
  return (
    props.isLoading && (
      <div className="loader-container">
        <div className="loader" />
      </div>
    )
  );
};

export default Loader;
