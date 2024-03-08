import './Escrow.scss';

import { Icon, Input, Pagination } from 'semantic-ui-react';
import React, { useEffect, useMemo, useState } from 'react';

import AnimatedLoader from '../../components/animatedLoader/animatedLoader';
import { ApiCall } from '../../utils/api.util';
import BackButton from '../../components/backButton/backButton';
import EscrowItem from './EscrowItem';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { ROUTES } from '../../constants/common.constants';
import { toast } from 'react-toastify';
import useMergedState from '../../utils/useMergedState';
import { useNavigate } from 'react-router-dom';

const Escrow = () => {
    const [loading, setLoading] = useState(true);
    const address = localStorage.getItem('address');
    const navigate = useNavigate();
    const [escrowId, setEscrowId] = useState('');

    const [state, setState] = useMergedState({
        escrows: [],
        total: 0,
        limit: 4,
        page: 1,
        pages: 1,
        isApprover: false,
    });
    const { limit, page, pages, escrows, isApprover } = state;
    // fetch only when limit, page or address changes
    const apiCallOnStateUpdate = useMemo(() => ({ limit, page, address }), [limit, page, address]);

    useEffect(() => {
        fetchEscrows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiCallOnStateUpdate]);

    const fetchEscrows = async () => {
        setLoading(true);
        console.log(state);
        try {
            const request = {
                url: '/user/escrows',
                method: 'GET',
                params: {
                    limit,
                    page,
                    address,
                    sortBy: 'time',
                    id: escrowId,
                },
            };

            const response = await ApiCall(request);
            setState({
                limit,
                ...response.data,
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePaginationChange = (e, { activePage }) => {
        setState({ page: activePage });
    };

    const onApproveClick = async (id) => {
        try {
            setLoading(true);
            const request = {
                url: `/user/update/escrow`,
                method: 'POST',
                encrypt: true,
                data: {
                    id,
                    approver: address,
                },
            };

            await ApiCall(request);
            setLoading(false);
            toast.success('Escrow approved successfully');
            fetchEscrows();
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };
    const onSearchValueKeyPress = (e) => {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            fetchEscrows();
        }
    };

    return (
        <div className="escrows_container">
            <AnimatedLoader loadingText="Loading..." isActive={loading} />
            <BackButton displayName="Home" onClick={() => navigate(ROUTES.HOME)} />
            <div className="escrows_header_container">
                <div className="escrows_header">ESCROWS</div>
                <div className="escrows_sub_header">Manage your escrows</div>
            </div>
            <div className="search">
                <Input
                    placeholder="Enter Escrow ID"
                    value={escrowId}
                    className="search_input"
                    onChange={(e, { value }) => setEscrowId(value)}
                    onKeyDown={onSearchValueKeyPress}
                    icon={
                        <Icon
                            name="search"
                            circular
                            link
                            color="yellow"
                            loading={loading}
                            disabled={loading}
                            onClick={fetchEscrows}
                            style={{
                                top: '0.5rem',
                                right: '0.5rem',
                            }}
                        />
                    }
                />
            </div>
            {escrows?.length === 0 && !loading ? (
                <NoResultCard title="No Escrows Found" />
            ) : (
                <>
                    <div className="escrow_cards">
                        {escrows?.map((escrow) => (
                            <EscrowItem
                                key={escrow._id}
                                {...{ ...escrow, onApproveClick, currentAccount: address, isApprover }}
                            />
                        ))}
                    </div>
                    <div className="pagination">
                        <Pagination
                            pointing
                            secondary
                            boundaryRange={0}
                            defaultActivePage={page}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={pages}
                            onPageChange={handlePaginationChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Escrow;
