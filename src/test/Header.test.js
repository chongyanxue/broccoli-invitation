import Header from '../components/Header/Header';
import {render, screen} from "@testing-library/react";
import {COMPANY_NAME} from "../common/constant";

test('render header', () => {
    render(<Header title={COMPANY_NAME} />);
    const element = screen.getByText(COMPANY_NAME);
    expect(element).toBeInTheDocument();
});
