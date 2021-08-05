export function getAppointmentsForDay(state, day) {
  let output = [];

  // Filter out the day objects equal to the passed 'day' variable - empty if no day is found.
  const filteredDay = state.days.filter(data => data.name === day);

  // Only map if a day was found, otherwise return an empty array.
  if(Object.keys(filteredDay).length) {
    // In map, el refers to the appointment number, so appointments[el] accesses the appointment data from state.    
    output = filteredDay[0].appointments.map (el => state.appointments[el]); 
  }
  
  // Returns empty if filteredDay is empty.
  return output;
}

export function getInterview(state, interview) {

  // If the interview is null, return null. 
  if (!interview){
    return null;
  }

  // Need to go through state and find which appointment contains the interview with interviewer ID equal to the interviewer ID in the interview argument
  let filteredInterview;
  let filteredInterviewer;
  for (const key in state.appointments) {
    if(state.appointments[key].interview !== null && state.appointments[key].interview.interviewer === interview.interviewer) {
      filteredInterview = state.appointments[key].interview; // Take the interview with matching ID.
      filteredInterviewer = interview.interviewer; // Isolate the ID.
      filteredInterview['interviewer'] = state.interviewers[filteredInterviewer]; // Replace the ID with the corresponding interviewer object from state.
    }
  }

  return filteredInterview;
}