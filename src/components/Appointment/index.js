import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

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
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Default to SHOW if interview is booked, otherwise empty.
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  // Function to run onSave
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
    .then(res => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true))
  };

  // Function to run onDelete from Show.
  function deleteAppt() {
    transition(DELETING, true);
    cancelInterview(id)
    .then(res => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
  };

  return (
    <article className='appointment' data-testid="appointment">
      <Header time={time}/>
      {/* Empty interview slot */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      
      {/* Booked interview slot */}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)}/>} 
      
      {/* Create or edit an interview */}
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === EDIT && <Form name={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id}  onSave={save} onCancel={() => back()}/>}
      
      {/* Saving */}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={back}/>}
      
      {/* Deleting */}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment."} onClose={back}/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={deleteAppt}/>} 
    </article>
  )
}