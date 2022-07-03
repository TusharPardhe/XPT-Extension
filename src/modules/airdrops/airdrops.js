import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Image, Pagination } from "semantic-ui-react";
import DatePicker from "react-date-picker";

import XPTLogoImg from "../../assets/svg/xpt.svg";
import { ROUTES } from "../../constants/common.constants";
import { ApiCall } from "../../utils/api.util";
import useMergedState from "../../utils/useMergedState";

import "./airdrops.scss";

const Airdrops = () => {
    const navigate = useNavigate();
    const [state, setState] = useMergedState({
        date: new Date(),
        activePage: 1,
        totalPages: 0,
        totalCount: 0,
        limit: 4,
        loading: true,
        list: [],
    });
    const { date, activePage, totalPages, limit, list } = state;

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
                date: date.getTime()
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
                        list,
                    });
                }
            })
            .finally(() => {
                setState({ loading: false });
            });
    }

    const onDateChange = (value) => {
        setState({ date: value });
        if (value) {
            fetchAirdropList(activePage, value);
        };
    }
    const handlePaginationChange = (e, { activePage }) => {
        setState({ activePage });
        fetchAirdropList(activePage, date);
    }

    return (
        <div className="airdrops_container">
            <div className="heading_component">
                <div className="heading">
                    AIRDR
                    <Image src={XPTLogoImg} className="logo_img" />
                    PS
                </div>
                <div className="sub_heading">Never let a drop go unnoticed.</div>
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
                <div className="airdrops_container">
                    <AirdropList {...{ list, navigate }} />
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
        </div>
    );
};

export default Airdrops;

const AirdropList = ({ list, navigate }) => {
    if (!list || list.length === 0) {
        return null;
    };

    const onDropClick = (id) => {
        navigate(ROUTES.DROP_DETAILS.replace(":id", id));
    };

    return (
        <div className="airdrops">
            {list.map(({ projectName }) => (
                <div className="drop" onClick={() => onDropClick("a")}>
                    <div className="left_section">Logo</div>
                    <div className="heading">{projectName}</div>
                </div>
            ))}
        </div>
    );
}

