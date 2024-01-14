import './addEscrow.scss';

import { Checkbox, Image, Input, Message } from 'semantic-ui-react';
import { Client, Wallet, xrpToDrops } from 'xrpl';
import { ROUTES, SUIT_COIN_HEX, SUIT_COIN_ISSUER } from '../../constants/common.constants';
import React, { useState } from 'react';
import { copyToClipBoard, getDataFromLocalStrg, transferSuitCoin } from '../../utils/common.utils';

import AnimatedLoader from '../../components/animatedLoader/animatedLoader';
import { ApiCall } from '../../utils/api.util';
import BackButton from '../../components/backButton/backButton';
import DatePicker from 'react-date-picker';
import SimpleAnimationButton from '../../components/simpleAnimationButton/simpleAnimationButton';
import SuitCoin from '../../assets/svg/suitcoin.svg';
import { toast } from 'react-toastify';
import useMergedState from '../../utils/useMergedState';
import { useNavigate } from 'react-router-dom';

const AddEscrow = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useMergedState({
        address: '',
        amount: '',
        password: '',
        seed: '',
        date: null,
        createAccount: false,
    });
    const { address, amount, password, seed, date, createAccount } = state;

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'address' && createAccount) return;
        setState({ [name]: value });
    };

    const onCheckboxClick = () => {
        if (!createAccount) {
            const wallet = Wallet.generate();
            setState({
                address: wallet?.address,
                seed: wallet?.seed,
                createAccount: !createAccount,
            });
        } else {
            setState({
                createAccount: !createAccount,
                seed: '',
                address: '',
            });
        }
    };

    const onSubmit = async () => {
        try {
            if (!validateFields()) return;
            setLoading(true);
            const client = new Client(process.env.XRPL_SERVER);
            await client.connect();
            const storedAccounts = getDataFromLocalStrg('savedAccounts', password);
            const [account, key] = Object.entries(storedAccounts)[0];
            const wallet = Wallet.fromSeed(key);
            const transactions = [];

            if (createAccount) {
                // Transfer 12 XRP to the new account
                const transferXRP = {
                    TransactionType: 'Payment',
                    Account: account,
                    Destination: state.address,
                    Amount: xrpToDrops(14),
                    Fee: '24',
                };
                await client
                    .submitAndWait(transferXRP, {
                        wallet,
                        autofill: true,
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });

                const trustLine = {
                    TransactionType: 'TrustSet',
                    Account: state.address,
                    LimitAmount: {
                        currency: SUIT_COIN_HEX,
                        value: '10000000000',
                        issuer: SUIT_COIN_ISSUER,
                    },
                    Flags: 131072,
                    Fee: '12',
                };

                const newWallet = Wallet.fromSeed(state.seed);
                await client
                    .submitAndWait(trustLine, {
                        wallet: newWallet,
                        autofill: true,
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            }

            // Transfer SuitCoin to the new account
            const suitCoinTx = await transferSuitCoin({
                destination: address,
                amount: amount,
                wallet,
            });
            transactions.push(suitCoinTx);
            const response = await ApiCall({
                method: 'POST',
                url: 'user/save/account/escrow',
                data: {
                    account: address,
                    txs: transactions,
                    createdBy: account,
                    approvedBy: account,
                    time: date,
                },
            });

            toast.success('Escrow added successfully');

            navigate(ROUTES.REQUEST_SUCCESS, {
                state: {
                    journey: 'escrow',
                    id: response?.data?.id,
                },
            });
        } catch (error) {
            toast.error(error.message ?? 'Something went wrong');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onDateChange = (value) => {
        setState({ date: value });
    };

    const validateFields = () => {
        if (address.length === 0) {
            toast.error('Please enter destination address');
            return false;
        }

        if (amount.length === 0) {
            toast.error('Please enter amount');
            return false;
        }

        if (date === null) {
            toast.error('Please select date');
            return false;
        }

        if (password.length === 0) {
            toast.error('Please enter password');
            return false;
        }

        if (createAccount && seed.length === 0) {
            toast.error('Please copy the seed');
            return false;
        }

        return true;
    };

    return (
        <div className="add_escrow_container">
            <BackButton onClick={() => navigate(-1)} displayName="Go Back" />
            <AnimatedLoader loadingText="Loading..." isActive={loading} />
            <div className="heading_container">
                <Image src={SuitCoin} alt="escrow" />
                <div className="heading">Escrow</div>
            </div>
            <div className="sub_heading">Please enter the details below</div>
            <div className="inputs">
                <Input placeholder="Enter Destination Address" name="address" value={address} onChange={onChange} />
                <Input placeholder="Enter Amount" name="amount" value={amount} onChange={onChange} />
                <div className="date_picker">
                    <DatePicker
                        value={date}
                        // minDate={new Date()}
                        onChange={onDateChange}
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYYY"
                        format="dd-MM-y"
                    />
                </div>
                <Input placeholder="Enter Password" name="password" value={password} onChange={onChange} />
                {seed && (
                    <>
                        <Input
                            placeholder="Seed"
                            name="seed"
                            value={seed}
                            onClick={() => copyToClipBoard(seed)}
                            onChange={() => {}}
                            style={{
                                cursor: 'pointer',
                                border: '1px solid green',
                            }}
                        />
                        <Message floating color="green">
                            Please save this seed somewhere safe. This seed is required to access your escrow.
                        </Message>
                    </>
                )}
                <Checkbox
                    label="Create a new account for this escrow"
                    value={createAccount}
                    onClick={onCheckboxClick}
                />
                {createAccount && <Message floating>Cost of creating a new account is 14 XRP</Message>}
            </div>
            <div className="submit_btn_container">
                <SimpleAnimationButton
                    firstText={'Submit'}
                    secondText={'Add Escrow'}
                    onClick={onSubmit}
                    color="baby-blue"
                />
            </div>
        </div>
    );
};

export default AddEscrow;
