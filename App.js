import React from "react";
import Seats from "./components/Seats";
import data from "./data";

export default function App() {
  const [seatId, setSeatId] = React.useState(null);
  const [seatPrice, setSeatPrice] = React.useState(null)

  const seats = data.map((item) => {
    return (
      <Seats
        key={item.id}
        selected={seatId === item.id}
        premium={seatPrice === item.price}
        onSelect={() => {
          // if (confirmedSeat !== null) {
          //   return;
          // }
          setSeatId(item.id);
        }}
        onPremium={() => {
          setSeatPrice(item.price)
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
    setShouldBeOpen(prevState => !prevState)
  }

  const [showPremiumSeats, setShowPremiumSeats] = React.useState(false)

  function premium(){
    // ??????????
    onPremium();
    const premiumSeat = data.find((item) => item.price === seatPrice)
    const premiumSeats = premiumSeat.filter((item) => {
      return item.price > 200
    })
    setShowPremiumSeats(premiumSeats)
  }
 
  return (
    <div className="main">
      <h1>Choose your seat</h1>
      <button className="premium--btn" onClick={premium}>Show premium seats</button>
      {confirmedSeat && (
        <dialog open={shouldBeOpen} className="dialog">
          <p>Your seat: {confirmedSeat.seatNumber} <br></br> Cost: ${confirmedSeat.price}</p>
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
