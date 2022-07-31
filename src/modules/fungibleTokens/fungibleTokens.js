import React, { useEffect, useRef } from "react";
import { Divider, Image, Input, Pagination } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import useMergedState from "../../utils/useMergedState";

import XPTLogoImg from "../../assets/svg/xpt.svg";
import TokenCard from "./components/tokenCard/tokenCard";
import ShimmerLoader from "../../components/shimmerLoader/shimmerLoader";

import { FUNGIBLE_TOKENS_INITIAL_STATE } from "../../constants/fungibleTokens.constants";
import { scrollToRef } from "../../utils/common.utils";
import { ApiCall } from "../../utils/api.util";

import "./fungibleTokens.scss";
import useDebounce from "../../utils/useDebounce";

const FungibleTokens = () => {
    const [state, setState] = useMergedState(FUNGIBLE_TOKENS_INITIAL_STATE);
    const tableRef = useRef(null);
    const navigate = useNavigate();

    const {
        offset,
        limit,
        loading,
        list,
        totalPages,
        activePage,
        searchValue,
    } = state;

    const debouncedSearchValue = useDebounce(searchValue, 400);

    useEffect(() => {
        fetchTokenList(activePage);
    }, [debouncedSearchValue]);

    const fetchTokenList = (pageNumber) => {
        setState({ loading: true });

        const payload = {
            method: "GET",
            url: "xrpl/fungibleTokens/list",
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
                        totalCount
                    });
                }
            })
            .finally(() => {
                setState({ loading: false });
                scrollToRef(tableRef);
            });
    };

    const handlePaginationChange = (e, { activePage }) => {
        setState({ activePage });
        fetchTokenList(activePage);
    };

    const onSearchValueChange = (e, { value }) => {
        setState({ searchValue: value });
    }


    return (
        <div className="fungible_tokens_container">
            <div className="token_header">XRPL T<Image src={XPTLogoImg} className="logo_img" />KENS</div>
            <div className="sub_heading">A list of your favourite coins</div>
            <Divider />
            <div className="search_filter">
                <Input value={searchValue} onChange={onSearchValueChange} placeHolder="Enter token name" />
            </div>
            <div className="fungible_tokens_table_container" ref={tableRef}>
                {loading ? <ShimmerLoader /> : < TokenListTable {...{ list, navigate }} />}
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
                        onPageChange={handlePaginationChange} />
                </div>
            </div>

        </div>
    );
};

export default FungibleTokens;


function TokenListTable({ list, navigate }) {
    return (
        <div className="fungible_tokens_table">
            {list?.length > 0 && list.map((details, index) => <TokenCard {...{ ...details, navigate }} key={index} />)}
        </div>
    );
}

