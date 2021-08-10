const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// Reducer takes in a state and action. action.type determines what to execute, action.value determines which values to enact in the execution
export default function reducer(state, action) {
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

    case SET_INTERVIEW: { 
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview }
      };
  
      // Make a copy of the state data for all appointments and insert the appointment for that single id (above)
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      
      // Update spots
      const stateCopy = {
        ...state,
        appointments
      };

      return { ...spotsRemaining(stateCopy)};
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

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

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
};