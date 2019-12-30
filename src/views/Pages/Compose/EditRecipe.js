import React, { useEffect, useState } from "react";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { TextField } from "formik-material-ui";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DescriptionIcon from "@material-ui/icons/Description";
import KitchenIcon from "@material-ui/icons/Kitchen";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import "./RecipeField.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export default function RecipeField(props) {
  const [recipe, setRecipe] = useState({ ingredients: [] });

  let history = useHistory();
  let { id } = useParams();

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  const get_post = async () => {
    const recipeId = {
      recipe_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(process.env.REACT_APP_BURL + "post", options);
    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
    }
  };

  useEffect(() => {
    get_post();
  }, []);

  return (
    <div>
      {recipe.title && recipe.ingredients && (
        <Formik
          initialValues={{
            description: recipe.description,
            ingredients: recipe.ingredients,
            title: recipe.title,
            directions: recipe.directions,
            file: null
          }}
          validate={values => {
            const errors = {};
            if (values.title === "") {
              errors.title = "Title Required";
            }
            if (values.ingredients[0] === "") {
              errors.ingredients = "Ingredients Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const data = {
              title: values.title,
              ingredients: values.ingredients,
              description: values.description,
              directions: values.directions,
              image_file: values.image_file,
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
              process.env.REACT_APP_BURL + "update_recipe",
              options
            );
            if (response.ok) {
              const data = await response.json();
              props.setToggleIcon(true);
              props.get_post();
              props.setEditable(false);
            }
          }}
          render={({ values }) => (
            <Form
              id="recipeForm"
              className="col-lg-6 col-11 col-sm-10 mx-auto mt-5"
            >
              <div className="row pt-3">
                <DescriptionIcon
                  className="ml-3"
                  style={{ color: "rgb(9, 162, 135)" }}
                />
                <h4 className="pl-2">Description</h4>
              </div>{" "}
              <Field
                width={{ minWidth: "100%" }}
                type="description"
                name="description"
                enableReinitialize={true}
                component="textarea"
                style={{
                  fontFamily: "AvenirNextLTProRegular",
                  fontSize: "16px"
                }}
              />
              <div className="row mt-3">
                <RestaurantIcon
                  className="ml-3"
                  style={{ color: "rgb(9, 162, 135)" }}
                />
                <h4 className="pl-2">Title</h4>
              </div>{" "}
              <Field
                style={{ width: "100%" }}
                type="title"
                name="title"
                className="pb-2"
                enableReinitialize={true}
                component={TextField}
              />
              <div className="row pt-3">
                <ShoppingCartIcon
                  className="ml-3"
                  style={{ color: "rgb(9, 162, 135)" }}
                />
                <h4 className="pl-2">Ingredients</h4>
              </div>
              <FieldArray
                name="ingredients"
                render={arrayHelpers => (
                  <div>
                    {values.ingredients && values.ingredients.length > 0 ? (
                      values.ingredients.map((ingredient, index) => (
                        <div key={index}>
                          <>
                            <Field
                              className="ingredientsField pr-2"
                              style={{
                                width: "25%",
                                fontFamily: "AvenirNextLTProRegular",
                                fontSize: "16px"
                              }}
                              name={`ingredients.${index}.amount`}
                              component={TextField}
                            />
                            <Field
                              className="ingredientsField-ingredients-edit  pb-2"
                              name={`ingredients.${index}.ingredient`}
                              component={TextField}
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
                          </>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all ingredient from the list */}
                        Add Ingredient
                      </button>
                    )}
                    <div className="col text-right">
                      <AddCircleIcon
                        style={{
                          marginTop: "-70px",
                          marginRight: "-5px",
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
              <ErrorMessage
                classname="p-3"
                name="ingredients"
                component="div"
              />
              <div className="row">
                <MenuBookIcon
                  className="ml-3"
                  style={{ color: "rgb(9, 162, 135)" }}
                />
                <h4 className="pl-2">Directions</h4>
              </div>
              <Field
                style={{
                  width: "100%",
                  fontFamily: "AvenirNextLTProRegular",
                  fontSize: "16px"
                }}
                type="directions"
                name="directions"
                component="textarea"
              />
              <ErrorMessage name="directions" component="div" />
              <div className="text-right">
                <Button
                  type="submit"
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
                </Button>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
}
