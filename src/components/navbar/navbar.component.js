import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { ROUTES } from "../../constants/common.constants";

const Navbar = (props) => {

    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="navbar_container" style={{ height: "100%" }}>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => setIsNavBarVisible(false)}
                    vertical
                    visible={isNavBarVisible}
                    width='thin'
                >
                    <Menu.Item as='a' onClick={() => navigate(ROUTES.HOME)}>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    <Menu.Item as='a' onClick={() => navigate(ROUTES.ACCOUNTS)} >
                        <Icon name='gamepad' />
                        My Accounts
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='camera' />
                        Channels
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={isNavBarVisible}>
                    <Segment basic>
                        <Icon name="th list" onClick={() => setIsNavBarVisible(true)} style={{ cursor: "pointer" }} />
                        {props.children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default Navbar;
