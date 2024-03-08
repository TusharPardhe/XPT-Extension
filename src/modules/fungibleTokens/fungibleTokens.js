import './fungibleTokens.scss';

import { Icon, Input, Pagination } from 'semantic-ui-react';
import React, { useEffect } from 'react';

import { ApiCall } from '../../utils/api.util';
import BackButton from '../../components/backButton/backButton';
import { FUNGIBLE_TOKENS_INITIAL_STATE } from '../../constants/fungibleTokens.constants';
import { ROUTES } from '../../constants/common.constants';
import ShimmerLoader from '../../components/shimmerLoader/shimmerLoader';
import TokenListTable from './components/tokenListTable/tokenListTable';
import useDebounce from '../../utils/useDebounce';
import useMergedState from '../../utils/useMergedState';
import { useNavigate } from 'react-router-dom';

const FungibleTokens = () => {
    const [state, setState] = useMergedState(FUNGIBLE_TOKENS_INITIAL_STATE);
    const navigate = useNavigate();

    const { offset, limit, loading, list, totalPages, activePage, searchValue } = state;

    const debouncedSearchValue = useDebounce(searchValue, 400);

    useEffect(() => {
        fetchTokenList(activePage);
    }, [debouncedSearchValue]);

    const fetchTokenList = (pageNumber) => {
        setState({ loading: true });

        const payload = {
            method: 'GET',
            url: 'xrpl/fungibleTokens/list',
            params: {
                pageNumber,
                offset,
                limit,
                searchValue: debouncedSearchValue,
            },
        };

        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    const { list, totalCount } = response.data;
                    setState({
                        list,
                        totalPages: Math.ceil(totalCount / 4),
                        totalCount,
                    });
                }
            })
            .finally(() => {
                setState({ loading: false });
            });
    };

    const handlePaginationChange = (e, { activePage }) => {
        setState({ activePage });
        fetchTokenList(activePage);
    };

    const onSearchValueChange = (e, { value }) => {
        setState({ searchValue: value, activePage: FUNGIBLE_TOKENS_INITIAL_STATE.activePage });
    };

    return (
        <div className="fungible_tokens_container">
            <BackButton displayName="Home" onClick={() => navigate(ROUTES.HOME)} />
            <div class="tokens_header_container">
                <div class="tokens_header">Tokens</div>
                <div class="tokens_sub_header">View your favourite coins</div>
            </div>
            <div className="search_filter">
                <Input
                    icon
                    value={searchValue}
                    onChange={onSearchValueChange}
                    placeholder="Enter token name"
                    className="search_input"
                >
                    <input />
                    <Icon name="search" color="yellow" style={{ cursor: 'pointer' }} />
                </Input>
            </div>
            <div className="fungible_tokens_table_container">
                {loading ? <ShimmerLoader /> : <TokenListTable {...{ list, navigate }} />}
                <div className="pagination">
                    <Pagination
                        pointing
                        secondary
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={totalPages}
                        onPageChange={handlePaginationChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default FungibleTokens;
