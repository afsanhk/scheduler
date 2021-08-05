import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
// },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm"
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Afsanul Khan",
//       interviewer: {
//         id: 3, 
//         name: "Mildred Nazir", 
//         avatar: "https://i.imgur.com/T2WwVfS.png" 
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Anika Tahsin",
//       interviewer: {
//         id: 4, 
//         name: "Cohana Roy", 
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "5pm",
//     interview: {
//       student: "Serajum Monira",
//       interviewer: {
//         id: 4, 
//         name: "Cohana Roy", 
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   }
// ];


export default function Application(props) {
  // Old States
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})
  
  // Replaced with state object
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {}
  });

  // Basically, only impact the intended state variable without impacting the rest of the 'state' variables.
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  // As told to intiailize.
  let dailyAppointments = [];
  
  // Side Effect to fetch data
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
        appointments: all[1].data
      }))
    })
    
  },[])
  
  dailyAppointments = getAppointmentsForDay(state, state.day); 

  const appointmentItem = dailyAppointments
    .map(appointment => {
      return <Appointment key={appointment.id} {...appointment}/>
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
      </section>
    </main>
  );
}
