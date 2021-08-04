export function getAppointmentsForDay(state, day) {
  let output = [];

  // Empty array if the days array is empty.
  if(state.days.length === 0){
    return output;
  }
  // Filter out the day objects equal to the passed 'day' variable.
  const filteredDay = state.days.filter(data => data.name === day)
  
  // Only map if a day was found, otherwise return an empty array.
  if(Object.keys(filteredDay).length) {
    const mappedAppointments = filteredDay[0].appointments.map (el => state.appointments[el])
    output = mappedAppointments;
  }

  return output;
}