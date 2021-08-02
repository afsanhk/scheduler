import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  
  const { interviewers } = props;

  const interviewerItem = interviewers.map(data => {
    
    return <InterviewerListItem
      key = {data.id}
      name = {data.name}
      avatar = {data.avatar}
      selected = {data.id === props.interviewer}
      setInterviewer = {props.setInterviewer}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItem}</ul>
    </section>
  );
}