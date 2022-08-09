import React from 'react';

import DateTimePicker from 'react-datetime-picker';
import { Button, Input, Select, TextArea } from 'semantic-ui-react';

import { URLS } from '../../../../constants/common.constants';

const RegistrationForm = ({ state, setState, handleUserInput, onSubmit }) => {

    const { ticker, projectName, currencyName, date, logo, twitter, discord, website, linktree, others, description, loading } = state;

    return (
        <div className="registration_form">
            <div className="heading">Please enter details:</div>
            <div className="inputs">
                <div className="input_field">
                    <div className="label">Select Token Ticker:</div>
                    <Select
                        placeholder="Select your token"
                        options={ticker.options}
                        error={ticker.error.length > 0}
                        style={{ width: "100%" }}
                        value={ticker.value}
                        name="ticker"
                        onChange={handleUserInput}
                    />
                </div>
                <div className="input_field">
                    <div className="label">Project Name:</div>
                    <Input
                        placeholder="Enter name here"
                        style={{ width: "100%" }}
                        value={projectName.value}
                        name="projectName"
                        onChange={handleUserInput}
                        error={projectName.error.length > 0}
                    />
                </div>
                <div className="input_field">
                    <div className="label">Currency Name:</div>
                    <Input
                        placeholder="Enter currency name here"
                        style={{ width: "100%" }}
                        value={currencyName.value}
                        name="currencyName"
                        onChange={handleUserInput}
                        error={currencyName.error.length > 0}
                    />
                </div>
                <div className="input_field">
                    <div className="label">Airdrop Date:</div>
                    <DateTimePicker onChange={(value) => setState({ date: { value } })} value={date.value} style={{ width: "100%" }} required />
                </div>
                <div className="input_field">
                    <div className="label">Links:</div>
                    <div className="social_inputs">
                        <Input
                            label={{ content: "Logo: " }}
                            labelPosition="left"
                            style={{ width: "100%" }}
                            value={logo.value}
                            name="logo"
                            placeholder="Png/Jpeg/Jpg link"
                            onChange={handleUserInput}
                            error={logo.error.length > 0}
                        />
                        <Input
                            label={{ content: "Twitter: " }}
                            labelPosition="left"
                            style={{ width: "100%" }}
                            value={twitter.value}
                            name="twitter"
                            placeholder="Enter twitter link"
                            onChange={handleUserInput}
                        />
                        <Input
                            label={{ content: "Discord: " }}
                            labelPosition="left"
                            style={{ width: "100%" }}
                            value={discord.value}
                            name="discord"
                            placeholder="Enter discord link"
                            onChange={handleUserInput}
                        />
                        <Input
                            label={{ content: "Website: " }}
                            labelPosition="left"
                            style={{ width: "100%" }}
                            value={website.value}
                            name="website"
                            placeholder="Enter website link"
                            onChange={handleUserInput}
                        />
                        <Input
                            label={{ content: "LinkTree: " }}
                            labelPosition="left"
                            style={{ width: "100%" }}
                            value={linktree.value}
                            name="linktree"
                            placeholder="Enter linktree link"
                            onChange={handleUserInput}
                        />
                        <Input
                            label={{ content: "Others: " }}
                            labelPosition="left"
                            style={{ width: "100%" }}
                            value={others.value}
                            name="others"
                            placeholder="Enter additional links"
                            onChange={handleUserInput}
                        />
                    </div>
                </div>
                <div className="input_field">
                    <div className="label">Description:</div>
                    <TextArea
                        style={{
                            width: "100%",
                            minWidth: "100%",
                            maxWidth: "100%",
                            minHeight: "80px",
                            maxHeight: "150px",
                        }}
                        name="description"
                        onChange={handleUserInput}
                        value={description.value}
                        className={description.error.length > 0 ? "error_textarea" : ""}
                    />
                </div>
            </div>
            <div className="submission_note">
                <span>Note:</span> A token issuer can submit only one request per issued token.If you want to edit your details after submission,
                please contact us on{" "}
                <a href={URLS.XPT_TWITTER} target="_blank" rel="noopener noreferrer">
                    Twitter
                </a>
                .
            </div>
            <div className="btn_container">
                <Button inverted color={"green"} type="submit" onClick={onSubmit} disabled={false} loading={loading}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default RegistrationForm;
