import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function StepProgressBar(props) {
  return (
    <ProgressBar
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      percent={props.progress}
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`indexedStep transitionStep ${
              accomplished ? "accomplished" : null
            }`}
          >
            {index + 1}
          </div>
        )}
      </Step>

      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`indexedStep transitionStep ${
              accomplished ? "accomplished" : null
            }`}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`indexedStep transitionStep ${
              accomplished ? "accomplished" : null
            }`}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`indexedStep transitionStep ${
              accomplished ? "accomplished" : null
            }`}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
}

export default StepProgressBar;
