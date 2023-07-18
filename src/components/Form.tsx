import React from "react";
const initialFormData = {
    firstName: "",
    lastName: "",
  }


export default function Form(props) {
    const [formData, setFormData] = React.useState(initialFormData);

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
          props.onDataReady(formData)
        }
      } 

    return (
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
    )
}