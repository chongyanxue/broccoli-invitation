import InviteModal from "../components/InviteModal/InviteModal";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

const mockFn = jest.fn();
jest.setTimeout(20000);

describe('testing invite modal', () => {
    test('modal is shown with 3 inputs and 1 button', () => {
        render(<InviteModal isShow={true} onClose={mockFn}/>);
        expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm email')).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    test('modal is not shown', () => {
        render(<InviteModal isShow={false} onClose={mockFn}/>);
        expect(screen.queryByPlaceholderText('Full name')).not.toBeInTheDocument();
    });

    test('Click Send button without input', () => {
        render(<InviteModal isShow={true} onClose={mockFn}/>);

        const sendBtn = screen.getByText(/Send/);
        fireEvent.click(sendBtn);

        expect(sendBtn).toHaveTextContent('Send');
        expect(screen.getByPlaceholderText('Full name')).toHaveClass('invalid-color');
    });

    test('Click Send button with invalid fullName', () => {
        render(<InviteModal isShow={true} onClose={mockFn}/>);

        const fullNameInput = screen.getByPlaceholderText('Full name');
        fireEvent.change(fullNameInput, {target: {value: 'a'}});

        const sendBtn = screen.getByText(/Send/);
        fireEvent.click(sendBtn);

        expect(sendBtn).toHaveTextContent('Send');
        expect(fullNameInput).toHaveClass('invalid-color');
    });

    test('Click Send button with valid fullName and invalid Email', () => {
        render(<InviteModal isShow={true} onClose={mockFn}/>);

        const fullNameInput = screen.getByPlaceholderText('Full name');
        fireEvent.change(fullNameInput, {target: {value: 'abc'}});

        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, {target: {value: 'abc'}});

        const sendBtn = screen.getByText('Send');
        fireEvent.click(sendBtn);

        expect(sendBtn).toHaveTextContent('Send');
        expect(fullNameInput).toHaveClass('valid-color');
        expect(emailInput).toHaveClass('invalid-color');
    });

    test('Click Send button with valid fullName and Email but invalid confirm email',
        () => {
            render(<InviteModal isShow={true} onClose={mockFn}/>);

            const fullNameInput = screen.getByPlaceholderText('Full name');
            fireEvent.change(fullNameInput, {target: {value: 'abc'}});

            const emailInput = screen.getByPlaceholderText('Email');
            fireEvent.change(emailInput, {target: {value: 'abc@123.com'}});

            const emailConfirmInput = screen.getByPlaceholderText('Confirm email');
            fireEvent.change(emailConfirmInput, {target: {value: 'abc@12.com'}});

            const sendBtn = screen.getByText('Send');
            fireEvent.click(sendBtn);

            expect(sendBtn).toHaveTextContent('Send');
            expect(fullNameInput).toHaveClass('valid-color');
            expect(emailInput).toHaveClass('valid-color');
            expect(emailConfirmInput).toHaveClass('invalid-color');
        });

    test('Click Send button with valid inputs',
        async () => {
            render(<InviteModal isShow={true} onClose={mockFn}/>);

            const fullNameInput = screen.getByPlaceholderText('Full name');
            fireEvent.change(fullNameInput, {target: {value: 'abc'}});

            const emailInput = screen.getByPlaceholderText('Email');
            fireEvent.change(emailInput, {target: {value: 'abc@123.com'}});

            const emailConfirmInput = screen.getByPlaceholderText('Confirm email');
            fireEvent.change(emailConfirmInput, {target: {value: 'abc@123.com'}});

            const sendBtn = screen.getByText('Send');
            fireEvent.click(sendBtn);

            expect(sendBtn).toHaveTextContent('Sending');
            expect(fullNameInput).toHaveClass('valid-color');
            expect(emailInput).toHaveClass('valid-color');
            expect(emailConfirmInput).toHaveClass('valid-color');

            await waitFor(() => {
                expect(screen.getByText('OK')).toBeInTheDocument();
            }, {timeout: 5000})
        });


    test('Click Send button with usedemail@airwallex.com',
        async () => {
            render(<InviteModal isShow={true} onClose={mockFn}/>);

            const fullNameInput = screen.getByPlaceholderText('Full name');
            fireEvent.change(fullNameInput, {target: {value: 'abc'}});

            const emailInput = screen.getByPlaceholderText('Email');
            fireEvent.change(emailInput, {target: {value: 'usedemail@airwallex.com'}});

            const emailConfirmInput = screen.getByPlaceholderText('Confirm email');
            fireEvent.change(emailConfirmInput, {target: {value: 'usedemail@airwallex.com'}});

            const sendBtn = screen.getByText('Send');
            fireEvent.click(sendBtn);

            expect(sendBtn).toHaveTextContent('Sending');
            expect(fullNameInput).toHaveClass('valid-color');
            expect(emailInput).toHaveClass('valid-color');
            expect(emailConfirmInput).toHaveClass('valid-color');

            await waitFor(() => {
                expect(screen.getByText(/Bad Request:/)).toBeInTheDocument();
            }, {timeout: 5000})
        });
});
