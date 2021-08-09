describe("Appointments", () => {

  it("should book an interview", () => {
    
    // Reset API
    cy.request("GET", "/api/debug/reset");
    
    // 1. Visits the root of our web server and wait for Monday to load
    cy.visit("/");
    cy.contains("Monday");
    // 2. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // 3. Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // 4. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // 5. Clicks the save button
    cy.contains("Save").click();
    // 6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  xit("should edit an interview", () => {

    // Reset API
    cy.request("GET", "/api/debug/reset");

    // 1. Visits the root of our web server
    cy.visit("/");
    // 2. Clicks the edit button for the existing appointment
    // 3. Changes the name and interviewer
    // 4. Clicks the save button
    // 5. Sees the edit to the appointment
  });

  xit("should cancel an interview", () => {

    // Reset API
    cy.request("GET", "/api/debug/reset");

    // 1. Visits the root of our web server
    cy.visit("/");
    // 2. Clicks the delete button for the existing appointment
    // 3. Clicks the confirm button
    // 4. Sees that the appointment slot is empty
    
  });
})