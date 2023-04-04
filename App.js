import React from "react";
import Seat from "./components/Seat";
import data from "./data";

const steps = {
  plane: "plane",
  userData: "userData",
  summary: "summary"
}

const initialFormData = {
  firstName: "",
  lastName: "",
}
export default function App() {
  const [seatId, setSeatId] = React.useState(null);
  const [premiumFilter, setPremiumFilter] = React.useState(false);
  const [formData, setFormData] = React.useState(initialFormData);
  const [currentStep, setCurrentStep] = React.useState (steps.plane)

  React.useEffect(() => {
    if(currentStep === steps.plane){
      setFormData(initialFormData)
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    if (formData.firstName !== "" && formData.lastName !== "") {
      setCurrentStep(steps.summary)
    }
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

  return (
    <div className="main">
      <h1>Choose your seat</h1>
      <button className="premium--btn" onClick={premium}>
        Show premium seats
      </button>
      <dialog open={currentStep === steps.userData} className="dialog">
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
      <dialog open={currentStep === steps.summary} className="dialog">
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
