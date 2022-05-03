import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import MemberForm from "../Form";
import { Provider } from "react-redux";
import store from "../../store";

it("Invite Member Test", async () => {
  render(
    <Provider store={store}>
      <MemberForm />
    </Provider>
  );
  const defaultInput = screen.getByTestId("users-email-0");
  expect(defaultInput).toBeInTheDocument();

  const addButton = screen.getByTestId("add-button");
  fireEvent.click(addButton);

  const emailInput = screen.getByTestId("users-email-1");
  fireEvent.change(emailInput, { target: { value: "aditi1@gmail.com" } });

  expect(emailInput).toBeInTheDocument();

  const roleInput = screen.getByTestId("users-role-1");

  fireEvent.change(roleInput, { target: { value: "Manager" } });

  const submitButton = screen.getByTestId("submit-button");

  fireEvent.click(submitButton);

  const alertElement = await waitFor(() =>
    screen.findByText("Successfully added member")
  );

  expect(alertElement).toBeInTheDocument();
});
