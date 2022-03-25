import React from "react";
import { Route, Routes as RoutesBundle, useLocation } from "react-router-dom";

import Home from "./modules/home/home.component";
import Navbar from "./components/navbar/navbar.component";
import Accounts from "./modules/accounts/accounts.component";
import Portfolio from "./modules/portfolio/portfolio.component";
import XRPDetails from "./modules/xrpDetails/xrpDetaills.component";
import UsefulLinks from "./modules/usefulLinks/usefulLinks.component";
import NftVisualiser from "./modules/nftVisualiser/nftVisualiser.component";
import { ROUTES } from "./constants/common.constants";

export default function Routes() {
    const location = useLocation();

    const wrapWithNavBar = (component) => <Navbar>{component}</Navbar>;

    return (
        <RoutesBundle location={location}>
            <Route path={ROUTES.HOME} element={wrapWithNavBar(<Home />)} />
            <Route path={ROUTES.ACCOUNTS} element={wrapWithNavBar(<Accounts />)} />
            <Route path={ROUTES.PORTFOLIO} element={wrapWithNavBar(<Portfolio />)} />
            <Route path={ROUTES.XRP_DETAILS} element={wrapWithNavBar(<XRPDetails />)} />
            <Route path={ROUTES.USEFUL_LINKS} element={wrapWithNavBar(<UsefulLinks />)} />
            <Route path={ROUTES.NFT_DETAILS} element={wrapWithNavBar(<NftVisualiser />)} />
            <Route path="/*" element={<div>Error</div>} />
        </RoutesBundle>
    );
}
