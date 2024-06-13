import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import ErrorAlert from "../../layout/ErrorAlert";


function SeatReservationForm(reservation_id) {
    // const { reservation_id } = useParams(); 
    const history = useHistory(); 
    const[error, setError] = useState(null);
    const [tables, setTables] = useState([]);
    const [tableAssignment, setTableAssignment] = useState({
        table_id: "",
        reservation_id,
    });

    const tableAssignmentOptions = tables.map((table) => {
        <option value={table.table_id} key={table.table_id}>
            {table.table_name} - {table.capacity}
        </option>
    });

    function changeHandler({ target: { name, value } }) {
        setTableAssignment((prevTable) => ({
            ...prevTable,
            [name]: value, 
        }));
    };

    function cancelHandler() {
        history.goBack()
    }

    return (
        <>
            <h1>Reserve Seat</h1>
            <ErrorAlert error = {error} />
            <form>
                <div className="row">
                    <label htmlFor="table_assignment">
                        <h5>Assign to table</h5>
                    </label>
                    <div className="idk"> {/* TODO: fix classname*/}
                        <select 
                        id="table_assignment"
                        name="table_id"
                        className="form-select"
                        value={tableAssignment.table_id}
                        onChange={changeHandler}
                        require="true"
                        >
                            <option value="">Table Name - Table Capacity</option>
                            {tableAssignmentOptions}
                        </select>
                    </div>
                    <div className="form-buttons">
                        <button className="btn btn-danger" onClick={cancelHandler}>Cancel</button>
                        <button type="submit" className="btn btn-success col-auto mr-3">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SeatReservationForm;