import React from "react";
import { Route, Routes as RoutesBundle, useLocation } from "react-router-dom";
import { ROUTES } from "./constants/common.constants";
import Navbar from "./components/navbar/navbar.component";
import Home from "./modules/home/home.component";
import Accounts from "./modules/accounts/accounts.component";
import Portfolio from "./modules/portfolio/portfolio.component";

export default function Routes() {
    const location = useLocation();

    const wrapWithNavBar = (component) => <Navbar>{component}</Navbar>;

    return (
        <RoutesBundle location={location}>
            <Route path={ROUTES.HOME} element={wrapWithNavBar(<Home />)} />
            <Route path={ROUTES.ACCOUNTS} element={wrapWithNavBar(<Accounts />)} />
            <Route path={ROUTES.PORTFOLIO} element={wrapWithNavBar(<Portfolio />)} />
            <Route path="/*" element={<div>Error</div>} />
        </RoutesBundle>
    );
}
