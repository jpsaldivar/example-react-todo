import { fireEvent, render, screen } from "@testing-library/react";
import ToDo from "./index";
import React from "react";
import { act } from "react-dom/test-utils";

const initialToDo = {
  task: "to do testing",
};

test("should return toDo when checkbox is clicked", async () => {
  const completeFn = jest.fn();

  render(<ToDo toDo={initialToDo} completeChange={completeFn} />);

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');

  expect(checkbox.checked).toEqual(false);

  await act(async () => {
    fireEvent.click(checkbox);
  });

  expect(completeFn).toBeCalledWith({ task: "to do testing" });
  expect(checkbox.checked).toEqual(true);
});

test("should be checked if task is completed", async () => {
  const completeFn = jest.fn();

  const completedToDo = {
    task: "to do testing",
    complete: true,
  };

  render(<ToDo toDo={completedToDo} completeChange={completeFn} />);
  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');

  const formControl = screen.getByTestId("control");

  expect(formControl).toHaveClass("completed");
  expect(checkbox.checked).toEqual(true);
});
