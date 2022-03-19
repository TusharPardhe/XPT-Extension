import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { ROUTES } from "../../constants/common.constants";

import "./navbar.component.scss";

const Navbar = (props) => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const navigate = useNavigate();

    const navigateTo = (route) => {
        navigate(route);
        setIsNavBarVisible(false);
    };

    return (
        <div className="navbar_container" style={{ height: "100%" }}>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    onHide={() => setIsNavBarVisible(false)}
                    vertical
                    visible={isNavBarVisible}
                    direction="right"
                    width="thin"
                >
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.HOME)}>
                        <Icon name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.ACCOUNTS)}>
                        <Icon name="address book" />
                        Saved Accounts
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={isNavBarVisible}>
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
