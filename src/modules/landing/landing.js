import './landing.scss';

import { Image, Input } from 'semantic-ui-react';
import React, { useState } from 'react';

import { ROUTES } from '../../constants/common.constants';
import SimpleAnimationButton from '../../components/simpleAnimationButton/simpleAnimationButton';
import XPTLogoImg from '../../assets/svg/xpt.svg';
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
            const [account, _] = Object.entries(storedAccounts)[0];
            localStorage.setItem('address', account);
            navigate(ROUTES.HOME);
        } catch (error) {
            toast.error('Invalid password');
        }
    };

    return (
        <div className="landing_container">
            <div className="heading">
                <Image src={XPTLogoImg} className="logo_img" />
                PT
            </div>
            <div className="short_phrase">Let's keep it simple.</div>
            <div className="btns_container">
                {isLoginJourney ? (
                    <>
                        <Input
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <SimpleAnimationButton onClick={onLoginButtonClick} firstText="Login" secondText="Let's Go!" />
                    </>
                ) : (
                    <>
                        <SimpleAnimationButton
                            onClick={() => setIsLoginJourney(true)}
                            firstText="Login"
                            secondText="Enter Password"
                        />
                        <SimpleAnimationButton onClick={onEnterButtonClick} firstText="Join Us!" secondText="Enter" />
                        <SimpleAnimationButton
                            onClick={() => navigate(ROUTES.TRACK_ESCROW)}
                            firstText="Track Escrow"
                            secondText="Track"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Landing;
