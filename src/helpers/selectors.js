export function getAppointmentsForDay(state, day) {
  let output = [];

  if(state.days.length === 0){
    return output;
  }
  // Filter out the day objects equal to the passed 'day' variable.
  const filteredDay = state.days.filter(data => data.name === day)
  
  if(Object.keys(filteredDay).length) {
    const mappedAppointments = filteredDay[0].appointments.map (el => state.appointments[el])
    output = mappedAppointments;
  }

  return output;
}