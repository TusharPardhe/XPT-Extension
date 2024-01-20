import './signUp.scss';

import React, { useState } from 'react';

import BackButton from '../../../../components/backButton/backButton';
import NewWallet from './NewWallet';
import Numbers from './Numbers';
import Seed from './Seed';
import SimpleAnimationButton from '../../../../components/simpleAnimationButton/simpleAnimationButton';

const SignUpJourney = ({ userSelection }) => {
    if (userSelection === 'seed') {
        return <Seed />;
    }
    if (userSelection === 'numbers') {
        return <Numbers />;
    }
    if (userSelection === 'mnemonic') {
        return <div>mnemonic</div>;
    }
    if (userSelection === 'newWallet') {
        return <NewWallet />;
    }
    return null;
};

const SignUp = () => {
    const [userSelection, setUserSelection] = useState('');

    return (
        <div className="login_container">
            <div className="heading_container">
                <div className="heading">Wallet</div>
                <div className="subHeading">Add your existing wallet or start from scratch.</div>
            </div>
            {userSelection.length > 0 ? (
                <>
                    <BackButton onClick={() => setUserSelection('')} displayName="Go Back" />
                    <SignUpJourney {...{ userSelection }} />
                </>
            ) : (
                <div className="selection_btns_container">
                    <SimpleAnimationButton
                        onClick={() => setUserSelection('seed')}
                        firstText={'Seed'}
                        secondText={'Secret Phrase'}
                    />
                    <SimpleAnimationButton
                        onClick={() => setUserSelection('numbers')}
                        firstText={'Numbers'}
                        secondText={'Numerical Phrase'}
                    />
                    <SimpleAnimationButton
                        onClick={() => setUserSelection('newWallet')}
                        firstText={'Create New Wallet'}
                        secondText={'Start from Scratch'}
                    />
                </div>
            )}
        </div>
    );
};

export default SignUp;
