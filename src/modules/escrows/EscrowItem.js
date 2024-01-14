import { Button, Card } from 'semantic-ui-react';
import React, { useMemo } from 'react';
import { copyToClipBoard, numberWithCommas, timer } from '../../utils/common.utils';

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
    const timeLeftForEscrow = useMemo(() => timer(time), [time]);
    const showApproveButton = useMemo(
        () => isApprover && !approvedBy.includes(currentAccount) && onApproveClick,
        [isApprover, approvedBy, currentAccount, onApproveClick]
    );

    return (
        <Card className="escrow_item">
            <Card.Content>
                <Card.Header
                    style={{
                        borderRadius: '10px',
                        background: completed ? '#E5FFE5' : '#F5F5F5',
                    }}
                >
                    Escrow Details
                </Card.Header>
                {completed && (
                    <Card.Description>
                        <Button
                            color="green"
                            basic
                            style={{
                                width: '100%',
                                borderRadius: 'none',
                                cursor: 'default',
                            }}
                        >
                            Completed
                        </Button>
                    </Card.Description>
                )}
                <Card.Description>
                    <strong>Destination Address</strong>
                    <p>{destination}</p>
                </Card.Description>
                <Card.Description>
                    <strong>Suit Coin Amount</strong>
                    <p>{numberWithCommas(txs[0].Amount.value)}</p>
                </Card.Description>
                <Card.Description>
                    <strong>Time Left For Escrow</strong>
                    <p
                        style={{
                            color: 'green',
                        }}
                    >
                        {timeLeftForEscrow} days
                    </p>
                </Card.Description>

                <Card.Description>
                    <strong>Escrow ID</strong>
                    <p onClick={() => copyToClipBoard(id)} style={{ cursor: 'pointer' }}>
                        {id}
                    </p>
                </Card.Description>
                <Card.Description>
                    <strong>Created By</strong>
                    <p>{createdBy}</p>
                </Card.Description>
                <Card.Description>
                    <strong>Approved By</strong>
                    {approvedBy.map((address) => (
                        <p>{address}</p>
                    ))}
                </Card.Description>
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
    );
};

export default EscrowItem;
