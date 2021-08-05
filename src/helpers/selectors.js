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

  // Simpler way to do than the loop in old commits. -- Helped by LoveJ! 
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

}