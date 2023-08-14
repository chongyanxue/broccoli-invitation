import './InviteModal.css';
import React from "react";
import {useState} from "react";
import {isValidConfirmEmail, isValidEmail, isValidFullName} from "../../common/utils";
import {SERVICE_URL} from "../../common/constant";
import PropTypes from "prop-types";

function InviteModal({isShow, onClose}) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const [validating, setValidating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAccomplish, setIsAccomplish] = useState(false);
    const [errFromServer, setErrFromServer] = useState('');

    // Errors are only available when validating
    const fullNameError = validating && !isValidFullName(fullName);
    const emailError = validating && !isValidEmail(email);
    const confirmEmailError = validating && !isValidConfirmEmail(email, confirmEmail);

    const checkValidate = () => {
        setValidating(true);
        if (isValidFullName(fullName)
            && isValidEmail(email)
            && isValidConfirmEmail(email, confirmEmail)) {
            requestData();
        }
    };

    const requestData = () => {
        // Reset loading status and err for a new request.
        setLoading(true);
        setErrFromServer('');

        fetch(SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({
                name: fullName,
                email: email
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setValidating(false);
                if (data.errorMessage) {
                    setErrFromServer(data.errorMessage);
                }
                if (data === 'Registered') {
                    setIsAccomplish(true);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setErrFromServer('Connection failed');
            });
    };

    const resetForm = () => {
        setFullName('');
        setEmail('');
        setConfirmEmail('');
        setValidating(false);
        setLoading(false);
        setIsAccomplish(false);
        setErrFromServer('');
    };

    const completeForm = () => {
        resetForm();
        onClose();
    };

    const handleDialogClick = ((e) => {
        // Do not allow close the dialog by clicking outside when loading.
        if (!loading && !e.target.closest('.invite-modal')) {
            completeForm();
        }
    });

    return isShow && (
        <div className="invite-modal-entry" onClick={handleDialogClick}>
            <div className="invite-modal">
                <div className="invite-modal-block">
                    <h4>{isAccomplish ? 'All done!' : 'Request an invite'}</h4>
                    <span></span>
                </div>
                {isAccomplish ?
                    <div className="complete-wrapper">
                        <div className="promise-slogan">
                            <p>You will be one of the first to experience</p>
                            <p>Broccoli & Co. when we launch.</p>
                        </div>
                        <button onClick={completeForm}>OK</button>
                    </div> :
                    <div>
                        <form>
                            <input
                                placeholder="Full name"
                                type="text"
                                value={fullName}
                                onFocus={() => {
                                    setValidating(false);
                                }}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                className={fullNameError ? 'invalid-color' : 'valid-color'}
                            />
                            {fullNameError &&
                                <div className={"valid-err-msg"}>
                                    Length of full name should be greater than 3
                                </div>
                            }
                            <input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onFocus={() => {
                                    setValidating(false);
                                }}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className={emailError ? 'invalid-color' : 'valid-color'}
                            />
                            {emailError &&
                                <div className={"valid-err-msg"}>
                                    Invalid email format
                                </div>
                            }
                            <input
                                placeholder="Confirm email"
                                type="email"
                                value={confirmEmail}
                                onFocus={() => {
                                    setValidating(false);
                                }}
                                onChange={(e) => {
                                    setConfirmEmail(e.target.value);
                                }}
                                className={confirmEmailError ? 'invalid-color' : 'valid-color'}
                            />
                            {confirmEmailError &&
                                <div className={"valid-err-msg"}>
                                    Confirm email should be valid and same to email above!
                                </div>
                            }
                        </form>
                        {loading ? <button disabled>Sending, please wait...</button> :
                            <button onClick={checkValidate}>Send</button>}
                        {errFromServer !== '' &&
                            <div data-testid="show-resp-error" className="error-msg">Error: {errFromServer}</div>}
                    </div>}
            </div>
            <div className="invite-modal-mask"></div>
        </div>
    );
}

InviteModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default InviteModal;
