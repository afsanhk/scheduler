import {useState} from 'react';

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial); // The mode state is what is controlled in useVisualMode
  const [history, setHistory] = useState([initial]); // Tracks history of mode changes

  let historyCopy = [...history]; // Everything works if I just use history but make a copy so we don't affect state directly. 
  // If you enter a new mode, setState to newMode.
  const transition = (newMode, replace = false) => {

    // Replace -- place newMode in place of last mode instead of pushing it after.
    if(replace) { 
      historyCopy.pop(); // Pop out the last mode 
    }

    historyCopy.push(newMode) // Push new mode to end of history.
    setHistory(historyCopy); // Since we're using a copy, set the history to the copy state.
    setMode(historyCopy[historyCopy.length - 1]); //setMode to the pushed mode in history.
  }

  // Moves to the previous mode
  const back = () => {
    if(historyCopy.length > 1){ // If there is only one item (i.e. first mode), don't pop.
      historyCopy.pop(); // Otherwise, pop out the last visited mode.
    }
    setHistory(historyCopy); // Since we're using a copy, set the history to the copy state.
    setMode(historyCopy[historyCopy.length - 1]); // Visit the new end of array, which was the previous mode.
  }

  return { mode, transition, back };
}