import { DropdownList } from "react-widgets/cjs";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import { ExpenseType } from "../../models/expense-type";
import { Expender } from "../../models/expender";
import classes from "./NewExpense.module.css";
import { useContext, useRef, useState } from "react";
import ExpenseContext from "../../store/expense-context";
import { ExpenseModel } from "../../models/expense.model";
import Button from "../UI/button/button";

const isEmpty = (value: string) => value.trim() === "";

const NewExpense: React.FC<{
  expense?: ExpenseModel;
  onClose?: () => void;
}> = (props) => {
  const ctx = useContext(ExpenseContext);

  const [formValidity, setFormValidity] = useState({
    enteredDate: true,
    enteredExpender: true,
    enteredLocation: true,
    enteredExpenseType: true,
    enteredAmount: true,
  });

  const locationInputRef = useRef<HTMLInputElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);

  const [date, setDate] = useState<Date>(
    props.expense ? new Date(props.expense.expenseDate) : new Date()
  );
  const [expender, setExpender] = useState<string>(
    props.expense ? props.expense.expender : ""
  );
  const [expenseType, setExpenseType] = useState<string>(
    props.expense ? props.expense.expenseType : ""
  );
  const [amount, setAmount] = useState<number>(
    props.expense ? props.expense.amount : 0.0
  );

  const addNewExpenseHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newExpense: ExpenseModel = {
      id: !!props.expense ? props.expense.id : ctx.monthlyExpense.length + 1,
      expenseType: expenseType as ExpenseType,
      expender: expender as Expender,
      note: notesInputRef.current!.value,
      amount: amount,
      expenseDate: new Date(date).toLocaleDateString("en-US"),
      location: locationInputRef.current!.value,
    };
    console.log(newExpense);
    setFormValidity({
      enteredDate: !isEmpty(newExpense.expenseDate.toString()),
      enteredExpender: !isEmpty(newExpense.expender),
      enteredLocation: !isEmpty(newExpense.location),
      enteredExpenseType: !isEmpty(newExpense.expenseType),
      enteredAmount: !isEmpty(newExpense.amount.toString()),
    });

    const formIsValid =
      !isEmpty(newExpense.expenseDate.toString()) &&
      !isEmpty(newExpense.expender) &&
      !isEmpty(newExpense.location) &&
      !isEmpty(newExpense.expenseType) &&
      !isEmpty(newExpense.amount.toString());

    if (!formIsValid) {
      return;
    }
    if (props.expense && props.onClose) {
      console.log("Hit");
      ctx.editExpense(newExpense.id, newExpense);
      console.log(ctx.monthlyExpense);
      props.onClose();
    } else {
      ctx.addExpense(newExpense);
    }
    setDate(new Date());
    setExpender(Expender.Member1);
    setExpenseType(ExpenseType.Grocery);
    setAmount(0.0);
    locationInputRef.current!.value = "";
    notesInputRef.current!.value = "";
  };

  const expenseTypeControlClasses = `${classes.formElement}  ${
    !!formValidity.enteredExpenseType ? "" : classes.invalid
  }`;
  const expenderControlClasses = `${classes.formElement} ${
    !!formValidity.enteredExpender ? "" : classes.invalid
  }`;

  const storeControlClasses = `${classes.formElement} ${
    classes.expenseFormElement
  } ${!!formValidity.enteredLocation ? "" : classes.invalid}`;

  const dateControlClasses = `${classes.formElement} ${
    !!formValidity.enteredDate ? "" : classes.invalid
  }`;

  const amountControlClasses = `${classes.formElement} ${
    !!formValidity.enteredAmount ? "" : classes.invalid
  }`;
  let buttonContent;
  if (props.expense) {
    buttonContent = (
      <div>
        <Button label="Edit Expense"/>
        <Button label="Cancel" onClickHandler={props.onClose} />
      </div>
    );
  } else {
    buttonContent = <Button label="Add Expense" />;
  }
  return (
    <form onSubmit={addNewExpenseHandler} className={classes.form}>
      <div className={classes.flexDetails}>
        <DatePicker
          valueEditFormat={{ dateStyle: "short" }}
          valueDisplayFormat={{ dateStyle: "medium" }}
          className={dateControlClasses}
          defaultValue={
            props.expense ? new Date(props.expense?.expenseDate) : new Date()
          }
          onChange={(date) => !!date && setDate(date)}
        />
        <DropdownList
          placeholder="Choose the expense type"
          data={Object.values(ExpenseType)}
          className={expenseTypeControlClasses}
          onChange={(type) => !!type && setExpenseType(type)}
          defaultValue={props.expense ? props.expense?.expenseType : undefined}
        />
      </div>
      <div className={classes.flexDetails}>
        <NumberPicker
          className={amountControlClasses}
          onChange={(value) => setAmount(value!)}
          defaultValue={props.expense ? props.expense.amount : amount}
        />
        <DropdownList
          placeholder="Choose the Expender"
          data={Object.values(Expender)}
          textField="pizzaSize"
          dataKey="id"
          className={expenderControlClasses}
          onChange={(payee) => !!payee && setExpender(payee)}
          defaultValue={props.expense ? props.expense?.expender : undefined}
        />
      </div>
      <div className={classes.flexDetails}>
        <input
          type="text"
          placeholder="Enter Expense Location"
          className={storeControlClasses}
          ref={locationInputRef}
          defaultValue={props.expense ? props.expense?.location : ""}
        />

        <textarea
          className={`${classes.formElement} ${classes.expenseFormElement}`}
          placeholder="Additional Notes"
          ref={notesInputRef}
          defaultValue={props.expense ? props.expense?.note : ""}
        />
      </div>
      {buttonContent}
    </form>
  );
};
export default NewExpense;
