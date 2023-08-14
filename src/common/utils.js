const emailReg = /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/;

export const isValidFullName = (fullName) => {
    if (!fullName) {
        return false;
    }
    return fullName.length >= 3;
}

export const isValidEmail = (email) => {
    if (!email) {
        return false;
    }
    return emailReg.test(email);
}

export const isValidConfirmEmail = (email, confirmEmail) => {
    if (!isValidEmail(email)) {
        return false;
    }
    return email === confirmEmail;
}
