import Footer from "../components/Footer/Footer";
import {render, screen} from "@testing-library/react";

test('render footer', () => {
    render(<Footer />);
    const element1 = screen.getByText(/Made with ❤ in Melbourne./);
    expect(element1).toBeInTheDocument();
    const element2 = screen.getByText(/© 2023 Broccoli & Co. All rights reserved./);
    expect(element2).toBeInTheDocument();
});
