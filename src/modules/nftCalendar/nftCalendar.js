import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Image, Pagination } from "semantic-ui-react";
import DatePicker from "react-date-picker";
import dateFormat from "dateformat";

import useMergedState from "../../utils/useMergedState";

import NoResultCard from "../../components/noResultCard/noResultCard";
import ShimmerLoader from "../../components/shimmerLoader/shimmerLoader";
import XPTLogoImg from "../../assets/svg/xpt.svg";

import { ROUTES } from "../../constants/common.constants";
import { ApiCall } from "../../utils/api.util";
import { scrollToRef } from "../../utils/common.utils";
import { AIRDROPS_INITIAL_STATE } from "../../constants/airdrops.constants";

import "./nftCalendar.scss";


const NftCalendar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const inputContainerRef = useRef();
    const [state, setState] = useMergedState({ ...AIRDROPS_INITIAL_STATE, ...location.state });
    const { date, activePage, totalPages, limit, list, loading } = state;

    useEffect(() => {
        fetchAirdropList(activePage, date);
    }, [location.state]);

    const fetchAirdropList = (pageNumber, date) => {
        setState({
            totalPages: Math.ceil(1 / 4),
            totalCount: 1,
            date,
            list,
        });
        // const payload = {
        //     method: "GET",
        //     url: "airdrop/list",
        //     encrypt: true,
        //     params: {
        //         limit,
        //         pageNumber,
        //         date: parseInt(date.getTime() / 1000),
        //     },
        // };

        // setState({ loading: true });
        // ApiCall(payload)
        //     .then((response) => {
        //         if (response.data) {
        //             const { totalCount, list } = response.data;
        //             setState({
        //                 totalPages: Math.ceil(totalCount / 4),
        //                 totalCount,
        //                 date,
        //                 list,
        //             });
        //         }
        //     })
        // .finally(() => {
        //     setState({ loading: false });
        //     scrollToRef(inputContainerRef);
        // });
    };

    const onDateChange = (value) => {
        setState({ date: value });
        if (value && value - date !== 0) {
            fetchAirdropList(activePage, value);
            setState({ activePage: AIRDROPS_INITIAL_STATE.activePage });
        }
    };

    const handlePaginationChange = (e, { activePage }) => {
        setState({ activePage });
        fetchAirdropList(activePage, date);
    };

    // const handleRegisterBtnClick = () => {
    //     navigate(ROUTES.AIRDROP_REGISTRATION);
    // };

    return (
        <div className="nft_calendar_container">
            <div className="heading_component">
                <div className="heading">
                    MINT CALEND<Image src={XPTLogoImg} className="logo_img" />R
                </div>
                <div className="sub_heading">Everything seems overly minty</div>
                {/* <div className="register_drop_link" onClick={handleRegisterBtnClick}>
                    Register your mint
                </div> */}
            </div>
            <Divider />
            <div className="input_container">
                <div className="date_picker">
                    <DatePicker
                        value={date}
                        onChange={onDateChange}
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYYY"
                        format="dd-MM-y"
                    />
                </div>
                <div className="mints_container">
                    <MintList {...{ loading, list, navigate, state }} />
                    <div className="pagination" ref={inputContainerRef}>
                        <Pagination
                            pointing
                            secondary
                            boundaryRange={0}
                            defaultActivePage={activePage}
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
        </div>
    );
};

export default NftCalendar;

const MintList = ({ loading, list, navigate, state }) => {
    if (loading) {
        return <ShimmerLoader />;
    }

    if (!list || list.length === 0) {
        return <NoResultCard title={"No airdrops found"} />;
    }

    const onMintClick = (mint) => {
        navigate(ROUTES.NFT_DETAILS.replace(":id", mint.ticker), {
            state: {
                ...mint,
                selectedDate: state.date,
                selectedPage: state.activePage,
            },
        });
    };

    return (
        <div className="mints">
            {list.map((mint, index) => (
                <div key={`${mint.projectName}_${index}`} className="mint" onClick={() => onMintClick(mint)}>
                    <div className="img">
                        <img src={mint.logo ?? XPTLogoImg} alt={`${mint.projectName}`} />
                    </div>
                    <div className="heading">{mint.projectName}</div>
                    <div className="sub_heading">{dateFormat(mint.date * 1000, "dd-mm-yyyy")}</div>
                </div>
            ))}
        </div>
    );
};

