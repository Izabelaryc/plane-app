import React from "react";
import Seat from "./components/Seat";
import data from "./data";
import Form from "./components/Form"

const steps = {
  plane: "plane",
  userData: "userData",
  summary: "summary"
}


export default function App() {
  const [seatId, setSeatId] = React.useState(null);
  const [premiumFilter, setPremiumFilter] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [currentStep, setCurrentStep] = React.useState (steps.plane)

  React.useEffect(() => {
    if(currentStep === steps.plane){
      setSeatId(null)
    }
  }, [currentStep])


  function submit() {
    if(seatId !== null){
      setCurrentStep(steps.userData)
    }
  }

  function closeDialog() {
    setCurrentStep(steps.plane)
  }

  function premium() {
    setPremiumFilter((prevState) => !prevState);
  }

  function confirmName(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }


  const confirmedSeat = data.find((item) => item.id === seatId);
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

  function saveUser(user){
    setUser(user);
    setCurrentStep(steps.summary)
  }

  return (
    <div className="main">
      <h1>Choose your seat</h1>
      <button className="premium--btn" onClick={premium}>
        Show premium seats
      </button>
      <dialog open={currentStep === steps.userData} className="dialog">
        <Form onDataReady={saveUser} key={currentStep}/>
      </dialog>
      <dialog open={currentStep === steps.summary} className="dialog">
        <p>
          Your seat: {confirmedSeat?.seatNumber} <br></br> First name:
          {user?.firstName} <br></br> Last name: {user?.lastName}
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
