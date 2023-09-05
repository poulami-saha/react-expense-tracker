import { ExpenseModel } from "../../../models/expense.model";
import classes from "./ExpenseRow.module.css";
const ExpenseRow: React.FC<{ expense: ExpenseModel }> = ({ expense }) => {
  return (
    // <details className="details">
    //   <summary>
    //     <div className="summary-div">
    //       <h3 className="summary-h3">
    //         <strong className="summary-strong">{expense.location}</strong>
    //         <small className="summary-small">{expense.expenseType}</small>
    //       </h3>
    //       <span>{expense.amount}</span>
    //     </div>
    //   </summary>
    //   <div >
    //     <dl>
    //       <div className="dl-details">
    //         <dt>Date</dt>
    //         <dd>{expense.expenseDate}</dd>
    //       </div>

    //       <div className="dl-details">
    //         <dt>Expender</dt>
    //         <dd>{expense.expender}</dd>
    //       </div>

    //       <div className="dl-details">
    //         <dt>Notes</dt>
    //         <dd>{expense.note}</dd>
    //       </div>
    //     </dl>
    //   </div>
    // </details>
    // <div className={classes.details}>
    //   <div>
    //     <span className={classes.span}>{new Date(expense.expenseDate).toLocaleDateString()}</span>
    //     <span className={classes.span}>{expense.location}</span>
    //     <span className={classes.span}>{expense.expenseType}</span>
    //   </div>
    //   <p>{expense.amount}</p>
    // </div>
    <></>
    
  );
};
export default ExpenseRow;
