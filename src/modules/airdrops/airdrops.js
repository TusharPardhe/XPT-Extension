import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Image, Pagination } from "semantic-ui-react";
import DatePicker from "react-date-picker";

import NoResultCard from "../../components/NoResultCard/noResultCard";
import ShimmerLoader from "../../components/shimmerLoader/shimmerLoader";
import XPTLogoImg from "../../assets/svg/xpt.svg";
import { ROUTES } from "../../constants/common.constants";
import { ApiCall } from "../../utils/api.util";
import useMergedState from "../../utils/useMergedState";
import { executeScrollToRef } from "../../utils/common.utils";

import "./airdrops.scss";

const Airdrops = () => {
    const navigate = useNavigate();
    const inputContainerRef = useRef();
    const [state, setState] = useMergedState({
        date: new Date(),
        activePage: 1,
        totalPages: 0,
        totalCount: 0,
        limit: 4,
        loading: true,
        list: [],
    });
    const { date, activePage, totalPages, limit, list, loading } = state;

    useEffect(() => {
        fetchAirdropList(activePage, date);
    }, []);

    const fetchAirdropList = (pageNumber, date) => {
        const payload = {
            method: "GET",
            url: "airdrop/list",
            encrypt: true,
            params: {
                limit,
                pageNumber,
                date: parseInt(date.getTime() / 1000),
            }
        };

        setState({ loading: true });
        ApiCall(payload)
            .then((response) => {
                if (response.data) {
                    const { totalCount, list } = response.data;
                    setState({
                        totalPages: Math.ceil(totalCount / 4),
                        totalCount,
                        date,
                        list,
                    });
                }
            })
            .finally(() => {
                setState({ loading: false });
                executeScrollToRef(inputContainerRef);
            });
    }

    const onDateChange = (value) => {
        setState({ date: value });
        if (value && value - date !== 0) {
            fetchAirdropList(activePage, value);
        };
    };

    const handlePaginationChange = (e, { activePage }) => {
        setState({ activePage });
        fetchAirdropList(activePage, date);
    };

    const handleRegisterBtnClick = () => {
        navigate(ROUTES.AIRDROP_REGISTRATION);
    };

    return (
        <div className="airdrops_container">
            <div className="heading_component">
                <div className="heading">
                    AIRDR
                    <Image src={XPTLogoImg} className="logo_img" />
                    PS
                </div>
                <div className="sub_heading">Never let a drop go unnoticed.</div>
                <div className="register_drop_link" onClick={handleRegisterBtnClick}>Register your drop</div>
            </div>
            <Divider />
            <div className="input_container" >
                <div className="date_picker">
                    <div className="label">From date:</div>
                    <DatePicker
                        value={date}
                        onChange={onDateChange}
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYYY"
                        format="dd-MM-y"
                    />
                </div>
                <div className="airdrops_container">
                    <AirdropList {...{ loading, list, navigate }} />
                    <div className="pagination" ref={inputContainerRef}>
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
        </div>
    );
};

export default Airdrops;

const AirdropList = ({ loading, list, navigate }) => {
    if (loading) { 
        return <ShimmerLoader/>; 
    };

    if (!list || list.length === 0) {
        return <NoResultCard title={"No airdrops found"} />;
    };

    const onDropClick = (drop) => {
        navigate(ROUTES.DROP_DETAILS.replace(":id", drop.ticker), {
            state: drop
        });
    };

    return (
        <div className="airdrops">
            {list.map((drop, index) => (
                <div key={`${drop.projectName}_${index}`} className="drop" onClick={() => onDropClick(drop)}>
                    <div className="left_section">Logo</div>
                    <div className="heading">{drop.projectName}</div>
                </div>
            ))}
        </div>
    );
}

