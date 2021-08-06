import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData () {

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

  // Function to cancel/delete and interview
  function cancelInterview (id) {
    console.log('Inside cancelInterview', id)

    return axios.delete(`/api/appointments/${id}`)
    .then(res =>  {
      // Make a copy of state data for the appointment with that specific id and the interview sublevel data
      const appointment = {
        ...state.appointments[id],
        interview: null
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

  return { state, setDay, bookInterview, cancelInterview }
}