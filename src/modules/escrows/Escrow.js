import './Escrow.scss';

import { Divider, Icon, Input, Pagination } from 'semantic-ui-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import AnimatedLoader from '../../components/animatedLoader/animatedLoader';
import { ApiCall } from '../../utils/api.util';
import EscrowItem from './EscrowItem';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { scrollToRef } from '../../utils/common.utils';
import { toast } from 'react-toastify';
import useMergedState from '../../utils/useMergedState';

const Escrow = () => {
    const [loading, setLoading] = useState(true);
    const address = localStorage.getItem('address');
    const [escrowId, setEscrowId] = useState('');
    const ref = useRef(null);

    const [state, setState] = useMergedState({
        escrows: [],
        total: 0,
        limit: 2,
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
                    // address,
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
            scrollToRef(ref);
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
            <div className="escrows_header" ref={ref}>
                ESCROWS
            </div>
            <div className="escrows_sub_header">Manage your escrows</div>
            <Divider />
            <div className="search">
                <Input
                    placeholder="Enter Escrow ID"
                    value={escrowId}
                    onChange={(e, { value }) => setEscrowId(value)}
                    onKeyDown={onSearchValueKeyPress}
                    icon={
                        <Icon
                            name="search"
                            inverted
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
