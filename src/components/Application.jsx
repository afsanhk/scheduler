import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
},
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm"
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Afsanul Khan",
      interviewer: {
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png" 
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Anika Tahsin",
      interviewer: {
        id: 4, 
        name: "Cohana Roy", 
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: "last",
    time: "5pm",
    interview: {
      student: "Serajum Monira",
      interviewer: {
        id: 4, 
        name: "Cohana Roy", 
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];

const appointmentItem = appointments
  .map(appointment => {
    return <Appointment key={appointment.id} {...appointment}/>
  });

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');
  
  // Gets Days Data 
  useEffect(() => {
    const url = '/api/days';
    axios.get(url)
    .then(res => setDays(res.data))
    .catch(err => console.log(err))
  },[])

  

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
          <DayList days={days} day={day} setDay={setDay} />
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
