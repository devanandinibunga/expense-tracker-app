// import { useState } from "react";
// import "./App.css";
// import { AddExpenseForm } from "./components/add-expense-form";
// import { ExpenseList } from "./components/expense-list";

// function App() {
//   const [expenseData, setExpenseData] = useState({
//     date: "",
//     description: "",
//     category: "",
//     id: "",
//     amount: "",
//   });
//   const [expensesList, setExpensesList] = useState(() => {
//     return JSON.parse(localStorage.getItem("expenses")) || [];
//   });
//   const handleAddExpense = (newExpense) => {
//     const updatedexpensesList = [...expensesList, newExpense];
//     setExpensesList(updatedexpensesList);
//     localStorage.setItem("expenses", JSON.stringify(updatedexpensesList));
//   };
//   const handleEditExpense = (expense) => {
//     const updatedexpensesList = expensesList.map((item) =>
//       item.id === expense.id ? expense : item,
//     );
//     setExpensesList(updatedexpensesList);
//     localStorage.setItem("expenses", JSON.stringify(updatedexpensesList));
//   };
//   const deleteExpense = (id) => {
//     const updatedExpenseList = expensesList.filter(
//       (expense) => expense.id !== id,
//     );
//     setExpensesList(updatedExpenseList);
//     localStorage.setItem("expenses", JSON.stringify(updatedExpenseList));
//   };

//   const editExpense = (expense) => {
//     setExpenseData(expense);
//   };
//   return (
//     <div className="App">
//       <AddExpenseForm
//         setExpenseData={setExpenseData}
//         expenseData={expenseData}
//         handleAddExpense={handleAddExpense}
//         handleEditExpense={handleEditExpense}
//       />
//       <ExpenseList
//         expensesList={expensesList}
//         deleteExpense={deleteExpense}
//         editExpense={editExpense}
//       />
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { AddExpenseForm } from "./components/add-expense-form";
import { ExpenseList } from "./components/expense-list";
import { ExpenseSummary } from "./components/expense-summary";
import { ExpenseProvider } from "./context/expense-context";

function App() {
  return (
    <ExpenseProvider>
      <AddExpenseForm />
      <ExpenseList />
      <ExpenseSummary />
    </ExpenseProvider>
  );
}

export default App;
