import React from "react";
import DayListItem from "./DayListItem";

// This component renders the list of days. 

export default function DayList (props) {
  
  const { days } = props;

  const dayItem = days.map(day => {
  
    return <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}
    />

  });
  
  return (
    <ul>{dayItem}</ul>
  )
}