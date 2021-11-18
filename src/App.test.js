import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import pretty from "pretty";

const httpMock = {
  async delete() {
    return Promise.resolve(true);
  },
};

const httpErrorMock = {
  async delete() {
    return Promise.reject(false);
  },
};

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders learn react link", () => {
  render(<App />, container);
  const linkElement = screen.getByText(/To Do List/i);
  expect(linkElement).toBeInTheDocument();
});

test("should do all actions and remove task successfully", async () => {
  /**
   * Render de app with http service mocked with a successfull response
   */
  render(<App http={httpMock} />, container);

  const input = screen.getByTestId("input").querySelector('input[type="text"]');
  const addToDo = screen.getByTestId("add-todo");

  /**
   * Clicking addTodo button without write a todo before
   * dont add any todo to the incompletedList
   */

  act(() => {
    fireEvent.click(addToDo);
  });

  const [emptyIncompleteList] = screen.getAllByRole("list");

  expect(emptyIncompleteList.childElementCount).toEqual(0);

  /**
   * Creating an event of change in the input
   * and clicking the addButton provoques
   * that an unchecked todo is added to incompleteTodo list
   */
  act(() => {
    fireEvent.change(input, { target: { value: "to do testing" } });
  });

  act(() => {
    fireEvent.click(addToDo);
  });

  const [incompleteList, completeList] = screen.getAllByRole("list");

  expect(incompleteList.childElementCount).toEqual(1);
  expect(completeList.childElementCount).toEqual(0);

  /**
   * Clicking on the unchecked todo provoques that
   * app remove the todo from the incompletedTodo and
   * add it into the completedTodo with completed field as true
   */
  act(() => {
    const uncheckedCheckbox = incompleteList.querySelector(
      'input[type="checkbox"]'
    );
    fireEvent.click(uncheckedCheckbox);
  });

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');
  expect(checkbox.checked).toBe(true);
  expect(completeList.childElementCount).toEqual(1);

  /**
   * Clicking on the checked todo provoques that
   * app remove the todo from the completeTodo list and
   * add it into the incompleteTodo list with completed field as false
   */

  act(() => {
    const checkedCheckbox = completeList.querySelector(
      'input[type="checkbox"]'
    );
    fireEvent.click(checkedCheckbox);
  });

  expect(incompleteList.childElementCount).toEqual(1);
  expect(completeList.childElementCount).toEqual(0);

  /**
   * Clicking the deleteIcon will remove the todo
   * only when http service request is complety successfull
   */

  const deleteIcon = screen.getByTestId("delete-icon");

  await act(async () => {
    fireEvent.click(deleteIcon);
  });

  expect(checkbox).not.toBeInTheDocument();
});

test("should do all actions failing in remove task", async () => {
  /**
   * Render de app with http service mocked with an error
   */
  render(<App http={httpErrorMock} />, container);

  const input = screen.getByTestId("input").querySelector('input[type="text"]');
  const addToDo = screen.getByTestId("add-todo");

  /**
   * Creating an event of change in the input
   * and clicking the addButton provoques
   * that an unchecked todo is added to incompleteTodo list
   */
  act(() => {
    fireEvent.change(input, { target: { value: "to do testing" } });
  });

  act(() => {
    fireEvent.click(addToDo);
  });

  const [incompleteList, completeList] = screen.getAllByRole("list");

  expect(incompleteList.childElementCount).toEqual(1);
  expect(completeList.childElementCount).toEqual(0);

  /**
   * Clicking on the unchecked todo provoques that
   * app remove the todo from the incompletedTodo and
   * add it into the completedTodo with completed field as true
   */
  act(() => {
    const checkbox = incompleteList.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
  });

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');
  expect(checkbox.checked).toBe(true);
  expect(completeList.childElementCount).toEqual(1);

  /**
   * Clicking the deleteIcon will not remove the todo
   * if the http service rejects the request
   */
  const deleteIcon = screen.getByTestId("delete-icon");

  await act(async () => {
    fireEvent.click(deleteIcon);
  });

  expect(checkbox).toBeInTheDocument();
});
