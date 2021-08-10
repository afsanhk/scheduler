import { useEffect, useReducer } from "react";

import axios from "axios";

export default function useApplicationData () {
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  // const SET_INTERVIEW = "SET_INTERVIEW"; // Obsolete? Haven't invoked it once.

  // Reducer takes in a state and action. action.type determines what to execute, action.value determines which values to enact in the execution
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
          spots: action.spots
        };
      // case SET_INTERVIEW: { // Probably obsolete
      //   return { ...state, appointments: action.value };
      // }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // useReducer: Alternative to using useState method utilized in core work!
  const [state, dispatch] = useReducer(reducer,{
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  // setDay function:
  const setDay = day => dispatch({ type: SET_DAY, value: day });
  
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
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
    
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
      // Make a cope of the entire state (for use with the spotsRemaining function)
      const stateCopy = {
        ...state,
        appointments
      }

      dispatch({ type: SET_APPLICATION_DATA, ...spotsRemaining(stateCopy) });
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
      
      // Make a cope of the entire state (for use with the spotsRemaining function)
      const stateCopy = {
        ...state,
        appointments
      }
      
      dispatch({ type: SET_APPLICATION_DATA, ...spotsRemaining(stateCopy) });
    }) 
  }

  return { state, setDay, bookInterview, cancelInterview }
}