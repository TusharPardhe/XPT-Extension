import './successPage.scss';

import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import { ROUTES } from '../../constants/common.constants';
import React from 'react';
import { copyToClipBoard } from '../../utils/common.utils';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { journey, id } = location.state;

    const redirectToHome = () => {
        navigate(ROUTES.HOME);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="success_page">
            <div className="success_heading">Awesome! 🎉</div>
            <div className="description">
                <div className="text">
                    Thank you for using XPT.
                    <br />
                    <br />
                    {journey === 'escrow' && (
                        <div onClick={() => copyToClipBoard(id)}>
                            Escrow added successfully. Please save this ID for tracking: <span>{id}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="buttons_container">
                <Button color="google plus" onClick={goBack}>
                    Go Back
                </Button>
                <Button color="green" onClick={redirectToHome}>
                    Home
                </Button>
            </div>
        </div>
    );
};

export default SuccessPage;
