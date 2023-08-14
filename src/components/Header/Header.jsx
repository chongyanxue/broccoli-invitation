import './Header.css';
import React from "react";
import PropTypes from "prop-types";

// title as a property.
function Header({title}) {
    return (
        <header className="page-header">
            <h4>{title}</h4>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string
}
export default Header;
