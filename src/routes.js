import React, { Suspense } from 'react';
import { Route, Routes as RoutesBundle, useLocation } from 'react-router-dom';

import AnimatedLoader from './components/animatedLoader/animatedLoader';
import { ROUTES } from './constants/common.constants';
import TrackEscrow from './modules/escrows/TrackEscrow';

const Home = React.lazy(() => import('./modules/home/home'));
const Navbar = React.lazy(() => import('./components/navbar/navbar'));
const Landing = React.lazy(() => import('./modules/landing/landing'));
const Portfolio = React.lazy(() => import('./modules/portfolio/portfolio'));
const AddAccount = React.lazy(() => import('./modules/addAccounts/addAccount'));
const FungibleTokens = React.lazy(() => import('./modules/fungibleTokens/fungibleTokens'));
const FungibleTokenDetails = React.lazy(() =>
    import('./modules/fungibleTokens/components/fungibleTokenDetails/fungibleTokenDetails')
);
// const CheatSheet = React.lazy(() => import("./modules/cheatSheet/CheatSheet"));
const SignUp = React.lazy(() => import('./modules/landing/components/signUp/signUp'));
const NftVisualiser = React.lazy(() => import('./modules/nftVisualiser/nftVisualiser'));
const Airdrops = React.lazy(() => import('./modules/airdrops/airdrops'));
const DropDetails = React.lazy(() => import('./modules/airdrops/components/dropDetails/dropDetails'));
const AirdropRegistration = React.lazy(() =>
    import('./modules/airdrops/components/airdropRegistration/airdropRegistration')
);
const SuccessPage = React.lazy(() => import('./components/successPage/sucessPage'));
const Donations = React.lazy(() => import('./modules/donations/donations'));
const Transactions = React.lazy(() => import('./modules/transactions/transactions'));
const AddEscrow = React.lazy(() => import('./modules/addEscrow/addEscrow'));
const Escrow = React.lazy(() => import('./modules/escrows/Escrow'));

export default function Routes() {
    const location = useLocation();

    const wrapWithNavBar = (component) => <Navbar>{component}</Navbar>;

    return (
        <Suspense fallback={<AnimatedLoader loadingText="Loading" />}>
            <RoutesBundle location={location}>
                <Route path={ROUTES.LANDING_PAGE} element={<Landing />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                <Route path={ROUTES.HOME} element={wrapWithNavBar(<Home />)} />
                <Route path={ROUTES.ACCOUNTS} element={wrapWithNavBar(<AddAccount />)} />
                <Route path={ROUTES.PORTFOLIO} element={wrapWithNavBar(<Portfolio />)} />
                <Route path={ROUTES.FUNGIBLE_TOKENS} element={wrapWithNavBar(<FungibleTokens />)} />
                <Route path={ROUTES.FUNGIBLE_TOKEN_DETAILS} element={wrapWithNavBar(<FungibleTokenDetails />)} />
                <Route path={ROUTES.NFT_DETAILS} element={wrapWithNavBar(<NftVisualiser />)} />
                <Route path={ROUTES.AIRDROPS} element={wrapWithNavBar(<Airdrops />)} />
                <Route path={ROUTES.DROP_DETAILS} element={wrapWithNavBar(<DropDetails />)} />
                <Route path={ROUTES.AIRDROP_REGISTRATION} element={wrapWithNavBar(<AirdropRegistration />)} />
                <Route path={ROUTES.REQUEST_SUCCESS} element={wrapWithNavBar(<SuccessPage />)} />
                <Route path={ROUTES.TRANSACTIONS} element={wrapWithNavBar(<Transactions />)} />
                <Route path={ROUTES.DONATIONS} element={wrapWithNavBar(<Donations />)} />
                <Route path={ROUTES.ESCROW} element={wrapWithNavBar(<Escrow />)} />
                <Route path={ROUTES.ADD_ESCROW} element={wrapWithNavBar(<AddEscrow />)} />
                <Route path={ROUTES.TRACK_ESCROW} element={<TrackEscrow />} />
                <Route path="/*" element={<div>Error</div>} />
            </RoutesBundle>
        </Suspense>
    );
}
