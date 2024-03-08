import { Button, Grid, Image } from 'semantic-ui-react';
import { ROUTES, URLS } from '../../../constants/common.constants';
import React, { useState } from 'react';

import SUIT_COIN_IMG from '../../../assets/svg/suitcoin.svg';
import ScrollableModal from '../../../components/ScrollableModal/ScrollableModal';
import { TrustLineTransaction } from './TrustLineTransaction';
import { numberWithCommas } from '../../../utils/common.utils';
import { useNavigate } from 'react-router-dom';

export const AccountDetails = ({ account, data, isLoading, setIsLoading, fetchAccountDetails }) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    if (data.newAccount) {
        return (
            <React.Fragment key={account}>
                <Grid className="user_details_container">
                    <Grid.Row className="account_row">
                        <div className="account_heading">
                            <div className="hello">Hello, </div>
                            <div className="account">{account}</div>
                        </div>
                    </Grid.Row>
                    <Grid.Row className="activate_row">
                        <div className="activate_heading">Please activate your account</div>
                        <div className="activate_text">
                            You need to activate your account to start using the platform. Transfer 10 XRP to the
                            following address to activate your account.
                        </div>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment key={account}>
            <Grid className="user_details_container">
                <Grid.Row className="account_row">
                    <div className="account_heading">
                        <div className="hello">Hello, </div>
                        <div className="account">{account}</div>
                    </div>
                </Grid.Row>
                <Grid.Row className="grid-row">
                    <Grid.Column width={7} className="suitcoin_row">
                        <div className="balance_heading">SUIT</div>
                        <div className="coins">
                            <Image src={SUIT_COIN_IMG} className="suit_img" alt="SuitCoin" />
                            {data.hasSuitCoinTrustline ? (
                                <div className="coin_value">{numberWithCommas(data.suitCoinBalance)}</div>
                            ) : (
                                <Button className="trustline_btn" onClick={() => setOpenModal(true)}>
                                    Add Trustline
                                </Button>
                            )}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={7} className="xrp_row">
                        <div className="balance_heading">XRP</div>
                        <div className="coins">
                            <div className="card_value">{numberWithCommas(data.xrpBalance)}</div>
                            <Image src={URLS.XRP_ICON} className="xrp_img" alt="SuitCoin" />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <div className="account_escrow_details">
                <div className="account_escrow_heading_container">
                    <div className="account_escrow_heading">Escrows</div>
                    <span className="view_all" onClick={() => navigate(ROUTES.ESCROW)}>
                        View all
                    </span>
                </div>
                <Grid className="user_escrows">
                    <div className="scrollable">
                        <Grid.Row className="grid-row">
                            <Grid.Column width={7} className="escrow_card">
                                <div className="escrow_card_heading">Total</div>
                                <div className="escrow_value">{numberWithCommas(data.escrowCount.total)}</div>
                                <Image src={URLS.FLOWER_BG} className="flower_bg_img total" alt="total" />
                            </Grid.Column>
                            <Grid.Column width={7} className="escrow_card">
                                <div className="escrow_card_heading">Completed</div>
                                <div className="escrow_value">{numberWithCommas(data.escrowCount.completed)}</div>
                                <Image src={URLS.FLOWER_BG} className="flower_bg_img completed" alt="completed" />
                            </Grid.Column>
                            <Grid.Column width={7} className="escrow_card">
                                <div className="escrow_card_heading">Outstanding</div>
                                <div className="escrow_value">{numberWithCommas(data.escrowCount.outstanding)}</div>
                                <Image src={URLS.FLOWER_BG} className="flower_bg_img pending" alt="pending" />
                            </Grid.Column>
                        </Grid.Row>
                    </div>
                </Grid>
                {data.isApprover && (
                    <Button className="trustline_btn" onClick={() => navigate(ROUTES.ADD_ESCROW)}>
                        Add Escrow
                    </Button>
                )}
            </div>
            <ScrollableModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                heading="Transaction Details"
                content={<TrustLineTransaction {...{ isLoading, setIsLoading, fetchAccountDetails }} />}
            />
        </React.Fragment>
    );
};
