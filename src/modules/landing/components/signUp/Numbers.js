import { Button, Input } from 'semantic-ui-react';
import { ROUTES, VALIDATION_REGEX } from '../../../../constants/common.constants';

import React from 'react';
import SimpleAnimationButton from '../../../../components/simpleAnimationButton/simpleAnimationButton';
import { Wallet } from 'xrpl';
import { saveInLocalStrg } from '../../../../utils/common.utils';
import { toast } from 'react-toastify';
import useMergedState from '../../../../utils/useMergedState';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
    entropy: '',
    password: '',
    reEnterPassword: '',
};

const Numbers = () => {
    const [state, setState] = useMergedState(INITIAL_STATE);
    const [error, setError] = useMergedState(INITIAL_STATE);
    const { entropy, password, reEnterPassword } = state;
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setState({ [name]: value });
        setError({ [name]: '' });
    };

    const validateFields = () => {
        let hasError = false;
        const errors = {
            entropy: '',
            password: '',
            reEnterPassword: '',
        };

        if (entropy.length === 0) {
            errors.entropy = 'Please enter a number.';
            toast.error('Please enter a number.');
            hasError = true;
        }

        if (VALIDATION_REGEX.NUMBERS_AND_EMPTY.test(entropy) === false) {
            errors.entropy = 'Please enter numeric value.';
            toast.error('Please enter numeric value.');
            hasError = true;
        }

        if (password.length === 0) {
            errors.password = 'Please enter a password.';
            toast.error('Please enter a password.');
            hasError = true;
        }

        if (reEnterPassword.length === 0) {
            errors.reEnterPassword = 'Please re-enter your password.';
            toast.error('Please re-enter your password.');
            hasError = true;
        }

        if (password !== reEnterPassword) {
            errors.reEnterPassword = 'Passwords do not match.';
            toast.error('Passwords do not match.');
            hasError = true;
        }

        setError(errors);
        return hasError;
    };

    const handleSubmission = async () => {
        if (validateFields()) return;

        try {
            const numbers = entropy.split('');
            const wallet = Wallet.fromEntropy(numbers);
            const savedAccounts = {};
            savedAccounts[wallet.address] = wallet.seed;
            saveInLocalStrg('savedAccounts', savedAccounts, password);
            setState(INITIAL_STATE);

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
            toast.error('Error generating wallet. Please check the input.');
            setError({ entropy: 'Error generating wallet. Please check the input.' });
        }
    };

    return (
        <div className="numbers_container">
            <Input
                name="entropy"
                autoComplete="off"
                className={error.entropy.length > 0 ? 'error_input' : ''}
                placeholder="Enter numbers"
                value={entropy}
                onChange={onChange}
            />
            <Input
                name="password"
                type="password"
                autoComplete="off"
                className={error.password.length > 0 ? 'error_input' : ''}
                placeholder="Enter password"
                value={password}
                onChange={onChange}
            />
            <Input
                name="reEnterPassword"
                autoComplete="off"
                className={error.reEnterPassword.length > 0 ? 'error_input' : ''}
                placeholder="Re-enter password"
                value={reEnterPassword}
                onChange={onChange}
            />
            <div className="submit_btn_container">
                <SimpleAnimationButton onClick={handleSubmission} firstText={'Submit'} secondText={'Proceed'} />
            </div>
        </div>
    );
};

export default Numbers;
