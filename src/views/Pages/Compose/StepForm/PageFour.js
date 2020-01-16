import React from "react";

const PageFour = props => (
  <div className="page">
    <label htmlFor="image">Add Images</label>
    <input
      id="image"
      onChange={props.handleChange}
      value={props.values.image}
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
        type="submit"
        className="stepButton"
        // disabled={!(props.values && props.values)}
      >
        Submit
      </button>
    </div>
  </div>
);

export default PageFour;
