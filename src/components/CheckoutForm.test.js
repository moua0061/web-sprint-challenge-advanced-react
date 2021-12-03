import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />)
    const header = screen.queryByText(/checkout form/i)
    expect(header).toBeInTheDocument();
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'firstname');
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName,'lastname');
    const address = screen.getByLabelText(/address/i);
    userEvent.type(address, '123 main street');
    const city = screen.getByLabelText(/city/i);
    userEvent.type(city, 'miami');
    const state = screen.getByLabelText(/state/i);
    userEvent.type(state, 'fl');
    const zip = screen.getByLabelText(/zip/i);
    userEvent.type(zip, '12345');
    
    const button = screen.getByRole('button');
    userEvent.click(button);
    
    await waitFor(() => {
        const confirmationMessage = screen.getByTestId('successMessage')
        expect(confirmationMessage).toBeInTheDocument();
        expect(confirmationMessage).toBeTruthy();
    })
});
