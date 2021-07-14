import { AddTimerHook } from "../../Hooks";
import Button from "../Button";
import "./AddTimer.css";

export default function AddTimer(props) {
  const { onChangeHandler, timeLimit, addTimerClickHandler, errorText } =
    AddTimerHook(props);

  return (
    <>
      <h1>Timer value</h1>
      <input
        className="input"
        onChange={onChangeHandler}
        value={timeLimit}
        type="number"
      />
      {errorText ? <span className="error">{errorText}</span> : ""}
      <Button
        className = 'btn'
        buttonColor="blue"
        buttonText="Add Timer"
        clickHandler={addTimerClickHandler}
      />
    </>
  );
}
