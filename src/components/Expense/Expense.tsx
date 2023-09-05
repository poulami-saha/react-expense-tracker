import { useState } from "react";
import NewExpense from "../NewExpense/NewExpense";
import ExpenseTable from "./ExpenseTable/ExpenseTable";
import Consumption from "../Consumption/consumption";
import Modal from "../UI/modal/modal";
import Details from "./Details/details";
import classes from "./Expense.module.css";

const Expense = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const showModalHandler = () => {
    setModalIsShown(true);
  };
  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <div className={classes.container}>
      <Details showModalHandler={showModalHandler} />
      <div className={classes.rightSection}>
        <NewExpense />
        <ExpenseTable />
      </div>
      {modalIsShown && (
        <Modal onClose={hideModalHandler}>
          <Consumption onClose={hideModalHandler} />
        </Modal>
      )}
    </div>
  );
};
export default Expense;
