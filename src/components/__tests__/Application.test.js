import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
    
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    // Wait until Archie Cohen loads
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // First empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    // Click add, enter Lydia Miller Jones, click first interviewer, click save
    fireEvent.click(getByAltText(appointment,"Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment,"Save"));
    
    console.log(prettyDOM(appointment));
    
  });
  
})

// // Async Await version of first test
// it("changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));

//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
// });