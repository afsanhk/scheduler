import React, {useState} from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/* Props
name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function
*/ 

export default function Form (props) {
  
  const {onCancel, onSave, interviewers} = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    setName("");
    setInterviewer(null);
    return;
  };
  
  const cancel = function () {
    reset();
    onCancel();
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name" 
            value = {name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(name, interviewer)}>Save</Button>
          {/* Passing arguments into onSave, which in turn calls save (index.js), which calls bookInterview (Application.js). */}
        </section>
      </section>
    </main>
  )
}