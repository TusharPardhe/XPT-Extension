import { Button, Input } from 'semantic-ui-react';

import { ROUTES } from '../../../../constants/common.constants';
import React from 'react';
import { Wallet } from 'xrpl';
import { saveInLocalStrg } from '../../../../utils/common.utils';
import { toast } from 'react-toastify';
import useMergedState from '../../../../utils/useMergedState';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATES = {
    seed: '',
    password: '',
    reEnterPassword: '',
};

const Seed = () => {
    const [state, setState] = useMergedState(INITIAL_STATES);
    const [error, setError] = useMergedState(INITIAL_STATES);
    const navigate = useNavigate();
    const { seed, password, reEnterPassword } = state;

    const onChange = async (e) => {
        const { name, value } = e.target;
        setState({
            [name]: value,
        });
        setError({
            [name]: '',
        });
    };

    const validateFields = () => {
        let hasError = false;
        const errors = {
            seed: '',
            password: '',
            reEnterPassword: '',
        };

        if (seed.length === 0) {
            errors.seed = 'Please enter seed phrase.';
            toast.error('Please enter seed phrase.');
            hasError = true;
        }

        if (password?.length === 0) {
            errors.password = 'Please enter password.';
            toast.error('Please enter password.');
            hasError = true;
        }

        if (reEnterPassword?.length === 0) {
            errors.reEnterPassword = 'Please re-enter password.';
            toast.error('Please re-enter password.');
            hasError = true;
        }

        if (password !== reEnterPassword) {
            errors.reEnterPassword = 'Your passwords does not match.';
            toast.error('Your passwords does not match.');
            hasError = true;
        }

        setError(errors);
        return hasError;
    };

    const onConfirmClick = () => {};

    const handleSubmission = async () => {
        if (validateFields()) return;

        try {
            const wallet = Wallet.fromSeed(seed);
            const savedAccounts = {};
            savedAccounts[wallet.address] = wallet.seed;
            saveInLocalStrg('savedAccounts', savedAccounts, password);
            setState(INITIAL_STATES);
            setError(INITIAL_STATES);

            toast({
                title: 'Account added',
                description: 'Your wallet has been successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            localStorage.setItem('address', wallet.address);
            navigate(ROUTES.HOME);
        } catch (e) {
            toast.error('Invalid seed phrase, please try again.');
            setError({
                seed: 'Invalid seed phrase, please try again.',
            });
        }
    };

    return (
        <div className="seed_container">
            <Input
                name="seed"
                className={error.seed.length > 0 ? 'error_input' : ''}
                placeholder="Enter seed phrase"
                value={seed}
                onChange={onChange}
            />
            <Input
                name="password"
                type="password"
                className={error.password.length > 0 ? 'error_input' : ''}
                placeholder="Enter password"
                value={password}
                onChange={onChange}
            />
            <Input
                name="reEnterPassword"
                className={error.reEnterPassword.length > 0 ? 'error_input' : ''}
                placeholder="Re-enter password"
                value={reEnterPassword}
                onChange={onChange}
            />
            <div className="submit_btn_container">
                <Button onClick={handleSubmission} basic color="green">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Seed;
