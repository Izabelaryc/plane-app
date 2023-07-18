import React, { ChangeEventHandler, FormEventHandler } from "react";
const initialFormData = {
    firstName: "",
    lastName: "",
  }
type FormData = {
  firstName: string;
  lastName: string;
}
type Props = {
  onDataReady: (formData: FormData)=> void;
}

export default function Form(props: Props) {
    const [formData, setFormData] = React.useState(initialFormData);

    const confirmName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [event.target.name]: event.target.value,
          };
        });
      }

      const handleSubmit: FormEventHandler = (event) => {
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