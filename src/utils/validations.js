import { VALIDATION_REGEX } from "../constants/common.constants";

export const isValidXrplRAddress = (value) => VALIDATION_REGEX.XRPL_R_ADDRESS.test(value);

export const isValidValue = (value, message = "Please enter a valid value", regex) => {
    let valid = true;

    if (!value || value.length === 0) {
        valid = false;
    } else if (regex) {
        valid = regex.test(value);
    }

    return {
        valid,
        error: valid ? [] : [message],
    };
};

export const isValidPassword = (value, message = "Enter a stronger password") => {
    let valid = true;

    if (value.length === 0) {
        message = "Please enter a valid value.";
        valid = false;
    }

    if (value.length < 8) {
        message = "Password length must be atleast 8 characters.";
        valid = false;
    }

    return {
        valid,
        error: valid ? [] : [message],
    };
};

export const isValidEqualValue = (value1, value2, message = "Your values don't match") => {
    if (value1.length === 0 || value2.length === 0) {
        return {
            error: ["Please enter a valid value."],
            valid: false,
        };
    }

    const valid = value1 === value2;

    return {
        valid,
        error: valid ? [] : [message],
    };
};

export const isPositiveNumber = (value, message = "Please enter a valid value.") => {
    if (value.length === 0) {
        return {
            error: [message],
            valid: false,
        };
    }

    value = parseInt(value);
    const valid = value > 0;

    return {
        valid,
        error: valid ? [] : [message],
    };
};
