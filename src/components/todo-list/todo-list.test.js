import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "./index";
import React from "react";

const initialToDos = [
  {
    id: "testId",
    task: "to do testing",
    complete: false,
  },
  {
    id: "testId1",
    task: "to do testing1",
    complete: false,
  },
  {
    id: "testId2",
    task: "to do testing2",
    complete: false,
  },
  {
    id: "testId3",
    task: "to do testing3",
    complete: false,
  },
];

test("should render all todos given in toDos prop", () => {
  const completeFn = jest.fn();
  const deleteFn = jest.fn();

  render(
    <TodoList
      toDos={initialToDos}
      toDoChange={completeFn}
      toDoDelete={deleteFn}
    />
  );

  const list = screen.getByRole("list");

  expect(list.childElementCount).toEqual(initialToDos.length);
});

test("should call completeFn changing complete property", () => {
  const completeFn = jest.fn();
  const deleteFn = jest.fn();

  render(
    <TodoList
      toDos={initialToDos}
      toDoChange={completeFn}
      toDoDelete={deleteFn}
    />
  );
  const checkbox = screen
    .getByRole("list")
    .querySelector('input[type="checkbox"]');

  fireEvent.click(checkbox);

  const expectedChange = {
    ...initialToDos[0],
    complete: !initialToDos[0].complete,
  };

  expect(completeFn).toBeCalledWith(expectedChange);
});

test("should call deleteFn when clicks on delete icon", () => {
  const completeFn = jest.fn();
  const deleteFn = jest.fn();

  render(
    <TodoList
      toDos={initialToDos}
      toDoChange={completeFn}
      deleteToDo={deleteFn}
    />
  );
  const deleteIcons = screen.getAllByTestId("delete-icon");

  fireEvent.click(deleteIcons[0]);

  expect(deleteFn).toBeCalledWith(initialToDos[0]);
});
