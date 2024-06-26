import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import TableCreate from "../tables/TableCreate.jsx";
import SeatReservationForm from "../reservations/seat/SeatReservationForm.jsx";
import SearchReservation from "../reservations/search/SearchReservation.jsx";
import EditReservation from "../reservations/edit/EditReservation.jsx";
import CreateReservation from "../reservations/create/CreateReservation.jsx";

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
        <CreateReservation />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <SeatReservationForm />
      </Route>

      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>

      <Route path="/tables/new">
        <TableCreate />
      </Route>

      <Route path="/search">
        <SearchReservation />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Routes;
