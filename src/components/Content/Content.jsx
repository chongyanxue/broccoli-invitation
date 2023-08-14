import './Content.css';
import React from "react";
import PropTypes from "prop-types";

function Content({openInviteModal}) {
    return (
        <div className="page-content">
            <section className="slogan">
                <div className="block">
                    A better way
                </div>
                <div className="block">
                    to enjoy every day.
                </div>
                <p>Be the first to know when we launch.</p>
            </section>
            <section className="invite">
                <button onClick={openInviteModal}>Request an invite</button>
            </section>
        </div>
    );
}

Content.propTypes = {
    openInviteModal: PropTypes.func
};

export default Content;
