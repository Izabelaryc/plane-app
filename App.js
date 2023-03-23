import React from "react";
import Seats from "./components/Seats";
import data from "./data";

export default function App() {
  const [seatId, setSeatId] = React.useState(null);

  const seats = data.map((item) => {
    return (
      <Seats
        key={item.id}
        selected={seatId === item.id}
        onSelect={() => {
          if (confirmedSeat !== null) {
            return;
          }
          setSeatId(item.id);
        }}
        {...item}
      />
    );
  });

  const [confirmedSeat, setConfirmedSeat] = React.useState(null);

  function submit() {
    const selectedSeat = data.find((item) => item.id === seatId);
    setConfirmedSeat(selectedSeat);
  }

  return (
    <div className="main">
      <h1>Choose your seat</h1>
      {confirmedSeat && (
        <dialog open className="dialog">
          Your seat: {confirmedSeat.seatNumber} ${confirmedSeat.price}
        </dialog>
      )}
      <div className="grid-container">{seats}</div>

      <button className="submit--btn" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
