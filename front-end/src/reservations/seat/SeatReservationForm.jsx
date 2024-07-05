import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import ErrorAlert from "../../layout/ErrorAlert";
import { seatReservation, listTables } from "../../utils/api";


function SeatReservationForm() {
    const { reservation_id } = useParams(); 
    const abortController = new AbortController();
    const history = useHistory(); 
    const[error, setError] = useState(null);
    const [tables, setTables] = useState([]);
    const [tableAssignment, setTableAssignment] = useState({
        table_id: "",
        reservation_id,
    });

    // Adding abortController to avoid the below error:
    // React Hook useEffect has a missing dependency: 'abortController'
    // Made the loadDashboard render every time its called made testing take longer
    // eslint-disable-next-line
    useEffect(loadDashboard, []); 

    function loadDashboard() {
        listTables(abortController.signal).then(setTables).catch(setError);
        return () => abortController.abort(); 
    }

    const tableAssignmentOptions = tables.map((table) => (
        <option value={table.table_id} key={table.table_id}>
          {table.table_name} - {table.capacity}
        </option>
      ));

    function changeHandler({ target: { name, value } }) {
        setTableAssignment((prevTable) => ({
            ...prevTable,
            [name]: value, 
        }));
    };

    function submitHandler(e) {
        e.preventDefault();
        setError(null);

        if(!tableAssignment.table_id) {
            setError({
                message: "Please select a table option from dropdown menu."
            });
        } else {
            seatReservation(tableAssignment, abortController.signal)
                .then(() => history.push("/"))
                .catch(setError);
                return () => abortController.abort(); 
        }
    };

    function cancelHandler() {
        history.goBack()
    }

    return (
        <>
            <h1>Reserve Seat</h1>
            <ErrorAlert error = {error} />
            <form onSubmit={submitHandler}>
                <div className="row">
                    <label htmlFor="table_assignment">
                        <h5>Assign to table</h5>
                    </label>
                    <div className="col-auto pl-3">
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
    );
}

export default SeatReservationForm;