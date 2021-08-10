import React from "react";

// This component will show time of a booked appointment. 
export default function Header (props) {

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  )
}