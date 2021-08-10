import React, {useEffect} from "react";

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

  console.log('Inside index.js -- interview:', interview);

  // Handle stale state bugs
  useEffect(() => {
    if (interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [interview, transition, mode]);

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
    
    console.log('inside deleteAppt', id);
    transition(DELETING, true);
    cancelInterview(id)
    .then(res => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
  };

  return (
    <article className='appointment' data-testid="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {/* Ask for a code review for the SHOW props.onDelete code in Show.jsx */}
      {mode === SHOW && interview && <Show student={interview.student} interviewer={interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)}/>} 
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === EDIT && <Form name={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id}  onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={back}/>}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment."} onClose={back}/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={deleteAppt}/>}
          
    </article>
  )
}