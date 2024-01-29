import { Button, Image } from 'semantic-ui-react';
import React, { useState } from 'react';

import { ROUTES } from '../../../constants/common.constants';
import SUIT_COIN_IMG from '../../../assets/svg/suitcoin.svg';
import ScrollableModal from '../../../components/ScrollableModal/ScrollableModal';
import { TrustLineTransaction } from './TrustLineTransaction';
import { numberWithCommas } from '../../../utils/common.utils';
import { useNavigate } from 'react-router-dom';

export const AccountDetails = ({ account, data, isLoading, setIsLoading, fetchAccountDetails }) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    return (
        <React.Fragment key={account}>
            <div className="account">{account}</div>
            <div className="card suit_coin">
                <Image src={SUIT_COIN_IMG} className="suit_img" alt="SuitCoin" />
                {data.hasSuitCoinTrustline ? (
                    <div className="right_section">
                        <div className="card_value">{numberWithCommas(data.suitCoinBalance)}</div>
                        <div className="card_heading">SuitCoin</div>
                    </div>
                ) : (
                    <div className="right_section">
                        <Button className="trustline_btn" onClick={() => setOpenModal(true)}>
                            Add Trustline
                        </Button>
                    </div>
                )}
            </div>
            <ScrollableModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                heading="Transaction Details"
                content={<TrustLineTransaction {...{ isLoading, setIsLoading, fetchAccountDetails }} />}
            />
            <div className="card xrp">
                <div className="right_section">
                    <div className="card_value">{numberWithCommas(data.xrpBalance)}</div>
                    <div className="card_heading">XRP</div>
                </div>
            </div>
            <div className="timer_card">
                <div className="timer_heading">Total Outstanding Escrows</div>
                <div className="timer_value">{numberWithCommas(data.totalNumberOfEscrows)}</div>
                {data.isApprover && (
                    <Button basic inverted className="trustline_btn" onClick={() => navigate(ROUTES.ADD_ESCROW)}>
                        Add Escrow
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
};
