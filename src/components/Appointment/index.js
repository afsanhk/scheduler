import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment (props) {
  
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  // Mode Constants & customHook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  // Default to SHOW if interview is booked, otherwise empty.
  const { mode, transition, back } = useVisualMode(props.interview? SHOW : EMPTY)

  // Function to run onSave
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
    .then(res => transition(SHOW))

  };

  // Function to run onDelete from Show.
  function deleteAppt(appointmentId) {
    const interview = null;

    transition(DELETING);
    cancelInterview(appointmentId, interview);
  };

  return (
    <article className='appointment'>
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />} 
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message={"Saving"} />}    
    </article>
  )
}