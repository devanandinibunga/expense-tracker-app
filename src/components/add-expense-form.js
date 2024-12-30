// import React from "react";
// import { v4 as uuidv4 } from "uuid";

// export const AddExpenseForm = ({
//   expenseData,
//   setExpenseData,
//   handleAddExpense,
//   handleEditExpense,
// }) => {
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setExpenseData({ ...expenseData, [name]: value });
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (expenseData?.id) {
//       handleEditExpense(expenseData);
//     } else {
//       const newTodo = { ...expenseData, id: uuidv4() };
//       handleAddExpense(newTodo);
//     }
//     setExpenseData({
//       date: "",
//       description: "",
//       category: "",
//       id: "",
//       amount: "",
//     });
//   };
//   const categories = ["Food", "Travel", "Shopping", "Bills"];
//   return (
//     <div>
//       <form className="row g-3 todo-form" onSubmit={handleSubmit}>
//         <div className="col-md-6">
//           <label htmlFor="validationDefault02" className="form-label">
//             Expense Date
//           </label>
//           <input
//             type="date"
//             className="form-control"
//             id="validationDefault02"
//             value={expenseData?.date}
//             required
//             name="date"
//             onChange={handleChange}
//             placeholder="Select the date"
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="expenseDateDropdown" className="form-label">
//             category
//           </label>
//           <select
//             className="form-select"
//             id="expenseDateDropdown"
//             value={expenseData?.category}
//             name="category"
//             required
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               Select the category
//             </option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="amountInput" className="form-label">
//             Amount
//           </label>
//           <input
//             type="number"
//             placeholder="Enter the amount"
//             className="form-control"
//             id="amountInput"
//             name="amount"
//             value={expenseData?.amount}
//             required
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-6">
//           <label htmlFor="validationDefault02" className="form-label">
//             Description
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="validationDefault02"
//             value={expenseData?.description}
//             name="description"
//             onChange={handleChange}
//             placeholder="Enter the description"
//           />
//         </div>
//         <div className="col-12">
//           <button className="btn btn-primary save-btn" type="submit">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

import React from "react";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExpenseContext } from "../context/expense-context";
import "../styles/styles.css";

export const AddExpenseForm = () => {
  const {
    state: { expenseData },
    dispatch,
  } = useContext(ExpenseContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "SET_EXPENSE_DATA",
      payload: { ...expenseData, [name]: value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (expenseData?.id) {
      dispatch({ type: "EDIT_EXPENSE", payload: expenseData });
    } else {
      const newExpense = { ...expenseData, id: uuidv4() };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    }
    dispatch({
      type: "SET_EXPENSE_DATA",
      payload: {
        date: "",
        description: "",
        category: "",
        id: "",
        amount: "",
      },
    });
  };

  const categories = ["Food", "Travel", "Shopping", "Bills"];

  return (
    <div className="expense-form-wrapper">
        <h2>Expense Form</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">
            Expense Date
          </label>
          <input
            type="date"
            className="form-control"
            id="validationDefault02"
            value={expenseData?.date}
            required
            name="date"
            onChange={handleChange}
            placeholder="Select the date"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="expenseDateDropdown" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="expenseDateDropdown"
            value={expenseData?.category}
            name="category"
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              Select the category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="amountInput" className="form-label">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter the amount"
            className="form-control"
            id="amountInput"
            name="amount"
            value={expenseData?.amount}
            required
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault02"
            value={expenseData?.description}
            name="description"
            onChange={handleChange}
            placeholder="Enter the description"
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
