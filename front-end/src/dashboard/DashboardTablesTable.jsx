import React, { useEffect, useState } from "react";
import { deleteTableAssignment, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function DashboardTablesTable({ loadDashboard }) {
  const [tables, setTables] = useState([]);
  const [tableErrors, setTableErrors] = useState(null);

  function loadTables() {
    const abortController = new AbortController();
    setTableErrors(null);
    listTables(abortController.signal).then(setTables).catch(setTableErrors);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  const tablesListItem = tables.map((table) => {
    let tableStatus = "Free";
    if (table.reservation_id) {
      tableStatus = "Occupied";
    }

    let occupant = null;
    if (tableStatus === "Occupied") {
      occupant = ` by Reservation ID: ${table.reservation_id}`;
    }

    // Displays a "Finish" button 
    // button is disabled until table is occupied
    function FinishButton({ tableStatus, tableId }) {
      if (tableStatus === "Occupied") {
        return (
          <button
            type="button"
            className="btn btn-success btn-sm"
            data-table-id-finish={tableId}
            onClick={() => handleFinishButtonClick(tableId)}
          >
            Finish
          </button>
        );
      }
      return (
        <button
        type="button"
        className="btn btn-success btn-sm"
        data-table-id-finish={tableId}
        disabled
        >
          Finish
        </button>
      )
    }

    // When clicked will delete reservation
    // Needs to display tables and dashboard 
    async function handleFinishButtonClick(tableId) {
      if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        await deleteTableAssignment(tableId);
        loadDashboard(); // Reloads dashboard 
        loadTables(); // Reloads Tables
      }
    }

    return (
      <li className="list-group-item col" key={table.table_id}>
        <div>{table.table_name}</div>
        <p data-table-id-status={`${table.table_id}`} className="font-weight-bold">
          {tableStatus}
        </p>
        <p>
          {occupant}
        </p>
        <FinishButton tableStatus={tableStatus} tableId={table.table_id} />
      </li>
    );
  });

  return (
    <>
      <ErrorAlert error={tableErrors} />
      <div>
        <h4>Tables</h4>
        <ul>{tablesListItem}</ul>
      </div>
    </>
  )

}

export default DashboardTablesTable;
