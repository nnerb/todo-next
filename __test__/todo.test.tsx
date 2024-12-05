import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; // for custom matchers like toBeInTheDocument
import Todos from "app/(routes)/todo/page";

describe("Todo Component", () => {
  it("renders the Todo component", () => {
    render(<Todos />);

    const headingElement = screen.getByText('TO DO');
    expect(headingElement).toBeInTheDocument()
  });

  it("adds a new task", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByRole('button', { name: 'Add Task'})

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText("New Task");
    expect(taskElement).toBeInTheDocument();
  });

  it("toggles task completion", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText('Add Task');

    // Add a new task
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    // Find the checkbox for the added task
    const checkbox = screen.getByRole("checkbox");

    // Check the task
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Uncheck the task
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("removes a task", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText('Add Task');

    // Add a new task
    fireEvent.change(inputElement, { target: { value: "Task to be removed" } });
    fireEvent.click(addButton);

    // Check if remove button exists
    const removeButton = screen.getByRole('button', { name: 'Remove'});
    // Click remove button
    fireEvent.click(removeButton);

    // Check if the value has been removed
    const taskElement = screen.queryByText("Task to be removed");
    expect(taskElement).not.toBeInTheDocument();
  });
});
