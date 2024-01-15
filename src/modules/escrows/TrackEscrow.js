import './Escrow.scss';

import { Divider, Icon, Input } from 'semantic-ui-react';
import React, { useState } from 'react';

import { ApiCall } from '../../utils/api.util';
import BackButton from '../../components/backButton/backButton';
import EscrowItem from './EscrowItem';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { ROUTES } from '../../constants/common.constants';
import SearchImage from '../../assets/svg/search_bg.svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TrackEscrow = () => {
    const [escrowId, setEscrowId] = useState('');
    const [escrowData, setEscrowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleTrackEscrow = async () => {
        if (escrowId.length === 0) {
            toast.error('Please enter escrow ID');
            return;
        }

        setIsLoading(true);
        try {
            const request = {
                url: '/user/escrows',
                method: 'GET',
                params: {
                    id: escrowId,
                },
            };

            const {
                data: { escrows },
            } = await ApiCall(request);

            if (escrows.length === 0) {
                toast.error('No escrow found with this ID');
                return;
            }

            setEscrowData(escrows);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setEscrowId('');
        }
    };

    return (
        <div className="track_escrow_container">
            <div className="track_escrow_header">Track Escrow</div>
            <Divider />
            <BackButton onClick={() => navigate(ROUTES.LANDING_PAGE)} displayName="Go Back" />
            <div className="track_escrow_body">
                <Input
                    placeholder="Enter Escrow ID"
                    value={escrowId}
                    onChange={(e) => setEscrowId(e.target.value)}
                    icon={
                        <Icon
                            name="search"
                            inverted
                            circular
                            link
                            color="blue"
                            loading={isLoading}
                            disabled={isLoading}
                            onClick={handleTrackEscrow}
                            style={{
                                top: '0.5rem',
                                right: '0.5rem',
                            }}
                        />
                    }
                />
            </div>
            {escrowData.length > 0 ? (
                escrowData.map((escrow) => <EscrowItem key={escrow._id} {...escrow} />)
            ) : (
                <NoResultCard text="Let's find your escrows" img={SearchImage} />
            )}
        </div>
    );
};

export default TrackEscrow;
