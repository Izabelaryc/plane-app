import React from "react"
import Seats from "./components/Seats"
import data from "./data"

export default function App(){
    const seats = data.map(item => {
        return (
            <Seats 
                key={item.id}
                {...item}
            />
        )
    })

    return (
        <div>
            <h1>Choose your seat</h1>
            {seats}
            <button>Submit</button>
        </div>
    )
}