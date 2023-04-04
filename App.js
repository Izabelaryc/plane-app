import React from "react";
import Seat from "./components/Seat";
import data from "./data";

export default function App() {
  const [seatId, setSeatId] = React.useState(null);
  const [premiumFilter, setPremiumFilter] = React.useState(false);

  const seats = data.map((item) => {
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
  }

  function closeDialog() {
    setSeatId(null);
    setConfirmedSeat(null);
    setUserDataCollected(false)
    setFormData({
      firstName: "",
      lastName: "",
    })
  }

  function premium() {
    setPremiumFilter((prevState) => !prevState);
  }

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
  });

  function confirmName(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const [userDataCollected, setUserDataCollected] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    if (formData.firstName !== "" && formData.lastName !== "") {
      setUserDataCollected(true);
    }
  }
  
console.log(confirmedSeat, userDataCollected)
  return (
    <div className="main">
      <h1>Choose your seat</h1>
      <button className="premium--btn" onClick={premium}>
        Show premium seats
      </button>
      <dialog open={confirmedSeat && !userDataCollected} className="dialog">
        <form onSubmit={handleSubmit}>
            Provide your name:
            <input
              type="text"
              placeholder="First name"
              onChange={confirmName}
              name="firstName"
              value={formData.firstName}
            />
            <input
              type="text"
              placeholder="Last name"
              onChange={confirmName}
              name="lastName"
              value={formData.lastName}
            />
          <button className="confirm--btn">Confirm</button>
        </form>
      </dialog>
      <dialog open={confirmedSeat && userDataCollected} className="dialog">
        <p>
          Your seat: {confirmedSeat?.seatNumber} <br></br> First name:
          {formData.firstName} <br></br> Last name: {formData.lastName}
          <br></br> Cost: ${confirmedSeat?.price}
        </p>
        <button className="close--btn" onClick={closeDialog}>
          Go back
        </button>
      </dialog>
      <div className="grid-container">{seats}</div>

      <button className="submit--btn" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
