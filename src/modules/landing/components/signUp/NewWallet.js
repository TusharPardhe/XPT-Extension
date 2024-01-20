import { copyToClipBoard, saveInLocalStrg } from '../../../../utils/common.utils';

import { Input } from 'semantic-ui-react';
import { ROUTES } from '../../../../constants/common.constants';
import React from 'react';
import SimpleAnimationButton from '../../../../components/simpleAnimationButton/simpleAnimationButton';
import { Wallet } from 'xrpl';
import { toast } from 'react-toastify';
import useMergedState from '../../../../utils/useMergedState';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
    wallet: null,
    password: '',
    reEnterPassword: '',
};

const NewWallet = () => {
    const [state, setState] = useMergedState(INITIAL_STATE);
    const navigate = useNavigate();
    const [error, setError] = useMergedState({
        password: '',
        reEnterPassword: '',
    });
    const { wallet, password, reEnterPassword } = state;

    const onChange = (e) => {
        const { name, value } = e.target;
        setState({
            [name]: value,
        });
    };

    const generateNewWallet = () => {
        const wallet = Wallet.generate();
        setState({
            ...INITIAL_STATE,
            wallet,
        });
        setError({
            password: '',
            reEnterPassword: '',
        });
    };

    const validateFields = () => {
        let hasError = false;
        const errors = {
            password: '',
            reEnterPassword: '',
        };

        if (password?.length === 0) {
            errors.password = 'Please enter password.';
            hasError = true;
        }

        if (reEnterPassword?.length === 0) {
            errors.reEnterPassword = 'Please re-enter password.';
            hasError = true;
        }

        if (password !== reEnterPassword) {
            errors.reEnterPassword = 'Your passwords does not match.';
            hasError = true;
        }

        setError(errors);

        return hasError;
    };

    const onConfirmClick = () => {
        if (validateFields()) {
            return;
        }
        const savedAccounts = {};
        savedAccounts[wallet.address] = wallet.seed;
        saveInLocalStrg('savedAccounts', savedAccounts, password);

        toast({
            title: 'Wallet created',
            description: 'Your wallet has been created successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        localStorage.setItem('address', wallet.address);
        navigate(ROUTES.HOME);
    };

    return (
        <div className="new_wallet_container">
            <div className="new_wallet_btn_container">
                {wallet ? (
                    <div className="new_wallet_details_container">
                        <div className="input_container">
                            <div className="input_">
                                <div className="label">XRPL ADDRESS</div>
                                <Input
                                    name="address"
                                    value={wallet.address}
                                    placeholder="Address"
                                    onChange={() => {}}
                                    onClick={() => copyToClipBoard(wallet.address)}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                            <div className="input_">
                                <div className="label">SECRET</div>
                                <Input
                                    name="seed"
                                    value={wallet.seed}
                                    placeholder="Seed Phrase"
                                    onClick={() => copyToClipBoard(wallet.seed)}
                                    onChange={() => {}}
                                    style={{
                                        cursor: 'pointer',
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            <div className="input_">
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={error.password.length > 0 ? 'error_input' : ''}
                                    value={password}
                                    onChange={onChange}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <div className="input_">
                                <Input
                                    name="reEnterPassword"
                                    placeholder="Re-enter Password"
                                    value={reEnterPassword}
                                    className={error.reEnterPassword.length > 0 ? 'error_input' : ''}
                                    onChange={onChange}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="new_wallet_instruction_container">
                        <div className="instructions">
                            Click on the button below to generate a new wallet. You will be given a secret phrase. It is
                            very important that you write this phrase down and keep it in a safe place. If you lose this
                            phrase, you will not be able to access your funds.
                        </div>
                    </div>
                )}
            </div>
            <div className="new_wallet_btn_container">
                {!wallet ? (
                    <SimpleAnimationButton
                        onClick={generateNewWallet}
                        firstText={'Generate'}
                        secondText={'New Wallet'}
                    />
                ) : (
                    <SimpleAnimationButton onClick={onConfirmClick} firstText={'Confirm'} secondText={'Proceed'} />
                )}
            </div>
        </div>
    );
};

export default NewWallet;
