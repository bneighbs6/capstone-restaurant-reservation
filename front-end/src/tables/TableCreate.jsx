import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";


function TableCreate() {
  const history = useHistory(); 
  const [error, setError] = useState(null);
  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  function changeHandler({ target: { name, value } }) {
    setTable((previousTable) => ({
      ...previousTable,
      [name]: value,
    }));
  }
  console.log("Value of table is", table)

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    createTable(table, abortController.signal)
      .then(() => history.push("/"))
      .catch(setError);
    return () => abortController.abort();
  }

  function cancelHandler() {
    history.goBack();
  }

  return (
    <>
      <h1>Reserved Tables</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler} className="">

        <div className="form-group">
          <label htmlFor="table_name" className="form-label">Table Name</label>
          <input 
          id="table_name"
          name="table_name"
          type="text" 
          placeholder="Table Name" 
          onChange={changeHandler}
          className="form-control"
          value={table.table_name}
          />
          <label htmlFor="capacity">Table Capacity</label>
          <input 
          id="capacity"
          name="capacity" 
          type="text"
          placeholder="Table Capacity" 
          onChange={changeHandler}
          className="form-control"
          value={table.capacity}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success" onClick={submitHandler}>Submit</button>
          <button className="btn btn-danger" onClick={cancelHandler}>Cancel</button>
        </div>

      </form>
    </>
  );
}

export default TableCreate;
