import Reast from "react";

import { render } from "@testing-library/React";

import Application from "components/Application";

//  A test to render the react component

//To create a group of tests everythign can be wrapped in the describe function
//lighthouse prefers it with describe instead of test

//skip specific test commands are xit or test.skip

descibe("Appointment", () => {
  it("renders without crashing", () => { // it is test interchangeable with test
    render(<Application />);
  });

  it("does something it is supposed to do", ()=> {

  });

  it("does something else it is supposed to do", () => {

  });
});
