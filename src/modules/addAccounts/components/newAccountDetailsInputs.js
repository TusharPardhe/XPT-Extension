import React from "react";
import { Button, Divider, Image, Input } from "semantic-ui-react";
import { validateXRPAccountFromAPI } from "../../../utils/validations";
import XPTLogoImg from "../../../assets/svg/xpt.svg";

const NewAccountDetailsInputs = ({ state, setState, onXrplAddressChange, onAliasValueChange, verifyAndSaveAddress, isErrorXrplAddInput }) => {
    const { xrplAddress, alias } = state;

    return (
        <div className="track_details_container">
            <div className="heading_container">
                <div className="track_heading">
                    <Image src={XPTLogoImg} className="logo_img" />
                    PT
                </div>
                <div className="sub_heading">Track XRPL accounts</div>
            </div>
            <Divider />
            <div className="input_details">
                <div className="xrpl_details_box_heading">Enter account details:</div>
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
                        <i className="error_txt">{alias.error[0]}</i>
                        <div className="btn_container">
                            <Button
                                type="submit"
                                color="green"
                                disabled={alias.error.length > 0 || alias.inputValue.length === 0}
                                inverted
                                onClick={verifyAndSaveAddress}
                            >
                                Submit
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="btn_container">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewAccountDetailsInputs;
