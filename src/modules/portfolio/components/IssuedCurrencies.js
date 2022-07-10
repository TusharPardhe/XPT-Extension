import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { convertHexToString } from "xrpl";
import { PORTFOLIO_HEADER_KEYS } from "../../../constants/portfolio.constants";

export default function IssuedCurrencies({ toggleDetails, isOpen, issuedFungibleTokens }) {
    return (
        <div className="issued_tokens_container">
            <div className="details_header" onClick={() => toggleDetails(PORTFOLIO_HEADER_KEYS.ISSUED_FUNGIBLE_TOKENS)}>
                Issued Fungible Tokens <Icon name={`caret ${isOpen.ISSUED_FUNGIBLE_TOKENS ? "down" : "right"}`} />
            </div>
            <div className={`transition ${isOpen.ISSUED_FUNGIBLE_TOKENS ? "load" : "hide"}`}>
                {Object.keys(issuedFungibleTokens).map((tokenName, index) => (
                    <Table celled key={index}>
                        <Table.Body>
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {tokenName.length === 40 ? convertHexToString(tokenName).replaceAll("\u0000", "") : tokenName}
                                </Table.Cell>
                                <Table.Cell>{parseFloat(issuedFungibleTokens[tokenName]).toLocaleString()}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                ))}
            </div>
        </div>
    );
}
