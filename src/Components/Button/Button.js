import "./Button.css";

export default function Button({
  buttonText,
  className,
  clickHandler,
  disabled,
}) {
  return (
    <>
      <button className={className} disabled={disabled} onClick={clickHandler}>
        {buttonText}
      </button>
    </>
  );
}
