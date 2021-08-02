import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  });

  return(
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
    {props.name}
    </li>
  )

}