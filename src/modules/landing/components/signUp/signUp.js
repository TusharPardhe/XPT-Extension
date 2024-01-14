import './signUp.scss';

import React, { useState } from 'react';

import BackButton from '../../../../components/backButton/backButton';
import { Button } from 'semantic-ui-react';
import NewWallet from './NewWallet';
import Numbers from './Numbers';
import Seed from './Seed';

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
                    <Button onClick={() => setUserSelection('seed')} size="md" basic>
                        Seed
                    </Button>
                    <Button size="md" onClick={() => setUserSelection('numbers')} basic>
                        Numbers
                    </Button>
                    <Button
                        firstText="Create New Wallet"
                        primary
                        onClick={() => setUserSelection('newWallet')}
                        variant="outline"
                    >
                        Create New Wallet
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SignUp;
