import React from "react";

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
  
  const {interviewer, onCancel, onSave, interviewers, onChange} = props;

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={onChange} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onCancel={onCancel}>Cancel</Button>
          <Button confirm onSave={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}