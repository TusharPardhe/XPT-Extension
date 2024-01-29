import { Button, Input } from 'semantic-ui-react';
import { Client, Wallet } from 'xrpl';
import React, { useState } from 'react';
import { SUIT_COIN_HEX, SUIT_COIN_ISSUER, SUIT_COIN_LIMIT } from '../../../constants/common.constants';

import { getDataFromLocalStrg } from '../../../utils/common.utils';
import { toast } from 'react-toastify';

export const TrustLineTransaction = ({ isLoading, setIsLoading, fetchAccountDetails }) => {
    const [password, setPassword] = useState('');

    const transaction = {
        TransactionType: 'TrustSet',
        LimitAmount: {
            currency: SUIT_COIN_HEX,
            value: SUIT_COIN_LIMIT,
            issuer: SUIT_COIN_ISSUER,
        },
        Flags: 131072,
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            if (password.length === 0) {
                toast.error('Please enter password');
                setIsLoading(false);
                return;
            }

            const client = new Client(process.env.XRPL_SERVER);
            await client.connect();
            const storedAccounts = getDataFromLocalStrg('savedAccounts', password);
            const [account, key] = Object.entries(storedAccounts)[0];
            const wallet = Wallet.fromSeed(key);

            const trustLine = {
                ...transaction,
                Account: account,
            };

            const prepared = await client.autofill(trustLine);
            console.log(prepared);
            const signed = wallet.sign(prepared);

            const res = await client.submit(signed.tx_blob);
            setIsLoading(false);

            if (res?.result?.meta?.TransactionResult !== 'tesSUCCESS' || res?.result?.engine_result !== 'tesSUCCESS') {
                toast.error(res?.result?.engine_result_message || 'Something went wrong. Please try again later.');
                setPassword('');
                return;
            }
            fetchAccountDetails();
            toast.success('Trustline added successfully');
            setPassword('');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Something went wrong. Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <div className="trustline_transaction_container">
            <div className="transaction_details">
                <div className="detail">
                    <p>Transaction Type:</p> {transaction.TransactionType}
                </div>
                <div className="detail">
                    <p>Issuer:</p> {transaction.LimitAmount.issuer}
                </div>
                <div className="detail">
                    <p>Limit Amount:</p> {transaction.LimitAmount.value} SUIT
                </div>
            </div>
            <div className="user_input">
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    style={{ width: '100%' }}
                    onChange={(e, { value }) => setPassword(value)}
                />
            </div>
            <Button className="trustline_btn" onClick={onSubmit} disabled={isLoading}>
                Submit
            </Button>
        </div>
    );
};
