import { Button, Card } from 'semantic-ui-react';
import React, { useMemo, useState } from 'react';
import { numberWithCommas, timer } from '../../utils/common.utils';

import { EscrowModalContent } from './EscrowModalContent';
import { Image } from 'semantic-ui-react';
import ScrollableModal from '../../components/ScrollableModal/ScrollableModal';
import { URLS } from '../../constants/common.constants';

const EscrowItem = ({
    address: destination,
    currentAccount,
    txs,
    time,
    id,
    createdBy,
    approvedBy,
    completed,
    isApprover = null,
    onApproveClick,
}) => {
    const [expanded, setExpanded] = useState(false);
    const timeLeftForEscrow = useMemo(() => timer(time), [time]);
    const showApproveButton = useMemo(
        () => isApprover && !approvedBy.includes(currentAccount) && onApproveClick,
        [isApprover, approvedBy, currentAccount, onApproveClick]
    );

    return (
        <>
            <Card className="escrow_item" key={id}>
                <Card.Content onClick={() => setExpanded(true)}>
                    {isApprover && (
                        <Card.Description>
                            <strong>Destination Address</strong>
                            <p>{destination}</p>
                        </Card.Description>
                    )}
                    <Card.Description>
                        <div className="amount">{numberWithCommas(txs[0].Amount.value)}</div>
                    </Card.Description>
                    <Card.Description className="sub_description">
                        <div className="name">Suit Coin</div>
                        <div className="days">{timeLeftForEscrow} days left</div>
                    </Card.Description>
                    <Image
                        src={URLS.FLOWER_BG}
                        className={`flower_bg_img escrow_expanded ${completed ? 'completed' : 'pending'}`}
                        alt="pending"
                    />
                </Card.Content>
                {showApproveButton && (
                    <Card.Content
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            color="blue"
                            basic
                            style={{
                                width: '100%',
                                borderRadius: 'none',
                            }}
                            onClick={() => onApproveClick(id)}
                        >
                            Approve
                        </Button>
                    </Card.Content>
                )}
            </Card>
            <ScrollableModal
                open={expanded}
                onClose={() => setExpanded(false)}
                heading="Escrow Details"
                content={
                    <EscrowModalContent
                        {...{
                            destination,
                            currentAccount,
                            amount: txs[0].Amount.value,
                            time,
                            id,
                            createdBy,
                            approvedBy,
                            timeLeftForEscrow,
                            isApprover,
                        }}
                    />
                }
            />
        </>
    );
};

export default EscrowItem;
