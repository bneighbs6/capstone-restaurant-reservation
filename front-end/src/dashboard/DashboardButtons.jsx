import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";

function DashboardButtons({ date }) {
  const history = useHistory();
  const location = useLocation();
  const [reservationsDate, setReservationsDate] = useState(date);

  function previousButtonClickHandler() {
    history.push({
      pathname: location.pathname,
      search: `?date=${previous(reservationsDate)}`,
    });
  }

  function todayButtonClickHandler() {
    history.push({
      pathname: location.pathname,
      search: `?date=${today()}`,
    });
  }

  function nextButtonClickHandler() {
    history.push({
      pathname: location.pathname,
      search: `?date=${next(reservationsDate)}`,
    });
  }

  return (
    <div className="btn-group mt-1 mb-4">
      <button
        type="button"
        className="btn btn-secondary btn-sm mx-3"
        onClick={previousButtonClickHandler}
      >
        Previous Date
      </button>

      <button
        type="button"
        className="btn btn-secondary btn-sm mx-3"
        onClick={todayButtonClickHandler}
      >
        Today
      </button>

      <button
        type="button"
        className="btn btn-secondary btn-sm mx-3"
        onClick={nextButtonClickHandler}
      >
        Next Day
      </button>
    </div>
  );
}

export default DashboardButtons;
