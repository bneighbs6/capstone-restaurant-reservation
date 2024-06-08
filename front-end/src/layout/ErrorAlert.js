import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  if (error && Array.isArray(error.message)) {
    const errorMessages = error.message.map((message, index) => {
      return <li key={index}>{message}</li>;
    });

    return (
      <div class="alert alert-danger" role="alert">
        <h5>
          Errors:
        </h5>
        <ul class="mb-1">{errorMessages}</ul>
      </div>
    )
  }


  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
