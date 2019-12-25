import React, { useState, Fragment, useEffect } from "react";
import "../../../components/LikeRotator/LikeRotator.css";

class LikeRotator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: false,
      toggle: this.props.isLiked
    };
    this.rotatingDone = this.rotatingDone.bind(this);
  }

  componentDidMount() {
    const elm = this.image;
    elm.addEventListener("animationend", this.rotatingDone);
  }

  componentWillUnmount() {
    const elm = this.image;
    elm.removeEventListener("animationend", this.rotatingDone);
  }

  rotatingDone() {
    this.setState(function(state) {
      return {
        toggle: !state.toggle,
        rotate: false
      };
    });
  }

  render() {
    const { rotate, toggle } = this.state;

    return (
      <div className="justify-content-center align-items-center d-flex flex-column">
        <img
          alt="l"
          style={{ textAlign: "center" }}
          width="42px"
          src={toggle ? "assets/img/heart.svg" : "assets/img/heart.svg"}
          ref={elm => {
            this.image = elm;
          }}
          onClick={() => this.setState({ rotate: true })}
          className={rotate ? "rotate" : ""}
        />
        <div
          style={{ color: "grey" }}
          className="text-center justify-content-center like-number"
        >
          {this.props.likes}
        </div>
      </div>
    );
  }
}

export default LikeRotator;
