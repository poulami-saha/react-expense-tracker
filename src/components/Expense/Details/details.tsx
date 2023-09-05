import React, { useContext } from "react";
import ExpenseContext from "../../../store/expense-context";
import { Expender } from "../../../models/expender";
import classes from "./details.module.css";
import Button from "../../UI/button/button";

const Details: React.FC<{ showModalHandler: () => void }> = (props) => {
  const ctx = useContext(ExpenseContext);
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr}>
            <th className={classes.th}>
              <b>Total Expense</b>
            </th>
            <th className={classes.th}>
              <b>{ctx.totalExpense()}€</b>
            </th>
          </tr>

          <tr className={classes.tr}>
            <td className={classes.td}>{`${Expender.Member1}'s Expenses`}</td>
            <td className={classes.td}>{ctx.totalExpenseByExpender(Expender.Member1)}€</td>
          </tr>

          <tr className={classes.tr}>
            <td className={classes.td}>{`${Expender.Member2}'s Expenses`}</td>
            <td className={classes.td}>{ctx.totalExpenseByExpender(Expender.Member2)}€</td>
          </tr>
        </tbody>
      </table>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr}>
            <th className={classes.th}>Consumptions</th>
            <th className={classes.th}>Units</th>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Electricity</td>
            <td className={classes.td}>{ctx.consumption.electricity}</td>
          </tr>

          <tr className={classes.tr}>
            <td className={classes.td}>Hot Water</td>
            <td className={classes.td}>{ctx.consumption.hotWater}</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Cold Water</td>
            <td className={classes.td}>{ctx.consumption.coldWater}</td>
          </tr>
        </tbody>
      </table>
      <Button
        onClickHandler={props.showModalHandler}
        label="Add Consumptions"
      />
    </div>
  );
};
export default Details;
