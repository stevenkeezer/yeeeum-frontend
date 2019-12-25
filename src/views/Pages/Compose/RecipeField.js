import React, { useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { TextField } from "formik-material-ui";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./RecipeField.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export default function RecipeField(props) {
  let history = useHistory();

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
    <div className="col-lg-8 mx-auto">
      <Formik
        initialValues={{
          ingredients: [{ amount: "", ingredient: "" }],
          title: "",
          directions: "",
          description: ""
        }}
        validate={values => {
          const errors = {};
          if (values.title === "") {
            errors.title = "Please enter a title for this recipe.";
          }
          if (values.ingredients[0].amount === "") {
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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          props.createRecipe(values);
        }}
        render={({ values, handleSubmit, setFieldValue }) => (
          <div>
            <Form id="recipeForm" className=" mx-auto ">
              <h4 className="">Title</h4>
              <Field
                style={{ width: "100%" }}
                placeholder="Chocolate Chip Cookies"
                type="title"
                name="title"
                className="pb-2 text-center"
                component={TextField}
              />
              <h4 className="mt-3">Description</h4>
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
                className="pb-2 "
              />
              <ErrorMessage
                className="error MuiFormHelperText-root Mui-error"
                name="description"
              />
              <h4 className="pt-3">Ingredients</h4>
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
                            style={{ width: "25%" }}
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
                              marginTop: "5px",
                              marginRight: "40px"
                            }}
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add Ingredient
                      </button>
                    )}

                    <div className="col text-right">
                      <AddCircleIcon
                        style={{
                          marginTop: "-70px",
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
              <h4>Directions</h4>
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
              <ErrorMessage
                className="error MuiFormHelperText-root Mui-error mb-5"
                name="directions"
              />
              <div>
                <a href="#" class="float">
                  <button
                    type="submit"
                    className="mr-auto"
                    style={{
                      border: "none",
                      background: "none",
                      outline: "none"
                    }}
                  >
                    <i class="fa fa-plus my-float"></i>
                  </button>
                </a>
              </div>
            </Form>
          </div>
        )}
      />
    </div>
  );
}
