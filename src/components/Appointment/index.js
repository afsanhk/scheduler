import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment (props) {
  
  const { time, interview } = props;
  // Temporary
  let interviewers = [];

  // Mode Constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(props.interview? SHOW : EMPTY)

  return (
    <article className='appointment'>
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />} 
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()}/>}
    </article>
  )
}