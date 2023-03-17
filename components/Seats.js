import React from "react"

export default function Seats(props){
    const [showPrice, setShowPrice] = React.useState (false)
    return(
        <div className="seats" onClick={()=> {setShowPrice(prevState => !prevState)}}>
    
                
                <img src="" className="seats--img"/>
                <p className="seats--number">{props.seatNumber}</p>
                {showPrice && <p className="seats--price">{props.price}$</p>}
                {/* cena wyświetla się po najechaniu myszką na fotel lub po wybraniu go */}
                
        </div>
    )
}