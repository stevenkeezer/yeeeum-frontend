import React, { useEffect, useState, useRef, createRef } from "react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import DifficultySlider from "./DifficultySlider";
import ServingSelector from "./ServingSelector";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

export default function PageOne(props) {
  const [focus, setFocus] = useState(true);

  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };

    return (
      <>
        <Field
          component={TextField}
          variant="filled"
          type="text"
          id="title"
          label="Title"
          style={{ minWidth: "100%" }}
          // autoFocus={focus}

          // ref={inputEl}
          onClick={() => setFocus(true)}
          name="title"
          onChange={props.handleChange}
          value={props.values.title}
          className=""
        ></Field>
        {/* <button onClick={() => setFocus(false)}>Click</button> */}
      </>
    );
  }

  return (
    <div>
      <div className="page">
        <TextInputWithFocusButton />

        <div className="row flex-nowrap mb-3 mt-4 ">
          <div className="col">
            <div
              className="row d-flex align-items-center pl-3 "
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              {/* <RestaurantIcon style={{ fontSize: "14px" }} className="mr-1" />
              <label htmlFor="servings" className="">
                Servings
              </label> */}
            </div>
            <div className="mt-2" onClick={() => setFocus(false)}>
              <ServingSelector />
            </div>
          </div>
          <div className="col">
            {/* <label style={{ whiteSpace: "nowrap" }} className="mt-3">
              Difficulty
            </label> */}
            <DifficultySlider />
          </div>
        </div>

        <div className="row flex-nowrap pt-4">
          <div className="col">
            <div
              className=""
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              {/* <ScheduleIcon style={{ fontSize: "14px" }} /> */}
            </div>
            <Field
              component={TextField}
              variant="filled"
              type="text"
              id="preptime"
              label="Prep time"
              style={{ color: "#dddddd" }}
              onClick={() => setFocus(true)}
              name="prep"
              onChange={props.handleChange}
              value={props.values.preptime}
            ></Field>
          </div>
          <div className="col">
            <Field
              component={TextField}
              variant="filled"
              type="text"
              id="cooktime"
              label="Cook time"
              style={{ color: "#dddddd" }}
              onClick={() => setFocus(true)}
              name="cook"
              onChange={props.handleChange}
              value={props.values.cooktime}
            ></Field>
          </div>
          <div className="col">
            <Field
              component={TextField}
              variant="filled"
              type="text"
              id="totaltime"
              label="Total time"
              style={{ color: "#dddddd" }}
              onClick={() => setFocus(true)}
              name="total"
              onChange={props.handleChange}
              value={props.values.totaltime}
            ></Field>
          </div>
        </div>

        <div className="text-right mt-5">
          <button
            type="button"
            className="stepButton mt-2"
            onClick={props.navigateNext}
            disabled={!props.values.title}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
