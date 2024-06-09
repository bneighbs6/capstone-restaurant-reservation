function TableCreate() {
    return (
        <>
            <h1>Reserved Tables</h1>
            <input 
            name="table_name"
            placeholder="Table Name" 
            />
            <input 
            name="capacity" 
            placeholder="Table Capacity"
            />
            <button className="btn btn-success">Submit</button>
            <button className="btn btn-danger">Cancel</button>
        </>
    )
}

export default TableCreate; 