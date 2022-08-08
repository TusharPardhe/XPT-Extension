import React from "react";
import { Button, Input } from "semantic-ui-react";

const VerifyWithXUMM = ({ xrplAddress, imgUrl, onVerifyXrplAddressClick, isOpened }) => {
    if (xrplAddress.inputValue.length === 0) {
        return (
            <div className="verify_with_xumm">
                {imgUrl && <img src={imgUrl} alt="xumm" />}
                <Button className="xumm_link_btn" onClick={onVerifyXrplAddressClick} loading={isOpened} disabled={!!(isOpened || imgUrl)}>
                    Verify with XUMM
                </Button>
            </div>
        );
    }

    return (
        <Input
            name="id"
            placeholder="Enter your account address"
            autoComplete="off"
            value={xrplAddress.inputValue}
            error={xrplAddress.error.length > 0}
            disabled
        />
    );
};

export default VerifyWithXUMM;
