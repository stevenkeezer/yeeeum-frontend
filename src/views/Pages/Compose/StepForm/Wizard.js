import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "./helper";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageFour from "./PageFour";
import PageThree from "./PageThree";

import "./helper.css";
import Wiz from "./Wiz";

const initialValues = {
  title: "",
  description: "",
  ingredients: [
    { amount: "", ingredient: "" },
    { amount: "", ingredient: "" },
    { amount: "", ingredient: "" }
  ],
  directions: "",
  image: ""
};

class Wizard extends Component {
  state = {
    pageIndex: 0
  };

  render() {
    return (
      <Wiz pages={[PageOne, PageTwo, PageThree, PageFour]}>
        {wizProps => (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                title: Yup.string().required("Required")
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(true);
                  this.props.createRecipe(values);
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {props => {
                const { handleSubmit } = props;
                return (
                  <>
                    <form
                      onSubmit={handleSubmit}
                      className=""
                      style={{
                        backgroundColor: "#ffffff",
                        // border: "25px solid rgba(211, 211, 211, 0.6)",
                        borderRadius: "10px"
                      }}
                    >
                      {wizProps.renderPage(props)}
                      {this.props.getProgress(wizProps)}
                    </form>
                  </>
                );
              }}
            </Formik>
          </div>
        )}
      </Wiz>
    );
  }

  _navigateBack = () => {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex - 1 < 0 ? prevState.pageIndex - 1 : 0
    }));
  };

  _navigateNext = () => {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex + 1
    }));
  };

  _renderPage(props) {
    const { pageIndex } = this.state;
    const pageHash = {
      0: PageOne,
      1: PageTwo,
      3: PageThree,
      4: PageFour
    };

    const Page = pageHash[pageIndex];

    return (
      <Page
        {...props}
        navigateBack={this._navigateBack}
        navigateNext={this._navigateNext}
        pageIndex={pageIndex}
      />
    );
  }
}

export default Wizard;
