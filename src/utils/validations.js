import { Client } from "xrpl";
import { PUBLIC_SERVER, VALIDATION_REGEX } from "../constants/common.constants";

export async function validateXRPAccountFromAPI({ setState, xrplAddress }) {
    setState({
        xrplAddress: {
            ...xrplAddress,
            loading: true,
        },
    });
    const client = new Client(PUBLIC_SERVER, { connectionTimeout: 10000 });
    await client.connect();
    try {
        const payload = {
            command: "account_info",
            account: xrplAddress.inputValue,
        };

        const res = await client.request(payload);
        if (res && res.result.account_data.Account === xrplAddress.inputValue) {
            setState({
                xrplAddress: {
                    ...xrplAddress,
                    value: xrplAddress.inputValue,
                    loading: false,
                    error: [],
                },
            });
        } else {
            setState({
                xrplAddress: { ...xrplAddress, error: ["Invalid Input, please try again."], loading: false },
            });
        }
    } catch (err) {
        setState({
            xrplAddress: { ...xrplAddress, error: ["Invalid Input, please try again."], loading: false },
        });
        console.log(err);
    }
    client.disconnect();
};

export const isValidXrplRAddress = (value) => VALIDATION_REGEX.XRPL_R_ADDRESS.test(value);

export const isValidValue = (value, message = "Please enter a valid value", regex) => {
    let valid = true;

    if (!value || value.length === 0) {
        valid = false;
    }
    else if (regex) {
        valid = regex.test(value);
    };

    return {
        valid,
        error: valid ? [] : [message],
    }
}

export const isValidPassword = (value, message = "Enter a stronger password") => {
    const valid = VALIDATION_REGEX.PASSWORD.test(value);

    if (value.length === 0) {
        message = "Please enter a valid value.";
    };

    return {
        valid,
        error: valid ? [] : [message],
    }
};

export const isValidEqualValue = (value1, value2, message = "Your values don't match") => {
    if (value1.length === 0 || value2.length === 0) {
        return {
            error: ["Please enter a valid value."],
            valid: false
        }
    };

    const valid = value1 === value2;

    return {
        valid,
        error: valid ? [] : [message],
    }
};

export const isPositiveNumber = (value, message = "Please enter a valid value.") => {
    if (value.length === 0) {
        return {
            error: [message],
            valid: false
        }
    };

    value = parseInt(value);
    const valid = value > 0;

    return {
        valid,
        error: valid ? [] : [message],
    };
}