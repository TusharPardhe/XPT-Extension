import React, { useEffect, useRef } from "react";
import { Divider, Image, Pagination } from "semantic-ui-react";
import { toast } from "react-toastify";

import useMergedState from "../../utils/useMergedState";

import ShimmerLoader from "../../components/shimmerLoader/shimmerLoader";
import XPTLogoImg from "../../assets/svg/xpt.svg";
import { ApiCall } from "../../utils/api.util";

import "./fungibleTokensList.scss";
import { scrollToRef } from "../../utils/common.utils";

const FungibleTokensList = () => {
    const [state, setState] = useMergedState({
        offset: 0,
        limit: 4,
        loading: false,
        list: [],
        activePage: 1,
        totalPages: 0,
    });
    const toastId = useRef(null);
    const tableRef = useRef(null);

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
    }, [])

    const fetchTokenList = (pageNumber) => {
        toastId.current = toast.loading("Fetching details...");
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
                toast.dismiss(toastId.current);
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
                {loading ? <ShimmerLoader /> : (
                    <div className="fungible_tokens_table">
                        {list?.length > 0 && list.map((details, index) => <TokenCard {...details} key={index} />)}
                    </div>
                )}
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


function TokenCard(props) {
    if (!props) {
        return null;
    };

    const { currency } = props;

    return (
        <div className="fungible_token">
            <div className="upper_section">
                <div className="token_img">Img</div>
            </div>
            <div className="strip">
                <div className="properties">
                    <div className="name">
                        {currency}
                    </div>
                </div>
            </div>
        </div>
    )

}