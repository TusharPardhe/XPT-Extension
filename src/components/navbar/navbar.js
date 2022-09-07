import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { ROUTES } from "../../constants/common.constants";

import "./navbar.scss";

const Navbar = (props) => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const navigate = useNavigate();

    const navigateTo = (route) => {
        navigate(route);
        setIsNavBarVisible(false);
    };

    const onLogOutClick = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate(ROUTES.LANDING_PAGE);
        }, 0);
    };

    const onSideBarHide = () => {
        setIsNavBarVisible(false);
    }

    return (
        <div className="navbar_container" style={{ height: "100%" }}>
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="push"
                    icon="labeled"
                    inverted
                    onHide={onSideBarHide}
                    vertical
                    visible={isNavBarVisible}
                    direction="right"
                    width="thin"
                    className="sidebar"
                >
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.HOME)} key="home">
                        <Icon name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.ACCOUNTS)} key="account">
                        <Icon name="address book" />
                        Add Account
                    </Menu.Item>
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.MINT_CALENDAR)} key="mint_calendar">
                        <Icon name="map marker alternate" />
                        Mint Calendar
                    </Menu.Item>
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.AIRDROPS)} key="airdrops">
                        <Icon name="compass" />
                        Airdrops
                    </Menu.Item>
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.FUNGIBLE_TOKENS)} key="tokens">
                        <Icon name="diamond" />
                        Tokens
                    </Menu.Item>
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.CHEAT_SHEET)} key="links">
                        <Icon name="sticky note outline" />
                        Cheat Sheet
                    </Menu.Item>
                    {/* <Menu.Item as="a" onClick={() => navigateTo(ROUTES.NFT_DETAILS)}>
                        <Icon name="image outline" />
                        NFT Visualiser
                    </Menu.Item> */}
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.DONATIONS)} key="donate">
                        <Icon name="heartbeat" />
                        Donate
                    </Menu.Item>
                    <Menu.Item as="a" onClick={onLogOutClick} key="logout">
                        <Icon name="log out" />
                        Logout
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={isNavBarVisible} className={isNavBarVisible ? "content_pusher" : ""}>
                    <div className="slider">
                        <Icon name="bars" className="icon" onClick={() => setIsNavBarVisible(true)} />
                    </div>
                    <div className="content">{props.children}</div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default Navbar;
