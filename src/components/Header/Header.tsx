import classes from "./Header.module.css";
import logo from "../../assets/expense.png";
const Header = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <p>My Family Expense Tracker</p>
    </header>
  );
};
export default Header;
