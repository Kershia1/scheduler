import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, debugDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument(); // begins by waiting for the "Monday" button to be displayed as a promise chain
});

//compass answer 
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