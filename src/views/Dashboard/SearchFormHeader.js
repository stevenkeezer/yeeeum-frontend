import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import "../../containers/DefaultLayout/DefaultHeader.css";
import "./SearchForm.css";

export default function SearchForm(props) {
  let history = useHistory();

  return (
    <Formik
      initialValues={{ search: "" }}
      validate={values => {}}
      onSubmit={async (values, { setSubmitting }) => {
        const data = {
          query: values.search
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data)
        };
        const response = await fetch(
          process.env.REACT_APP_BURL + "search",
          options
        );
        if (response.ok) {
          const data = await response.json();
          props.returnSearchResults(data);
          history.push("/search");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off" id="demo-2">
          <div className="mx-auto ">
            <Field
              style={{
                font: "1.32em",
                fontWeight: "700",
                color: "#ff4e00"
              }}
              type="search"
              name="search"
              className="search-form-font"
              placeholder="Search recipes"
            ></Field>
          </div>
          <button
            type="submit"
            style={{ position: "relative", display: "none" }}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
