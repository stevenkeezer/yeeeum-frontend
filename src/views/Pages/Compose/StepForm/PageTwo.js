import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

const PageTwo = props => (
  <div className="page">
    <label htmlFor="ingredient">
      Here you can add ingredients for your dish.
    </label>
    <FieldArray
      name="ingredients"
      type="ingredients"
      render={arrayHelpers => (
        <div>
          {props.values.ingredients && props.values.ingredients.length > 0 ? (
            props.values.ingredients.map((ingredient, index) => (
              <div key={index} className="row flex-nowrap pl-3 pr-3">
                <Field
                  class="ingredientsField pr-2 pl-3"
                  placeholder=""
                  id="amount"
                  style={{ width: "26%" }}
                  name={`ingredients.${index}.amount`}
                />

                <Field
                  id="ingredients"
                  class="ingredientsField-ingredients pr-1 pb-2"
                  placeholder=""
                  name={`ingredients.${index}.ingredient`}
                  style={{ width: "74%" }}
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
                marginTop: "20px",
                marginRight: "1%",
                color: "grey"
              }}
              onClick={() => {
                arrayHelpers.push({
                  amount: "",
                  ingredient: ""
                });
              }}
            />
          </div>
        </div>
      )}
    />
    <div className="text-right">
      <button
        type="button"
        className="stepButton"
        onClick={props.navigateBack}
        disabled={props.pageIndex === 0}
      >
        Back
      </button>
      {console.log(props.values.ingredients[0].amount)}
      <button
        type="button"
        className="stepButton"
        onClick={props.navigateNext}
        disabled={
          !(
            props.values.ingredients[0].amount &&
            props.values.ingredients[0].ingredient
          )
        }
      >
        Next
      </button>
    </div>
  </div>
);

export default PageTwo;
