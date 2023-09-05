import { Expender } from "./expender";
import { ExpenseType } from "./expense-type";

export interface ExpenseModel {
    id:number,
    expenseType: ExpenseType,
    expender: Expender,
    amount: number,
    expenseDate: string,
    note: string,
    location: string,
}
