import React from "react";
import "./CategorySlider.css";

const containerStyle = {
  display: "flex",
  paddingLeft: "0px",
  paddingRight: "0px",
  overflow: "scroll",
  overflowX: "auto"
};
export default function CategorySlider() {
  return (
    <div
      className="sort-ingredients-container"
      style={{
        overflow: "hidden"
      }}
    >
      <div className="col pl-2" style={containerStyle}>
        <div className="col text-center" style={{ paddingLeft: "0px" }}>
          <img
            src="https://source.unsplash.com/120x121/?food"
            className="rounded-circle "
            alt="Bhutan"
          />
          <h5 className="mt-2">Chicken Breasts</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x122/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Chicken</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x123/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Salad</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x124/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Salmon</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x125/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Asparagus</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x126/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Beef</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x127/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Chicken Thighs</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x128/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Fried</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x129/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Bread</h5>
        </div>
        <div className="col text-center">
          <img
            src="https://source.unsplash.com/120x120/?food"
            className="rounded-circle "
            alt="Bhutan"
          />

          <h5 className="mt-2">Vegan</h5>
        </div>
      </div>
    </div>
  );
}
