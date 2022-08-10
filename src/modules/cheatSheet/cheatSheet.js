import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMergedState from "../../utils/useMergedState";

import { Divider, Image } from "semantic-ui-react";

import XPTLogoImg from "../../assets/svg/xpt.svg";
import { ROUTES } from "../../constants/common.constants";

import "./cheatSheet.scss";

const CheatSheet = () => {
    const [state, setState] = useMergedState({
        data: {},
    });
    const navigate = useNavigate();
    const { data } = state;

    useEffect(() => {
        fetchSheet();
    }, []);

    const fetchSheet = async () => {
        try {
            const res = await fetch("https://raw.githubusercontent.com/TusharPardhe/xrpl-cheat-sheet/master/src/xrpl-cheat-sheet.json").then((res) => res.json());
            console.log(res);
            setState({ data: res });
        } catch (err) {
            console.log(err);
        }
    };

    const onTabClick = (name) => {
        navigate(ROUTES.CHEAT_SHEET_TAB, {
            state: {
                ...data[name],
                name
            }
        });
    };

    return (
        <div className="cheat_sheet_component">
            <div className="heading_component">
                <div className="heading">CHE<Image src={XPTLogoImg} className="logo_img" />T SHEET</div>
                <div className="sub_heading">Cheating is not recommended.</div>
            </div>
            <Divider />
            <div className="links_container">
                {Object.keys(data).map((name, index) => (
                    <div className="tab_names" key={index} onClick={() => onTabClick(name)}>
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheatSheet;
