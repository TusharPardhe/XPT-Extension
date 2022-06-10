import React, { useEffect } from "react";

import { Dimmer, Image, Label, Loader, Table } from "semantic-ui-react";
import { ALTERNATIVE_ME_API_ENDPOINT, URLS } from "../../constants/common.constants";
import useMergedState from "../../utils/useMergedState";

import "./xrpDetaills.scss";

const XRPDetails = () => {
    const [state, setState] = useMergedState({
        data: {},
        loading: true,
    });
    const { data, loading } = state;

    useEffect(() => {
        fetchXRPDetais();
    }, []);

    const fetchXRPDetais = () => {
        fetch(ALTERNATIVE_ME_API_ENDPOINT)
            .then((res) => res.json())
            .then((res) => setState({ data: res.data, loading: false }))
            .catch((err) => {
                alert(err)
                setState({ loading: false });
            })
    };

    const renderDetails = () => {
        if (loading || !data || Object.keys(data).length === 0) return null;

        const token_data_against_usd = data["52"];
        const current_details = token_data_against_usd.quotes.USD;

        return (
            <div className="sub_container">
                <div className="img_container">
                    <Image src={URLS.XRP_ICON} className="img_c" />
                    <div className="name">XRP</div>
                </div>
                {/* <div className='last_updated_time'>{new Date(token_data_against_usd.quotes.last_updated).getTime()}</div> */}
                <div className="table_container">
                    <Table celled>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>Current Price:</Label> <span>{current_details.price.toLocaleString()}</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>1hr Change %:</Label> <span className={`color-${current_details.percentage_change_1h > 0 ? "green" : "red"}`}>{current_details.percentage_change_1h.toLocaleString()} %</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>24hrs Change %:</Label> <span className={`color-${current_details.percentage_change_24h > 0 ? "green" : "red"}`}>{current_details.percentage_change_24h.toLocaleString()} %</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>7hrs Change %:</Label> <span className={`color-${current_details.percentage_change_7d > 0 ? "green" : "red"}`}>{current_details.percentage_change_7d.toLocaleString()} %</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>Rank</Label> <span>{token_data_against_usd.rank.toLocaleString()}</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>24hrs Volume:</Label> <span>{current_details.volume_24h.toLocaleString()}</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>Market Cap:</Label> <span>{current_details.market_cap.toLocaleString()}</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>Circulating Supply:</Label> <span>{token_data_against_usd.circulating_supply.toLocaleString()}</span>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing className="table_heading">
                                    <Label ribbon>Total Supply:</Label> <span>{token_data_against_usd.total_supply.toLocaleString()}</span>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div >
        );
    };

    return (
        <div className="xrp_details_container">
            {renderDetails()}
            <Dimmer active={loading} inverted>
                <Loader inverted content="Fetching details..." inline="centered" />
            </Dimmer>
        </div>
    );
};

export default XRPDetails;
