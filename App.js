import React from "react";
import Seat from "./components/Seat";
import data from "./data";

export default function App() {
  const [seatId, setSeatId] = React.useState(null);
  const [premiumFilter, setPremiumFilter] = React.useState(false)

  const seats = data.map((item) => {
    console.log(premiumFilter, item.price)
    return (
      <Seat
        key={item.id}
        selected={seatId === item.id}
        premium={premiumFilter ? item.price > 200 : false}
        onSelect={() => {
          // if (confirmedSeat !== null) {
          //   return;
          // }
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
    setShouldBeOpen(prevState => !prevState)
  }

  const [shouldBeOpen, setShouldBeOpen] = React.useState(false)
  
  function closeDialog(){
    setShouldBeOpen(false)
    setSeatId(null)
  }

  function premium(){
    setPremiumFilter(prevState => !prevState)
  }

  const[name, setName] = React.useState(null)

  function confirmName(){
    setName("Iza")
  }
 
  return (
    <div className="main">
      <h1>Choose your seat</h1>
      <button className="premium--btn" onClick={premium}>Show premium seats</button>
      {confirmedSeat && !name && (
        <dialog open={shouldBeOpen} className="dialog">
          <input />
          <button className="close--btn" onClick={confirmName}>OK</button>
        </dialog>
      )}
      {confirmedSeat && name && (
        <dialog open={shouldBeOpen} className="dialog">
          <p>Your seat: {name} {confirmedSeat.seatNumber} <br></br> Cost: ${confirmedSeat.price}</p>
          <button className="close--btn" onClick={closeDialog}>Go back</button>
        </dialog>
      )}
      <div className="grid-container">{seats}</div>

      <button className="submit--btn" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
