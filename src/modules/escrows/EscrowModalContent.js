import { Divider, Grid } from 'semantic-ui-react';
import { copyToClipBoard, numberWithCommas } from '../../utils/common.utils';

import React from 'react';

export const EscrowModalContent = ({
    address: destination,
    amount,
    id,
    createdBy,
    approvedBy,
    timeLeftForEscrow,
    isApprover,
}) => {
    return (
        <>
            <Divider />
            <Grid className="escrow_expanded">
                {isApprover && (
                    <Grid.Row columns={2} style={{ flexDirection: 'column' }}>
                        <strong>DESTINATION</strong>
                        <p onClick={() => copyToClipBoard(destination)}>{destination}</p>
                    </Grid.Row>
                )}
                <Grid.Row columns={2} style={{ flexDirection: 'column' }}>
                    <strong>AMOUNT</strong>
                    <p>{numberWithCommas(amount)} SUIT coin</p>
                </Grid.Row>
                <Grid.Row columns={2} style={{ flexDirection: 'column' }}>
                    <strong>TIME LEFT</strong>
                    <p>{numberWithCommas(timeLeftForEscrow)} days</p>
                </Grid.Row>
                <Grid.Row columns={2} style={{ flexDirection: 'column' }}>
                    <strong>ID</strong>
                    <p onClick={() => copyToClipBoard(id)}>{id}</p>
                </Grid.Row>
                <Grid.Row columns={2} style={{ flexDirection: 'column' }}>
                    <strong>ESCROWED BY</strong>
                    <p onClick={() => copyToClipBoard(createdBy)}>{createdBy}</p>
                </Grid.Row>
                <Grid.Row columns={2} style={{ flexDirection: 'column' }}>
                    <strong>APPROVER</strong>
                    <p onClick={() => copyToClipBoard(approvedBy)}>{approvedBy}</p>
                </Grid.Row>
            </Grid>
        </>
    );
};
