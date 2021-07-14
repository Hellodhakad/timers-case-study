import React from "react";
import Button from "../Button";
import "./NewTimerCard.css";

export default class NewTimerCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timerId: "",
      countdown: props && props.data && props.data.limit,
      currentData: props && props.data,
      togglePlayPause: "pause",
      toggleStopRestart: "stop",
    };
  }

  componentDidMount() {
    this.handleAllTimers("start");
  }

  handleAllTimers = (type) => {
    const tempCurrentData = JSON.parse(JSON.stringify(this.state.currentData));
    const { timerId } = this.state;
    const { addNewTimerData } = this.props;

    switch (type) {
      case "start":
        let tempTimerId = setInterval(() => {
          if (this.state.countdown === 0) {
            tempCurrentData.isFinished = true;
            this.handleAllTimers("stop");
          } else {
            tempCurrentData.currentValue = this.state.countdown - 1;
            this.setState({ countdown: this.state.countdown - 1 });
          }
        }, 1000);
        this.setState({ timerId: tempTimerId });
        break;

      case "restart":
        tempCurrentData.currentState = "restarted";
        this.setState(
          { countdown: tempCurrentData.limit, toggleStopRestart: "stop" },
          () => {
            this.handleAllTimers("start");
          }
        );
        break;

      case "pause":
        if (tempCurrentData.currentState === "stopped") {
          //dont perform pause/resume while timer is stopped, need to restart
          break;
        }
        tempCurrentData.currentState = "paused";
        this.setState(
          { currentData: tempCurrentData, togglePlayPause: "resume" },
          () => {
            this.handleAllTimers("stop");
          }
        );
        break;

      case "resume":
        if (tempCurrentData.currentState === "stopped") {
          break;
        }
        tempCurrentData.currentState = "resumed";
        this.setState(
          { countdown: tempCurrentData.currentValue, togglePlayPause: "pause" },
          () => {
            this.handleAllTimers("start");
          }
        );
        break;

      case "stop":
        if (tempCurrentData.currentState === "paused") {
          tempCurrentData.currentState = "paused";
          this.setState({ countdown: tempCurrentData.currentValue });
        } else {
          tempCurrentData.currentState = "stopped";
          this.setState({ countdown: 0, toggleStopRestart: "restart" });
        }
        clearInterval(timerId);
        break;

      case "delete":
        if (this.state.countdown === 0) {
          addNewTimerData(this.state.currentData, "delete");
        }
        break;

      default:
        break;
    }

    this.setState({ currentData: tempCurrentData });
  };

  myDebounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  };

  render() {
    const {
      currentData: { isFinished } = false,
      countdown,
      togglePlayPause,
      toggleStopRestart,
    } = this.state;

    return (
      <>
        <div className="card-wrap">
          <div className="timer-count">{countdown}</div>
          <div className="btn-wrap">
            {isFinished ? (
              <Button
                className="button delete"
                buttonColor="red"
                buttonText="Delete"
                clickHandler={() =>
                  this.myDebounce(this.handleAllTimers("delete"))
                }
              />
            ) : (
              ""
            )}
            <Button
              className="button pause"
              disabled={isFinished}
              buttonColor="green"
              buttonText={togglePlayPause === "pause" ? "Pause" : "Resume"}
              clickHandler={() =>
                this.myDebounce(this.handleAllTimers(togglePlayPause))
              }
            />
            <Button
              className="button stop"
              disabled={isFinished}
              buttonColor="yellow"
              buttonText={toggleStopRestart === "stop" ? "Stop" : "Restart"}
              clickHandler={() =>
                this.myDebounce(this.handleAllTimers(toggleStopRestart))
              }
            />
          </div>
        </div>
      </>
    );
  }
}
