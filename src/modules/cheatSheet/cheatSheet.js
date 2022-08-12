import React, { useEffect } from "react";
import { Divider, Image } from "semantic-ui-react";
import { marked } from 'marked';

import useMergedState from "../../utils/useMergedState";

import XPTLogoImg from "../../assets/svg/xpt.svg";

import "./cheatSheet.scss";

const CheatSheet = () => {
    const [state, setState] = useMergedState({ readme: "" });
    const { readme } = state;

    useEffect(() => {
        fetchSheet();
    }, []);

    const fetchSheet = async () => {
        try {
            const readme = await fetch("https://raw.githubusercontent.com/TusharPardhe/xrpl-cheat-sheet/master/README.md").then((res) => res.text());

            setState({ readme: marked(readme) });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cheat_sheet_component">
            <div className="heading_component">
                <div className="heading">CHE<Image src={XPTLogoImg} className="logo_img" />T SHEET</div>
                <div className="sub_heading">Learn about XRP Ledger</div>
            </div>
            <Divider />
            <div dangerouslySetInnerHTML={{ __html: readme }} />
        </div>
    );
};

export default CheatSheet;
