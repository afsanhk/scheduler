import {useState} from 'react';

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial); // The mode state is what is controlled in useVisualMode
  const [history, setHistory] = useState([initial]); // Tracks history of mode changes

  // If you enter a new mode, setState to newMode.
  const transition = (newMode, replace = false) => {

    // Replace -- place newMode in place of last mode instead of pushing it after.
    if(replace) { 
      history.pop(); // Pop out the last mode 
    }

    history.push(newMode) // Push new mode to end of history.
    setMode(history[history.length - 1]); //setMode to the pushed mode in history.
  }

  // Moves to the previous mode
  const back = () => {
    if(history.length > 1){ // If there is only one item (i.e. first mode), don't pop.
      history.pop(); // Otherwise, pop out the last visited mode.
    }
    setMode(history[history.length - 1]); // Visit the new end of array, which was the previous mode.
  }

  return { mode, transition, back };
}