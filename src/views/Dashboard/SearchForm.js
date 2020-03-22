import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
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
          console.log(data);
          props.returnSearchResults(data);
          history.push("/search");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="search-form">
          <div
            className="col-lg-7 col-md-6 col-sm-8 mx-auto"
            style={{ maxWidth: "630px" }}
          >
            <SearchIcon
              style={{
                position: "absolute",
                marginTop: "16px",
                marginLeft: "25px",
                fontSize: 28,
                color: "#4a4a4a",
                transform: "rotateY(180deg)"
              }}
            />
            <Field
              className="search-form-font"
              style={{
                paddingLeft: "68px",
                fontSize: "1em",
                fontWeight: "700",
                color: "#f15924"
              }}
              autocomplete="off"
              type="search"
              name="search"
              className="email-field"
              placeholder="Search recipes & get cooking"
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
