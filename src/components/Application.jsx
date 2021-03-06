import React from "react";

import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  
  // Import state
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Daily appointment data:
  let dailyAppointments = [];
  let dailyInterviewers = [];

  dailyAppointments = getAppointmentsForDay(state, state.day); 
  dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentItem = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers} 
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });
  
  // HTML/JSX Content
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentItem}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
