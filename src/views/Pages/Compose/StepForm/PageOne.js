import React, { useEffect, useState, useRef, createRef } from "react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import DifficultySlider from "./DifficultySlider";
import ServingSelector from "./ServingSelector";
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
          type="text"
          id="title"
          autoFocus={focus}
          // ref={inputEl}
          onClick={() => setFocus(true)}
          name="title"
          onChange={props.handleChange}
          value={props.values.title}
          className="mb-2 mt-2"
          placeholder="Chicken Tortilla Soup"
        ></Field>
        {/* <button onClick={() => setFocus(false)}>Click</button> */}
      </>
    );
  }

  return (
    <div>
      <div className="page">
        <label htmlFor="title">Title</label>
        <TextInputWithFocusButton />

        <div className="row  flex-nowrap mb-2">
          <div className="col">
            <div
              className="row d-flex align-items-center pl-3 mt-3"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <RestaurantIcon style={{ fontSize: "14px" }} className="mr-1" />
              <label htmlFor="servings" className="">
                Servings
              </label>
            </div>
            <div className="mt-2" onClick={() => setFocus(false)}>
              <ServingSelector />
            </div>
          </div>
          <div className="col">
            <label style={{ whiteSpace: "nowrap" }} className="mt-3">
              Difficulty
            </label>
            <DifficultySlider />
          </div>
        </div>

        <div className="row flex-nowrap pt-2 ">
          <div className="col">
            <div
              className=""
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <ScheduleIcon style={{ fontSize: "14px" }} />
              <label className="ml-1" style={{ whiteSpace: "nowrap" }}>
                Prep Time
              </label>
            </div>
            <Field
              id="preptime"
              onClick={() => setFocus(false)}
              onChange={props.handleChange}
              value={props.values.preptime}
              className="mb-2 mt-1"
              placeholder="10 Minutes"
            />
          </div>
          <div className="col">
            <div
              className=""
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <ScheduleIcon style={{ fontSize: "14px" }} />
              <label className="ml-1" style={{ whiteSpace: "nowrap" }}>
                Cook Time
              </label>
            </div>
            <Field
              id="cooktime"
              onClick={() => setFocus(false)}
              onChange={props.handleChange}
              value={props.values.cooktime}
              className="mb-2 mt-1"
              placeholder="50 Minutes"
            />
          </div>
          <div className="col">
            <div
              className=""
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <ScheduleIcon style={{ fontSize: "14px" }} />
              <label className="ml-1" style={{ whiteSpace: "nowrap" }}>
                Total Time
              </label>
            </div>
            <Field
              id="totaltime"
              onClick={() => setFocus(false)}
              onChange={props.handleChange}
              value={props.values.totaltime}
              className="mb-2 mt-1"
              placeholder="60 Minutes"
            />
          </div>
        </div>

        <div className="text-right mt-2">
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
