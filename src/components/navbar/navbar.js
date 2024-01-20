import './navbar.scss';

import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import React, { useState } from 'react';

import { ROUTES } from '../../constants/common.constants';
import { decryptJSON } from '../../utils/common.utils';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const navigate = useNavigate();
    const approverFromLocalStorage = localStorage.getItem('approver');
    let isApprover = false;

    if (approverFromLocalStorage) {
        isApprover = decryptJSON(approverFromLocalStorage, process.env.ENCRYPTION_KEY).approver ?? false;
    }

    const navigateTo = (route) => {
        navigate(route);
        setIsNavBarVisible(false);
    };

    const onLogOutClick = () => {
        localStorage.removeItem('address');
        localStorage.removeItem('savedAccounts');

        setTimeout(() => {
            navigate(ROUTES.LANDING_PAGE);
        }, 0);
    };

    const onSideBarHide = () => {
        setIsNavBarVisible(false);
    };

    return (
        <div className="navbar_container" style={{ height: '100%' }}>
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="scale down"
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
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.ESCROW)} key="airdrops">
                        <Icon name="compass" />
                        Escrows
                    </Menu.Item>
                    {isApprover && (
                        <Menu.Item as="a" onClick={() => navigateTo(ROUTES.ADD_ESCROW)} key="account">
                            <Icon name="address book" />
                            Add Escrow
                        </Menu.Item>
                    )}
                    <Menu.Item as="a" onClick={() => navigateTo(ROUTES.FUNGIBLE_TOKENS)} key="tokens">
                        <Icon name="diamond" />
                        Tokens
                    </Menu.Item>
                    <Menu.Item as="a" onClick={onLogOutClick} key="logout">
                        <Icon name="log out" />
                        Logout
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={isNavBarVisible} className={isNavBarVisible ? 'content_pusher' : ''}>
                    <div className="slider">
                        <Icon
                            name="bars"
                            className="icon"
                            onClick={() => setIsNavBarVisible(true)}
                            style={{ color: 'var(--sgolden)' }}
                        />
                    </div>
                    <div className="content">{props.children}</div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default Navbar;
