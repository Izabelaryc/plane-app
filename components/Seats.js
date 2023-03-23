import React from "react";
import seatbc from "../images/seatbc.png";
import seatyc from "../images/seatyc.png";

export default function Seats(props) {
  const [showPrice, setShowPrice] = React.useState(false);

  function addBorder() {
    props.onSelect()
    
  }
  return (
    <div
    style = {{border: props.selected ? "2px solid black" : "2px solid transparent"}}
      className="seats"
      onClick={addBorder}
      onMouseEnter={() => {
        setShowPrice(true);
      }}
      onMouseLeave={() => {
        setShowPrice(false);
      }}
    >
      {/* nie działają zdjęcia */}
      <img src={props.id <= 5 ? seatbc : seatyc} className="seats--img" />
      <p className="seats--number">{props.seatNumber}</p>
      {showPrice && <p className="seats--price">{props.price}$</p>}
    </div>
  );
}
