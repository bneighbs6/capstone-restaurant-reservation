import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationForm from "../reservations/create/ReservationForm.jsx";
import TableCreate from "../tables/TableCreate.jsx";
import SeatReservationForm from "../reservations/seat/SeatReservationForm.jsx";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>

      <Route exact={true} path="/">
        <Redirect to={{ pathname: "/dashboard", search: `?date=${today()}` }} />
      </Route>

      <Route path="/dashboard">
        <Dashboard today_date={today()} />
      </Route>

      <Route path="/reservations/new">
        <ReservationForm />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <SeatReservationForm />
      </Route>

      <Route path="/tables/new">
        <TableCreate />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Routes;
