import React, { createContext, useReducer } from "react";

export const ExpenseContext = createContext();

const initialState = {
  expensesList: JSON.parse(localStorage.getItem("expenses")) || [],
  expenseData: {
    date: "",
    description: "",
    category: "",
    id: "",
    amount: "",
  },
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSE_DATA":
      return { ...state, expenseData: action.payload };
    case "ADD_EXPENSE":
      const newExpensesList = [...state.expensesList, action.payload];
      localStorage.setItem("expenses", JSON.stringify(newExpensesList));
      return { ...state, expensesList: newExpensesList };
    case "EDIT_EXPENSE":
      const updatedExpensesList = state.expensesList.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpensesList));
      return { ...state, expensesList: updatedExpensesList };
    case "DELETE_EXPENSE":
      const filteredExpensesList = state.expensesList.filter(
        (expense) => expense.id !== action.payload,
      );
      localStorage.setItem("expenses", JSON.stringify(filteredExpensesList));
      return { ...state, expensesList: filteredExpensesList };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// export const useExpenseContext = () => useContext(ExpenseContext);
