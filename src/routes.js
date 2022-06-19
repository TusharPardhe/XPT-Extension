import React from "react";
import { Route, Routes as RoutesBundle, useLocation } from "react-router-dom";

import Home from "./modules/home/home";
import Navbar from "./components/navbar/navbar";
import Landing from "./modules/landing/landing";
import Portfolio from "./modules/portfolio/portfolio";
import AddAccount from "./modules/addAccounts/addAccount";
import XRPDetails from "./modules/xrpDetails/xrpDetaills";
import UsefulLinks from "./modules/usefulLinks/usefulLinks";
import Login from "./modules/landing/components/login/login";
import SignUp from "./modules/landing/components/signUp/signUp";
import NftVisualiser from "./modules/nftVisualiser/nftVisualiser";
import Airdrops from "./modules/airdrops/airdrops";

import { ROUTES } from "./constants/common.constants";

export default function Routes() {
    const location = useLocation();

    const wrapWithNavBar = (component) => <Navbar>{component}</Navbar>;

    return (
        <RoutesBundle location={location}>
            <Route path={ROUTES.LANDING_PAGE} element={<Landing />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.HOME} element={wrapWithNavBar(<Home />)} />
            <Route path={ROUTES.ACCOUNTS} element={wrapWithNavBar(<AddAccount />)} />
            <Route path={ROUTES.PORTFOLIO} element={wrapWithNavBar(<Portfolio />)} />
            <Route path={ROUTES.XRP_DETAILS} element={wrapWithNavBar(<XRPDetails />)} />
            <Route path={ROUTES.USEFUL_LINKS} element={wrapWithNavBar(<UsefulLinks />)} />
            <Route path={ROUTES.NFT_DETAILS} element={wrapWithNavBar(<NftVisualiser />)} />
            <Route path={ROUTES.AIRDROPS} element={wrapWithNavBar(<Airdrops />)} />
            <Route path="/*" element={<div>Error</div>} />
        </RoutesBundle>
    );
}
