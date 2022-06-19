import React from "react";
import DatePicker from "react-date-picker";
import { Divider, Image } from "semantic-ui-react";
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
            </div>
        </div>
    );
};

export default Airdrops;
