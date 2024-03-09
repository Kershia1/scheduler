import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, debugDOM, getAllByTestId } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

/**We also need to understand the appropriate use of imported queries vs queries that are returned by render function. We can import { getByText } from "@testing-library/react" or we can use const { getByText } = render(<Component />). The two functions differ even though they share a name. The second example already has a container and does not need to have one passed to it. */

afterEach(cleanup);
//test 1
it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument(); // begins by waiting for the "Monday" button to be displayed as a promise chain
});

//compass answer
//test 2
it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));   
  fireEvent.click(queryByAltText(appointment, "Confirm"));

    await waitForElement(() => queryByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByAltText(day, "Monday")
    );
    expect(queryByAltText(day, "2 spots remaining")).toBeInTheDocument();
  });
  

//my implementation
  // it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
  //   const { getByText } = render (<Application />);

  //   await waitForElement(() => getByText("Monday"));

  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[1];

  //   fireEvent.click(getByAltText(appointment, "Delete"));
  //   fireEvent.click(getByText(appointment, "Confirm"));

  //   await waitForElement(() => getByAltText(appointment, "Add"));

  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );
  //   expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  // });

//compass answer 
//test 3
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  console.log(prettyDOM(appointment));
});

const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);

console.log(prettyDOM(day));

//test 4
it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));   
  fireEvent.click(queryByAltText(appointment, "Confirm"));

    await waitForElement(() => queryByAltText(appointment, "Edit"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByAltText(day, "Monday")
    );
    expect(queryByAltText(day, "1 spot remaining")).toBeInTheDocument();

});

//test 5 
it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

//test 6
it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

//test 7
it("shows the delete error when failing to delete an existing appointment", () => {
  axios.delete.mockRejectedValueOnce();
})

/* missed somethings time for bed. 

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});


//my answer
// it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
//   const { container, debug } = render(<Application />);

//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   fireEvent.click(getByAltText(container, "Add"));

//   fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
//     target: { value: "Lydia Miller-Jones" }
//   });

//   fireEvent.click(getByAltText(container, "Sylvia Palmer"));

//   fireEvent.click(getByText(container, "Save"));

//   expect(getByText(container, "SAVING")).toBeInTheDocument();

//   await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

//   const day = getAllByTestId(container, "day").find(day =>
//     queryByText(day, "Monday")
//   );

//   expect(getByText(day, "no spots remaining")).toBeInTheDocument();
// });



/**
 * 
 * Scoping is a technique used to search subtrees of the DOM. We can find a node that represents our <article> container for the appointments. With a reference to this specific node, we can limit our query for text, labels and testIds to be within the specific <article>.

To use the scoped queries, we need to import { getByText } from "@testing-library/react". Since there are now two sources of a function called getByText we need to be careful about how we use it. For the test that we are writing, we will not access any query functions returned by the render function.

We will only need to access the container value from the render function. This container represents the DOM tree that we are working with, and we can pass it to any of the imported queries.
 * 
 *  I wish they had lead with this ...
 * One reason the test might fail is because we have mocked the axios library. If we see the error TypeError: Cannot set property 'baseURL' of undefined it means that we have used the code axios.defaults.baseURL = "http://localhost:8001"; to set a default base url for axios. We are mocking the entire axios object. We need to mock this configuration object as well.
 */