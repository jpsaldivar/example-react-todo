import { fireEvent, render, screen } from "@testing-library/react";
import TodoForm from "./index";
import React from "react";
import { act } from "react-dom/test-utils";

const initialToDo = {
  task: "",
};

test("should call handleChange function when theres a change in the input", async () => {
  const completeFn = jest.fn();

  render(<TodoForm partialToDo={initialToDo} handleChange={completeFn} />);

  const input = screen.getByTestId("input").querySelector('input[type="text"]');

  expect(input.value).toEqual("");

  await act(async () => {
    fireEvent.change(input, { target: { value: "to do testing" } });
  });

  expect(completeFn).toBeCalledWith({ task: "to do testing" });
});
