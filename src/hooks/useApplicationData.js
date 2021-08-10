import { useEffect, useReducer } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData () {
  
  // useReducer: Alternative to using useState method utilized in core work!
  const [state, dispatch] = useReducer(reducer,{
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  // setDay function:
  const setDay = day => dispatch({ type: SET_DAY, value: day });
  
  // Side Effect to get ALL data and set state
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
  
  // Function to book interview
  function bookInterview(id, interview) { 
    return axios.put(`/api/appointments/${id}`, {interview:{...interview}})
    .then(() => dispatch({ type: SET_INTERVIEW, id, interview}))
  }

  // Function to cancel/delete and interview
  function cancelInterview (id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(()=>dispatch({ type: SET_INTERVIEW, id, interview:null }));
  }

  return { state, setDay, bookInterview, cancelInterview }
}