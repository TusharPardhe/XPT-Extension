import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import BackButton from '../../../../components/backButton/backButton';

import "./cheatSheetTabDetails.scss";

const CheatSheetTabDetails = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);
    const { name, description } = state;
    const onBackClick = () => navigate(-1);

    return (
        <div className="cheat_sheet_tab_details_container">
            <BackButton displayName="Go Back" onClick={onBackClick} />
            <div className='details_container'>
                <div className='heading'>{name}</div>
                <div className='description'>{description}</div>
            </div>
            <Divider />
        </div>
    );
}

export default CheatSheetTabDetails;