import Content from "../components/Content/Content";
import {fireEvent, render, screen} from "@testing-library/react";

test('content has a button, a prop method will be called after clicking', () => {
    const fn = jest.fn();
    render(<Content openInviteModal={fn}/>);
    const btn = screen.getByText(/Request an invite/);
    expect(btn).toBeInTheDocument();
    expect(fn).toBeCalledTimes(0);
    fireEvent.click(btn);
    expect(fn).toBeCalledTimes(1);
});
