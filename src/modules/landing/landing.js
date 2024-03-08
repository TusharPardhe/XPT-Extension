import './landing.scss';

import React, { useState } from 'react';

import BackButton from '../../components/backButton/backButton';
import { Input } from 'semantic-ui-react';
import { ROUTES } from '../../constants/common.constants';
import SimpleAnimationButton from '../../components/simpleAnimationButton/simpleAnimationButton';
import { getDataFromLocalStrg } from '../../utils/common.utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [isLoginJourney, setIsLoginJourney] = useState(false);
    const [password, setPassword] = useState('');

    const onEnterButtonClick = () => {
        navigate({
            pathname: ROUTES.SIGN_UP,
            search: window.location.search,
        });
    };

    const onLoginButtonClick = async () => {
        try {
            if (password.length === 0) {
                toast.error('Please enter password');
                return;
            }
            const storedAccounts = getDataFromLocalStrg('savedAccounts', password);
            if (!storedAccounts) {
                toast.error('No account found, please sign up');
                return;
            }

            const [account, _] = Object.entries(storedAccounts)[0];
            localStorage.setItem('address', account);
            navigate(ROUTES.HOME);
        } catch (error) {
            toast.error('Invalid password');
        }
    };

    const onBackToLandingPageClick = () => {
        setIsLoginJourney(false);
        setPassword('');
    };

    return (
        <div className="landing_container">
            <div className="heading luminance">REVO</div>
            <div className="short_phrase">A Vision 2.0 Product</div>
            <div className="landing_content_container">
                {isLoginJourney ? (
                    <>
                        <BackButton onClick={onBackToLandingPageClick} displayName="Go Back" />
                        <div className="input_container">
                            <Input
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <SimpleAnimationButton
                                onClick={onLoginButtonClick}
                                firstText="Login"
                                secondText="Let's Go!"
                            />
                        </div>
                    </>
                ) : (
                    <div className="input_container">
                        <SimpleAnimationButton
                            onClick={() => setIsLoginJourney(true)}
                            firstText="Login"
                            secondText="Enter Password"
                        />
                        <SimpleAnimationButton onClick={onEnterButtonClick} firstText="Join Us!" secondText="Enter" />
                        {/* <SimpleAnimationButton
                            onClick={() => navigate(ROUTES.TRACK_ESCROW)}
                            firstText="Track Escrow"
                            secondText="Track"
                        /> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing;
