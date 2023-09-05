import Expense from "./components/Expense/Expense";
import Header from "./components/Header/Header";
import ExpenseProvider from "./store/ExpenseProvider";
import "./App.css";
function App() {
  return (
    <ExpenseProvider>
      <Header />
      <Expense />
    </ExpenseProvider>
  );
}

export default App;
