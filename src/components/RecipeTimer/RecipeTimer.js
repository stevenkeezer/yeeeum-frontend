import React, { useState } from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  render() {
    const { time } = this.props;
    return (
      <div className="displayedTime">
        <h1>{this.format(time)}</h1>
      </div>
    );
  }
}

class Input extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    const strSeconds = this.refs.seconds.value;
    if (strSeconds.match(/[0-9]/)) {
      this.refs.seconds.value = "";
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit.bind(this)}>
        <input type="text" ref="seconds" placeholder="enter time in seconds" />
        <input type="submit" value="Start"></input>
      </form>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClickHandler}>{this.props.label}</button>
    );
  }
}

class RecipeTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      console.log("setInterval");
      this.props.setTime(this.state.count - 1);
      const newCount = this.state.count - 1;
      this.setState({ count: newCount >= 0 ? newCount : 0 });
    }, 1000);
  }

  handleStop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({ running: false });
    }
  }

  handleReset() {
    this.setState({ count: 0 });
  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="container">
        {/* <CountdownCircleTimer
          // onComplete={() => {}}
          //   renderTime={renderTime}
          isPlaying={isPlaying}
          durationSeconds={<RecipeTimer />}
          colors={[["#A30000"]]}
        /> */}
        <Clock time={count} />
        <Input onSetCountdown={this.handleCountdown.bind(this)} />
        <Button label="stop" onClickHandler={this.handleStop.bind(this)} />
        <Button label="reset" onClickHandler={this.handleReset.bind(this)} />
      </div>
    );
  }
}
export default RecipeTimer;
