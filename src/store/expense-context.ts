import React from "react";
import { ExpenseModel } from "../models/expense.model";
import { ConsumptionModel } from "../models/consumption.model";

export type GlobalContext = {
    consumption: ConsumptionModel,
    monthlyExpense: ExpenseModel[],
    totalExpense: () => number,
    totalExpenseByType: (expenseType: string) => number,
    totalExpenseByExpender: (payee: string) => number
    addExpense: (expense: ExpenseModel) => void,
    removeExpense: (id: number) => void,
    editExpense: (id: number, expense: ExpenseModel) => void,
    updateConsumption: (category: string, units: number) => void,
}

const ExpenseContext = React.createContext<GlobalContext>({
    consumption: {
        hotWater: 0,
        coldWater: 0,
        electricity: 0,
    },
    monthlyExpense: [],
    totalExpense: () => 0,
    totalExpenseByType: (expenseType: string) => 0,
    addExpense: (expense: ExpenseModel) => { },
    removeExpense: (id: number) => { },
    editExpense: (id: number, expense: ExpenseModel) => { },
    totalExpenseByExpender: (payee: string) => 0,
    updateConsumption: (category: string, units: number) => { },
});
export default ExpenseContext;
