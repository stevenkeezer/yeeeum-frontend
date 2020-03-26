import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../Recipe.css";

export default function Comments(props) {
  let { id } = useParams();
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const data = {
          comment: values.comment,
          recipe_id: id
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
          process.env.REACT_APP_BURL + "comment",
          options
        );
        if (response.ok) {
          const data = await response.json();
          resetForm({});
          props.get_comments();
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="col-12 p-3  mx-auto">
          <hr style={{ border: "0.6px solid #e3e3e3" }}></hr>

          <Form>
            <div className="row pl-3">
              {!props.userImg && props.fbId && (
                <img
                  width="50px"
                  alt=""
                  style={{ alignSelf: "center" }}
                  className="rounded-circle "
                  src={`https://graph.facebook.com/${props.fbId}/picture?type=square`}
                ></img>
              )}

              {props.userImg && (
                <div
                  className="avatar2 "
                  style={{
                    backgroundImage: `url(https://yeeeum.s3-us-west-1.amazonaws.com/${props.userImg})`
                  }}
                ></div>
              )}

              {!props.userImg && !props.fbId && (
                <img
                  alt=""
                  className="rounded-circle"
                  style={{ alignSelf: "center" }}
                  src="/assets/img/default.png"
                  width="50px"
                ></img>
              )}

              <Field
                className="recipe-text"
                type="comment"
                style={{
                  width: "80%",
                  marginTop: "11px",

                  // height: "60px",
                  border: "none",
                  // outline: "none"
                  paddingLeft: "20px"
                }}
                name="comment"
                placeholder="Write your review or comment here"
              />
            </div>
            <ErrorMessage name="comment" component="div" />
            <button
              className="btn mt-3 recipe-text"
              style={{
                padding: ".4rem 1.5rem",
                backgroundColor: "#00a287",
                color: "white",
                borderRadius: "5rem"
              }}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
          <hr style={{ border: "0.6px solid #e3e3e3" }}></hr>
        </div>
      )}
    </Formik>
  );
}
