import { Client } from "xrpl";
import { PUBLIC_SERVER, VALIDATION_REGEX } from "../constants/common.constants";

export const isValidXrplRAddress = (value) => value.startsWith("r") && value.length >= 25 && value.length <= 35;

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
}

export const isValidPassword = (value) => {
    return VALIDATION_REGEX.PASSWORD.test(value);
};
