import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { TextField } from "formik-material-ui";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DescriptionIcon from "@material-ui/icons/Description";
import CircularProgress from "@material-ui/core/CircularProgress";
import KitchenIcon from "@material-ui/icons/Kitchen";
import { green } from "@material-ui/core/colors";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import "./RecipeField.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function RecipeField(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  let history = useHistory();

  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setPlaceholder();
  });

  const setPlaceholder = () => {
    document
      .getElementsByName("ingredients.0.ingredient")[0]
      .setAttribute("placeholder", "Sugar");

    document
      .getElementsByName("ingredients.0.amount")[0]
      .setAttribute("placeholder", "1 cup");
  };

  return (
    <Formik
      initialValues={{
        ingredients: [
          { amount: "", ingredient: "" },
          { amount: "", ingredient: "" },
          { amount: "", ingredient: "" }
        ],
        title: "",
        directions: "",
        description: ""
      }}
      validate={values => {
        const errors = {};
        if (values.title === "") {
          errors.title = "Please enter a title for this recipe.";
        }
        if (values.ingredients && values.ingredients[0].amount === "") {
          errors.ingredients = "Ingredients Required";
        }
        if (values.directions === "") {
          errors.directions = "Directions Required";
        }
        if (values.description === "") {
          errors.description = "Description Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm, handleSubmit }) => {
        setSubmitting(true);
        props.createRecipe(values);
      }}
      render={({ values, handleSubmit, setFieldValue }) => (
        <div className="col-xl-6 col-lg-9 col-sm-10 col-md-8 mx-auto justify-content-center d-flex recipe-entry">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h3>Recipe Editor</h3>
            <div className="row mt-3">
              <RestaurantIcon
                className="ml-3"
                style={{ color: "rgb(9, 162, 135)" }}
              />
              <h4 className="pl-2">Title</h4>
            </div>
            <Field
              style={{ width: "100%" }}
              placeholder="Chocolate Chip Cookies"
              type="title"
              name="title"
              className="pb-2 text-center"
              component={TextField}
            />
            <div className="row pt-3">
              <DescriptionIcon
                className="ml-3"
                style={{ color: "rgb(9, 162, 135)" }}
              />
              <h4 className="pl-2">Description</h4>
            </div>
            <Field
              style={{
                width: "100%",
                height: "50px",
                fontFamily: "AvenirNextLTProRegular"
              }}
              placeholder="A delicous recipe from my grandmother..."
              type="description"
              name="description"
              component="textarea"
              className="pb-2"
            />
            <span className="error-message">
              <ErrorMessage
                className="error MuiFormHelperText-root Mui-error"
                name="description"
              />
            </span>
            <div className="row pt-3">
              <ShoppingCartIcon
                className="ml-3"
                style={{ color: "rgb(9, 162, 135)" }}
              />
              <h4 className="pl-2">Ingredients</h4>
            </div>
            <FieldArray
              name="ingredients"
              type="ingredients"
              render={arrayHelpers => (
                <div>
                  {values.ingredients && values.ingredients.length > 0 ? (
                    values.ingredients.map((ingredient, index) => (
                      <div key={index} className="row">
                        <Field
                          class="ingredientsField pr-2 pl-3"
                          placeholder=""
                          style={{ width: "26%" }}
                          name={`ingredients.${index}.amount`}
                          component={TextField}
                        />

                        <Field
                          class="ingredientsField-ingredients pr-1 pb-2"
                          placeholder=""
                          name={`ingredients.${index}.ingredient`}
                          component={TextField}
                          fullWidth="true"
                        />

                        <DeleteIcon
                          style={{
                            color: "grey",
                            marginTop: "5px"
                          }}
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      Add Ingredient
                    </button>
                  )}

                  <div className="col text-right">
                    <AddCircleIcon
                      style={{
                        marginTop: "-70px",
                        marginRight: "1%",
                        color: "grey"
                      }}
                      onClick={() => {
                        arrayHelpers.push({ amount: "", ingredient: "" });
                      }}
                    />
                  </div>
                </div>
              )}
            />
            <div className="row">
              <MenuBookIcon
                className="ml-3"
                style={{ color: "rgb(9, 162, 135)" }}
              />
              <h4 className="pl-2">Directions</h4>
            </div>
            <Field
              placeholder="Stir all ingredients in a medium sized..."
              className="direction-field"
              style={{
                width: "100%",
                height: "60px",
                fontFamily: "AvenirNextLTProRegular"
              }}
              type="directions"
              name="directions"
              component="textarea"
            />
            <span class="error-message">
              <ErrorMessage
                className="error MuiFormHelperText-root Mui-error mb-5"
                name="directions"
              />
            </span>
            <div className="text-right">
              {/* <Button
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  handleSubmit(true);
                }}
                variant="contained"
                style={{
                  backgroundColor: "#09a287",
                  color: "white",
                  marginTop: "2rem"
                }}
                size="large"
                id="submit-recipe-btn"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button> */}
              <div className={classes.root}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={() => {
                      handleButtonClick();
                      handleSubmit(true);
                    }}
                  >
                    Submit Recipe
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    />
  );
}
