import { useContext, useState } from "react";
import ExpenseContext from "../../../store/expense-context";
import classes from "./ExpenseTable.module.css";
import { ExpenseModel } from "../../../models/expense.model";
import Modal from "../../UI/modal/modal";
import NewExpense from "../../NewExpense/NewExpense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ExpenseTable = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseModel>();
  const showModalHandler = () => {
    setModalIsShown(true);
  };
  const hideModalHandler = () => {
    setModalIsShown(false);
  };
  const ctx = useContext(ExpenseContext);

  const editHandler = (expense: ExpenseModel): void => {
    setExpenseToEdit(expense);
    showModalHandler();
  };
  const deleteHandler = (id: number): void => {
    ctx.removeExpense(id);
  };
  return (
    <section className={classes.section}>
      <h4>Last 10 Transactions</h4>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr}>
            <th className={classes.th}>Date</th>
            <th className={classes.th}>Location</th>
            <th className={classes.th}>Type</th>
            <th className={classes.th}>Expender</th>
            <th className={classes.th}>Amount</th>
            <th className={classes.th}>Notes</th>
            <th>Actions</th>
          </tr>
          {ctx.monthlyExpense.map((expense, index) => (
            <tr key={index}>
              <td>{expense.expenseDate}</td>
              <td>{expense.location}</td>
              <td>{expense.expenseType}</td>
              <td>{expense.expender}</td>
              <td>{expense.amount}</td>
              <td className={classes.notes}>{expense.note}</td>
              <td className={classes.actions}>
                <span
                  onClick={() => editHandler(expense)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                <span
                  onClick={() => deleteHandler(expense.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalIsShown && (
        <Modal onClose={hideModalHandler}>
          <NewExpense expense={expenseToEdit} onClose={hideModalHandler} />
        </Modal>
      )}
    </section>
  );
};

export default ExpenseTable;
