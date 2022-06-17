import React from "react";
import { Button, Input } from "semantic-ui-react";
import { validateXRPAccountFromAPI } from "../../../utils/validations";

const NewAccountDetailsInputs = ({ state, setState, onXrplAddressChange, onAliasValueChange, verifyAndSaveAddress, isErrorXrplAddInput }) => {
    const { xrplAddress, alias } = state;

    return (
        <div className="track_details_container">
            <div className="xrpl_details_box_heading">Please enter account details:</div>
            <div className="input_details">
                <Input
                    placeholder="r....."
                    label={{ content: "Address: " }}
                    value={xrplAddress.inputValue}
                    labelPosition="left"
                    onChange={onXrplAddressChange}
                    error={xrplAddress.error.length > 0}
                />
                <i className="error_txt">{xrplAddress.error[0]}</i>
                {xrplAddress.value.length > 0 && xrplAddress.error.length === 0 ? (
                    <>
                        <Input
                            placeholder="Enter alias.."
                            label={{ content: "Alias: " }}
                            labelPosition="left"
                            value={alias.inputValue}
                            onChange={onAliasValueChange}
                            error={alias.error.length > 0}
                        />
                        <Button
                            type="submit"
                            color="green"
                            disabled={alias.error.length > 0 || alias.inputValue.length === 0}
                            inverted
                            onClick={verifyAndSaveAddress}
                        >
                            Submit
                        </Button>
                    </>
                ) : (
                    <Button
                        inverted
                        color={isErrorXrplAddInput ? "grey" : "green"}
                        type="submit"
                        onClick={() => validateXRPAccountFromAPI({ setState, xrplAddress })}
                        disabled={isErrorXrplAddInput}
                        loading={xrplAddress.loading}
                    >
                        Validate
                    </Button>
                )}
            </div>
        </div>
    );
};

export default NewAccountDetailsInputs;
