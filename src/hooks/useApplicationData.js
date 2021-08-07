import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData () {
  
  // Replaced with state object
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  // Basically, only impact the intended state variable without impacting the rest of the 'state' variables.
  const setDay = day => setState({ ...state, day });
  
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

  // Function to calculate spots remaining for a day
  function spotsRemaining (state) {
    // What is the current day?
    const currentDay = state.day;

    // What is the current day object?
    const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay);
    const currentDayObjIndex = state.days.findIndex(dayObj => dayObj.name === currentDay);

    // What are appointment for the current day object?
    const listOfAppts = currentDayObj.appointments;

    // Are these appointments free? Only return if null!
    const listOfFreeAppts = listOfAppts.filter(apptId => !state.appointments[apptId].interview);
    
    // What are the new number of spots?
    const newSpots = listOfFreeAppts.length;

    // // Make sure not to impact state directly! Insert changes into a copy.
    const stateCopy = { ...state }; // Makea copy of current state
    stateCopy.days = [ ...state.days]; // Make a copy of current state days
    const updatedDay = {...currentDayObj}; // Make a copy of the currentDayObj. Why? .filter and .find create a new array but with reference to the orignal.
    
    // Insert changes
    updatedDay.spots = newSpots;
    stateCopy.days[currentDayObjIndex] = updatedDay;

    return stateCopy;
  }
  
  // Function to book interview
  function bookInterview(id, interview) {
    
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
      
      setState(spotsRemaining({...state, appointments}))
    })
  }

  // Function to cancel/delete and interview
  function cancelInterview (id) {

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
      
      setState(spotsRemaining({...state, appointments}));
    }) 
  }

  return { state, setDay, bookInterview, cancelInterview }
}