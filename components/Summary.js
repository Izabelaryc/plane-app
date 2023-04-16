import React from "react";

export default function Summary(props) {
  return (
    <div>
      <p>
        Your seat: {props.confirmedSeat?.seatNumber} <br></br> First name:{" "}
        {props.user?.firstName} <br></br> Last name: {props.user?.lastName}
        <br></br> Cost: ${props.confirmedSeat?.price}
      </p>
      <button className="close--btn" onClick={props.closeDialog}>
        Go back
      </button>
    </div>
  );
}
