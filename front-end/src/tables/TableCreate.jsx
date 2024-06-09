function TableCreate() {

  function submitHandler() {
    console.log("Submit handled.");
  }

  return (
    <>
      <h1>Reserved Tables</h1>
      <form onSubmit={submitHandler} className="">

        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input 
          name="table_name" 
          placeholder="Table Name" 
          className="form-control"
          />
          <label htmlFor="capacity">Table Capacity</label>
          <input 
          name="capacity" 
          placeholder="Table Capacity" 
          className="form-control"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-success">Submit</button>
          <button className="btn btn-danger">Cancel</button>
        </div>

      </form>
    </>
  );
}

export default TableCreate;
