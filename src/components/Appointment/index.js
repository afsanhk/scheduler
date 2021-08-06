import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

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
  const CONFIRM = "CONFIRM";

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
  function deleteAppt() {
    
    console.log('inside deleteAppt', id);
    transition(DELETING);
    cancelInterview(id)
    .then(res => transition(EMPTY));
  };

  return (
    <article className='appointment'>
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {/* Ask for a code review for the SHOW props.onDelete code in Show.jsx */}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRM)}/>} 
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={deleteAppt}/>}    
    </article>
  )
}