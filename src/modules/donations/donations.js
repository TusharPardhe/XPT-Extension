import React, { useEffect, useRef } from 'react';
import { Button, Input, TextArea } from 'semantic-ui-react';

import useMergedState from '../../utils/useMergedState';

import FUNDRAISING_IMG from "../../assets/png/fundraising.png"
import { VALIDATION_REGEX } from '../../constants/common.constants';
import { isPositiveNumber } from '../../utils/validations';
import { scrollToRef } from '../../utils/common.utils';
import { DONATIONS_INITIAL_STATE, DONATION_AMOUNTS_FOR_USER_SELECTION } from '../../constants/donations.constants';
import { ApiCall } from '../../utils/api.util';

import "./donations.scss";

const { NUMBERS_AND_EMPTY } = VALIDATION_REGEX;

const Donations = () => {
    const [state, setState] = useMergedState(DONATIONS_INITIAL_STATE);
    const amountRef = useRef();
    const { amount, xummPngLink, donateBtnEnabled, message } = state;

    useEffect(() => {
        scrollToRef(amountRef);
    }, []);

    const handleAmountInput = (e, res) => {
        const { value } = res;

        if (NUMBERS_AND_EMPTY.test(value)) {
            const { error } = isPositiveNumber(value);
            setState({
                amount: {
                    error,
                    value,
                }
            });
        }
    };

    const handleMsgInput = (e, res) => {
        const { value } = res;
        setState({
            message: {
                ...message,
                value,
            }
        });
    }

    const onAmountBtnClick = (value) => setState({ amount: { value, error: [] } });

    const checkFieldValues = () => {
        let isValid = true;
        const { error } = isPositiveNumber(amount.value);

        if (error.length > 0) {
            isValid = false;
            setState({
                amount: {
                    ...amount,
                    error,
                }
            });
        };

        return isValid;
    }

    const onDonationBtnClick = () => {
        const isValid = checkFieldValues();

        if (isValid) {
            const payload = {
                method: "POST",
                url: "user/donate",
                encrypt: false,
                auth: false,
                data: {
                    amount: (parseFloat(amount.value) * 1000000).toString(),
                    memo: message.value,
                },
            };

            ApiCall(payload)
                .then((response) => {
                    if (response.data) {
                        const { png } = response.data;
                        setState({ xummPngLink: png, donateBtnEnabled: false });
                        setTimeout(() => {
                            setState({ donateBtnEnabled: true });
                        }, 5000);
                    }
                }).finally(() => {
                    scrollToRef(amountRef);
                });
        };
    }

    return (
        <div className="donations_container">
            <div className="donations_quote">Small steps make a big difference. <br /> We appreciated your contribution!</div>
            <div className="img_container" ref={amountRef}>
                {xummPngLink.length > 0 && <div className="scan_me">Scan me using XUMM</div>}
                <img src={xummPngLink.length > 0 ? xummPngLink : FUNDRAISING_IMG} alt="donation_img" className="img" />
            </div>
            <div className="input_field">
                <div className="label">Amount (in XRP):</div>
                <Input
                    placeholder="Please enter donation amount (in XRP)"
                    name="amount"
                    type="tel"
                    style={{ width: "100%" }}
                    value={amount.value}
                    onChange={handleAmountInput}
                    error={amount.error.length > 0}
                />
            </div>
            <div className="amount_selection">
                {DONATION_AMOUNTS_FOR_USER_SELECTION.map(amount =>
                    <Button
                        className="amount_btn"
                        onClick={() => onAmountBtnClick(amount)}>
                        {amount} XRP
                    </Button>
                )}
            </div>
            <div className="input_field">
                <div className="label">Write a message:</div>
                <TextArea
                    style={{
                        width: "100%",
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "80px",
                        maxHeight: "150px",
                    }}
                    name="message"
                    onChange={handleMsgInput}
                    value={message.value}
                    maxLength={250}
                />
            </div>
            <div className="donate_btn">
                <Button color="green" onClick={onDonationBtnClick} disabled={!donateBtnEnabled}>
                    Donate
                </Button>
            </div>
        </div>
    );
}

export default Donations;