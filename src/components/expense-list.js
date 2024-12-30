// import React from "react";

// export const ExpenseList = ({ expensesList, editExpense, deleteExpense }) => {
//   return (
//     <div>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">Date</th>
//             <th scope="col">Category</th>
//             <th scope="col">Amount</th>
//             <th scope="col">Description</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expensesList?.map((expense) => (
//             <tr key={expense.id}>
//               <td>{expense.date}</td>
//               <td>{expense.category}</td>
//               <td>{expense.amount}</td>
//               <td>{expense.description}</td>
//               <td>
//                 <button
//                   className="btn btn-primary btn-sm me-2"
//                   onClick={() => editExpense(expense)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => deleteExpense(expense.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/expense-context";
import { useDetectMobile } from "../hooks/useDetectMobile";
import "../styles/styles.css";

export const ExpenseList = () => {
  const {
    state: { expensesList },
    dispatch,
  } = useContext(ExpenseContext);
  const { isMobile } = useDetectMobile();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const filterExpenses = () => {
    return expensesList.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      const isWithinDateRange =
        (!startDate || expenseDate >= startDate) &&
        (!endDate || expenseDate <= endDate);

      const isMatchingCategory =
        !filters.category || expense.category === filters.category;

      return isWithinDateRange && isMatchingCategory;
    });
  };
  const filteredExpenses = filterExpenses();
  const handleEdit = (expense) => {
    dispatch({ type: "SET_EXPENSE_DATA", payload: expense });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  };
  const categories = ["Food", "Travel", "Shopping", "Bills"];

  return (
    <div className="expense-list-wrapper">
      {!isMobile ? (
        <>
          <div className="filter-wrapper" style={{ margin: "1rem 0" }}>
            <div>
              <label className="label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Category:</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses?.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="expense-cards-wrapper">
          <h2>Expenses Details Card</h2>
          {expensesList?.map((expense) => (
            <div key={expense.id} className="card user-card">
              <div className="card-body">
                <p className="card-text">
                  <strong>Date: </strong>
                  {expense?.date}
                </p>
                <p className="card-text">
                  <strong>Category: </strong>
                  {expense?.category}
                </p>
                <p className="card-text">
                  <strong>Amount: </strong>
                  {expense?.amount}
                </p>
                <p className="card-text">
                  <strong>Description: </strong>
                  {expense?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
