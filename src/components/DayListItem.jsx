import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

// This component renders each individual day in the Day List. 

export default function DayListItem(props) {

  const dayClass = classNames ({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function (number) {
    
    let term1 = `${number}`;
    let term2 = 'spots';

    number === 0 ? term1 = 'no' : term1 = `${number}`;
    number === 1 ? term2 = 'spot' : term2 = 'spots';

    return `${term1} ${term2}`; 
    
  }; 

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light"> {formatSpots(props.spots)} remaining</h3>
    </li>
  );
}