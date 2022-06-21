import React from "react";
import DatePicker from "react-date-picker";
import { Divider, Image, Pagination } from "semantic-ui-react";
import XPTLogoImg from "../../assets/svg/xpt.svg";
import useMergedState from "../../utils/useMergedState";

import "./airdrops.scss";

const Airdrops = () => {
    const [state, setState] = useMergedState({
        date: new Date(),
    });

    const { date } = state;

    const onDateChange = (value) => setState({ date: value });

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
                    <div className="airdrops">
                        <div className="drop">
                            <div className="left_section">Logo</div>
                            <div className="heading">A</div>
                        </div>
                        <div className="drop">
                            <div className="left_section">Logo</div>
                            <div className="heading">A</div>
                        </div>
                        <div className="drop">
                            <div class="left_section"></div>
                            <div className="right_section">
                                <div className="heading">A</div>
                            </div>
                        </div>
                        <div className="drop">
                            <div className="left_section">Logo</div>
                            <div className="heading">A</div>
                        </div>
                    </div>
                    <div className="pagination">
                        <Pagination defaultActivePage={1} firstItem={null} lastItem={null} pointing secondary totalPages={3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Airdrops;
