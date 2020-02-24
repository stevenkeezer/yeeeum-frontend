import React, { Component } from "react";
import MultiToggle from "react-multi-toggle";
import "./DifficultySlider.css";

const groupOptions = [
  {
    displayName: "Easy",
    value: 2
  },
  {
    displayName: "Medium",
    value: 4
  },
  {
    displayName: "Hard",
    value: 6
  }
];

class DifficultySlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupSize: 2
    };
  }

  onGroupSizeSelect = value => this.setState({ groupSize: value });

  render = () => {
    const { groupSize } = this.state;

    return (
      <MultiToggle
        options={groupOptions}
        selectedOption={groupSize}
        onSelectOption={this.onGroupSizeSelect}
        label=""
      />
    );
  };
}

export default DifficultySlider;
