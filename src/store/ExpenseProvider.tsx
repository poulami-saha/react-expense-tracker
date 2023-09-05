import { PropsWithChildren, useEffect, useReducer } from "react";
import { ExpenseModel } from "../models/expense.model";
import ExpenseContext from "./expense-context";
import { Expender } from "../models/expender";
import { ExpenseType } from "../models/expense-type";
import { ConsumptionModel } from "../models/consumption.model";
import { start } from "repl";

type DefaultExpense = {
  expenses: ExpenseModel[];
  consumption: ConsumptionModel;
};

const defaultExpenseState: DefaultExpense = {
  expenses: [],
  consumption: {
    electricity: 0,
    hotWater: 0,
    coldWater: 0,
  },
};

const expenseReducer = (
  state: DefaultExpense,
  action: {
    type: string;
    expense?: ExpenseModel;
    id?: number;
    category?: string;
    units?: number;
  }
) => {
  if (action.type === "ADD" && action.expense !== undefined) {
    return {
      expenses: state.expenses.concat(action.expense),
      consumption: state.consumption,
    };
  }
  if (action.type === "EDIT" && action.expense !== undefined) {
    const indexToUpdate= state.expenses.findIndex(expense=>expense.id===action.expense?.id);
    state.expenses[indexToUpdate] = action.expense;
    console.log(state.expenses)
    return {
      expenses: Object.assign([],state.expenses),
      consumption: state.consumption,
    };
  }
  if (action.type === "REMOVE" && action.id !== undefined) {
    const newExpenseList = state.expenses.filter(
      (expense: ExpenseModel) => expense.id !== action.id
    );
    return {
      expenses: newExpenseList,
      consumption: state.consumption,
    };
  }
  if (action.type === "CONSUMPTION" && !!action.category && !!action.units) {
    return {
      expenses: state.expenses,
      consumption: {
        electricity:
          action.category === "electricity"
            ? action.units
            : state.consumption.electricity,
        hotWater:
          action.category === "hotWater"
            ? action.units
            : state.consumption.hotWater,
        coldWater:
          action.category === "coldWater"
            ? action.units
            : state.consumption.coldWater,
      },
    };
  }

  return defaultExpenseState;
};

const ExpenseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expenseState, dispatchExpenseAction] = useReducer(
    expenseReducer,
    defaultExpenseState
  );

  const addExpenseHandler = (expense: ExpenseModel) => {
    dispatchExpenseAction({ type: "ADD", expense: expense });
  };

  const removeExpenseHandler = (id: number) => {
    dispatchExpenseAction({ type: "REMOVE", id: id });
  };

  const editExpenseHandler = (id: number, expense: ExpenseModel) => {
    dispatchExpenseAction({ type: "EDIT", id: id, expense: expense });
  };
  const expenseByTypeHandler = (expenseType: string): number => {
    return 0;
  };
  const expenseByExpenderHandler = (payee: string): number => {
    let total = 0;
    expenseState.expenses.forEach((expense: ExpenseModel) => {
      if (expense.expender === payee) {
        total += expense.amount;
      }
    });
    return +total.toFixed(2);
  };
  const updateConsumptionHandler = (category: string, units: number) => {
    dispatchExpenseAction({
      type: "CONSUMPTION",
      category: category,
      units: units,
    });
  };

  const calculateTotalExpenseHandler = (): number => {
    let total = 0;
    expenseState.expenses.forEach(
      (expense: ExpenseModel) => (total += expense.amount)
    );
    return +total.toFixed(2);
  };

  useEffect(() => {
    const fetchMonthlyExpenses = () => {
      const monthlyExpenses: ExpenseModel[] = [
        {
          id: 1,
          expenseType: ExpenseType.Clothing,
          expender: Expender.Member1,
          amount: 45.23,
          expenseDate: new Date().toLocaleDateString("en-US"),
          note: "",
          location: "Primark",
        },
        {
          id: 2,
          expenseType: ExpenseType.Grocery,
          expender: Expender.Member2,
          amount: 55.23,
          expenseDate: new Date().toLocaleDateString("en-US"),
          note: "",
          location: "Lidl",
        },
      ];

      monthlyExpenses.forEach((expense: ExpenseModel) =>
        dispatchExpenseAction({ type: "ADD", expense: expense })
      );
    };
    fetchMonthlyExpenses();
  }, []);

  const expenseContext = {
    consumption: {
      hotWater: 0,
      coldWater: 0,
      electricity: 0,
    },
    monthlyExpense: expenseState.expenses,
    totalExpense: calculateTotalExpenseHandler,
    totalExpenseByType: expenseByTypeHandler,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    editExpense: editExpenseHandler,
    totalExpenseByExpender: expenseByExpenderHandler,
    updateConsumption: updateConsumptionHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseProvider;
