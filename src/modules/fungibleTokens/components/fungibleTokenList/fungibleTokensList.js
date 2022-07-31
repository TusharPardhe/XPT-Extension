import React, { useEffect, useRef } from "react";
import { Divider, Image, Pagination } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import useMergedState from "../../../../utils/useMergedState";

import TokenCard from "../tokenCard/tokenCard";
import ShimmerLoader from "../../../../components/shimmerLoader/shimmerLoader";
import XPTLogoImg from "../../../../assets/svg/xpt.svg";
import { scrollToRef } from "../../../../utils/common.utils";
import { ApiCall } from "../../../../utils/api.util";

import "./fungibleTokensList.scss";

const FungibleTokensList = () => {
    const [state, setState] = useMergedState({
        offset: 0,
        limit: 8,
        loading: false,
        list: [],
        activePage: 1,
        totalPages: 0,
    });
    const tableRef = useRef(null);
    const navigate = useNavigate();

    const {
        offset,
        limit,
        loading,
        list,
        totalPages,
        activePage,
    } = state;

    useEffect(() => {
        fetchTokenList(activePage);
    }, []);

    const fetchTokenList = (pageNumber) => {
        setState({ loading: true });

        const payload = {
            method: "GET",
            url: "xrpl/fungibleTokens/list",
            params: {
                pageNumber,
                offset,
                limit,
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


    return (
        <div className="fungible_tokens_container">
            <div className="token_header">XRPL T<Image src={XPTLogoImg} className="logo_img" />KENS</div>
            <div className="sub_heading">A list of your favourite coins</div>
            <Divider />
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

export default FungibleTokensList;


function TokenListTable({ list, navigate }) {
    return (
        <div className="fungible_tokens_table">
            {list?.length > 0 && list.map((details, index) => <TokenCard {...{ ...details, navigate }} key={index} />)}
        </div>
    );
}

