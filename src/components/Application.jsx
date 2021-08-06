import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  // Old States
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})
  
  // Replaced with state object
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  // Basically, only impact the intended state variable without impacting the rest of the 'state' variables.
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  // Side Effect to fetch ALL data
  useEffect(() => {
    const GET_DAYS = '/api/days';
    const GET_APPOINTMENTS = '/api/appointments';
    const GET_INTERVIEWERS = '/api/interviewers'
    
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
      // Basically, only impact the intended object keys and leave the others alone.
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
    
  },[])
  
  // Function to book interview
  function bookInterview(id, interview) {
    console.log('Inside bookInterview', id, interview);

    
    return axios.put(`/api/appointments/${id}`, {interview:{...interview}})
    .then(res =>  {
      // Make a copy of state data for the appointment with that specific id and the interview sublevel data
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      // Make a copy of the state data for all appointments and insert the appointment for that single id (above)
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      setState({
        ...state, 
        appointments: appointments      
      })

    })
  }

  // Initialize daily data:
  let dailyAppointments = [];
  let dailyInterviewers = [];

  dailyAppointments = getAppointmentsForDay(state, state.day); 
  dailyInterviewers = getInterviewersForDay(state, state.day);

  console.log('All appointments (before map):', dailyAppointments)

  const appointmentItem = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log('Inside appointment mapping: ',interview);
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers} 
        bookInterview={bookInterview}
      />
    )
  });
  
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
