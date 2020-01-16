import React from "react";

const PageOne = props => (
  <div className="page">
    <label htmlFor="title">Add a title for your recipe</label>
    <input
      id="title"
      onChange={props.handleChange}
      value={props.values.title}
      className="mb-2"
      placeholder="Chicken Tortilla Soup"
    />

    <div className="row flex-nowrap mb-2">
      <div className="col">
        <label htmlFor="servings" className="pt-2">
          Servings
        </label>
        <input
          id="servings"
          onChange={props.handleChange}
          value={props.values.servings}
          placeholder=""
        />
      </div>
      <div className="col">
        <label style={{ whiteSpace: "nowrap" }} className="pt-2">
          Difficulty
        </label>
        <select
          name="color"
          // value={values.color}
          // onChange={handleChange}
          // onBlur={handleBlur}
          style={{ display: "block" }}
        >
          <option value="Easy" label="Easy" />
          <option value="Medium" label="Medium" />
          <option value="Hard" label="Hard" />
        </select>
      </div>
    </div>

    <div className="row flex-nowrap pt-2">
      <div className="col">
        <label style={{ whiteSpace: "nowrap" }}>Prep Time</label>
        <input
          id="preptime"
          onChange={props.handleChange}
          value={props.values.preptime}
          className="mb-2 "
        />
      </div>
      <div className="col">
        <label style={{ whiteSpace: "nowrap" }}>Cook Time</label>

        <input
          id="cooktime"
          onChange={props.handleChange}
          value={props.values.cooktime}
          className="mb-2 "
        />
      </div>
      <div className="col">
        <label style={{ whiteSpace: "nowrap" }}>Total Time</label>
        <input
          id="totaltime"
          onChange={props.handleChange}
          value={props.values.totaltime}
          className="mb-2 "
        />
      </div>
    </div>
    <label htmlFor="title" className="pt-2">
      Add a short description
    </label>
    <input
      id="description"
      onChange={props.handleChange}
      value={props.values.description}
      placeholder="A delicous recipe handed down from my grandmother."
    />

    <div className="text-right">
      <button
        type="button"
        className="stepButton"
        onClick={props.navigateNext}
        disabled={!(props.values.title && props.values.description)}
      >
        Next
      </button>
    </div>
  </div>
);

export default PageOne;
