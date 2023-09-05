import { useContext, useState } from "react";
import { DropdownList, NumberPicker } from "react-widgets/cjs";
import ExpenseContext from "../../store/expense-context";
import classes from "./consumption.module.css";
import Button from "../UI/button/button";

const Consumption: React.FC<{ onClose: () => void }> = (props) => {
  const ctx = useContext(ExpenseContext);

  const consumptions = ["Electricity", "Hot Water", "Cold Water"];
  const [units, setUnits] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (category === "Electricity") {
      ctx.consumption.electricity = units;
    }
    if (category === "Hot Water") {
      ctx.consumption.hotWater = units;
    }
    if (category === "Cold Water") {
      ctx.consumption.coldWater = units;
    }
    props.onClose();
  };
  
  const modalActions = (
    <div className={classes.actions}>
      <Button label="Cancel" onClickHandler={props.onClose} />
      <Button label="Add Consumption" />
    </div>
  );

  return (
    <form onSubmit={submitHandler}>
      <DropdownList
        data={consumptions}
        onChange={(type) => !!type && setCategory(type)}
        className={classes.modalItem}
        placeholder="Choose consumption category"
      />
      <NumberPicker
        min={0.0}
        defaultValue={0.0}
        value={units}
        onChange={(value) => setUnits(value!)}
        className={classes.modalItem}
      />
      {modalActions}
    </form>
  );
};

export default Consumption;
