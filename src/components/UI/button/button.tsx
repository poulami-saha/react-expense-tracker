import classes from "./button.module.css";

const Button: React.FC<{ onClickHandler?: () => void; label: string }> = (
  props
) => {
  return <button className={classes.button} onClick={props.onClickHandler}>{props.label}</button>;
};
export default Button;
