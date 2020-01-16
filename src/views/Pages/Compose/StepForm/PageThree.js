import React from "react";

const PageThree = props => (
  <div className="page">
    <label htmlFor="directions">
      Add the necessary instructions required to make your recipe
    </label>
    <input
      id="directions"
      onChange={props.handleChange}
      value={props.values.directions}
    />
    <div className="text-right">
      <button
        type="button"
        className="stepButton"
        onClick={props.navigateBack}
        disabled={props.pageIndex === 0}
      >
        Back
      </button>
      <button
        type="button"
        className="stepButton"
        onClick={props.navigateNext}
        disabled={!props.values.directions}
      >
        Next
      </button>
    </div>
  </div>
);

export default PageThree;
