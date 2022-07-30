import React, { Suspense } from "react";
import { Route, Routes as RoutesBundle, useLocation } from "react-router-dom";

import { ROUTES } from "./constants/common.constants";

import ShimmerLoader from "./components/shimmerLoader/shimmerLoader";
const Home = React.lazy(() => import("./modules/home/home"));
const Navbar = React.lazy(() => import("./components/navbar/navbar"));
const Landing = React.lazy(() => import("./modules/landing/landing"));
const Portfolio = React.lazy(() => import("./modules/portfolio/portfolio"));
const AddAccount = React.lazy(() => import("./modules/addAccounts/addAccount"));
const FungibleTokensList = React.lazy(() => import("./modules/fungibleTokensList/fungibleTokensList"));
const UsefulLinks = React.lazy(() => import("./modules/usefulLinks/usefulLinks"));
const Login = React.lazy(() => import("./modules/landing/components/login/login"));
const SignUp = React.lazy(() => import("./modules/landing/components/signUp/signUp"));
const NftVisualiser = React.lazy(() => import("./modules/nftVisualiser/nftVisualiser"));
const Airdrops = React.lazy(() => import("./modules/airdrops/airdrops"));
const DropDetails = React.lazy(() => import("./modules/airdrops/components/dropDetails/dropDetails"));
const AirdropRegistration = React.lazy(() => import("./modules/airdrops/components/airdropRegistration/airdropRegistration"));
const SuccessPage = React.lazy(() => import("./components/successPage/sucessPage"));
const Donations = React.lazy(() => import("./modules/donations/donations"));

export default function Routes() {
    const location = useLocation();

    const wrapWithNavBar = (component) => <Navbar>{component}</Navbar>;

    return (
        <Suspense fallback={<ShimmerLoader />}>
            <RoutesBundle location={location}>
                <Route path={ROUTES.LANDING_PAGE} element={<Landing />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                <Route path={ROUTES.HOME} element={wrapWithNavBar(<Home />)} />
                <Route path={ROUTES.ACCOUNTS} element={wrapWithNavBar(<AddAccount />)} />
                <Route path={ROUTES.PORTFOLIO} element={wrapWithNavBar(<Portfolio />)} />
                <Route path={ROUTES.XRP_DETAILS} element={wrapWithNavBar(<FungibleTokensList />)} />
                <Route path={ROUTES.USEFUL_LINKS} element={wrapWithNavBar(<UsefulLinks />)} />
                <Route path={ROUTES.NFT_DETAILS} element={wrapWithNavBar(<NftVisualiser />)} />
                <Route path={ROUTES.AIRDROPS} element={wrapWithNavBar(<Airdrops />)} />
                <Route path={ROUTES.DROP_DETAILS} element={wrapWithNavBar(<DropDetails />)} />
                <Route path={ROUTES.AIRDROP_REGISTRATION} element={wrapWithNavBar(<AirdropRegistration />)} />
                <Route path={ROUTES.REQUEST_SUCCESS} element={wrapWithNavBar(<SuccessPage />)} />
                <Route path={ROUTES.DONATIONS} element={wrapWithNavBar(<Donations />)} />
                <Route path="/*" element={<div>Error</div>} />
            </RoutesBundle>
        </Suspense>
    );
};
