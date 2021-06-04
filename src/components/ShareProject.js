import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
// import "../../styles/components/Table.css";
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    VKShareButton,
    WhatsappShareButton,
    EmailShareButton,


    // Comment to sepaate, overwriting codesandbox behavior
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    WhatsappIcon,
    EmailIcon
} from "react-share";
import "react-tabs/style/react-tabs.css";

const baseUrl = "https://buildingoncardano.com/#/projectdetails/";

const tableRowStyle = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'bold',
    padding: 0,
};

const cardBodyStyle = {
    //borderBottom: 'solid 3px green',
    // borderTop: 'solid 1px green',
    //borderRight: 'solid 3px green',
    //borderLeft: 'solid 3px green',
    // background: 'green',
    // color: 'white',
    paddingBottom: 0,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
};

export default class ShareProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 0
        };

    }
    render() {
        return (
                <div>
                <FacebookShareButton url={baseUrl + this.props.name}
                    title={"Checkout " + this.props.name + " on buildingoncardano.com!"}>
                    <FacebookIcon
                        size={"2.5rem"}
                        round
                    />
                </FacebookShareButton>

                <TwitterShareButton url={baseUrl + this.props.name}
                    title={"Checkout " + this.props.name + " on buildingoncardano.com!"}>
                    <TwitterIcon size={"2.5rem"} round />
                </TwitterShareButton>

                <TelegramShareButton url={baseUrl + this.props.name}
                    title={"Checkout " + this.props.name + " on buildingoncardano.com!"}>
                    <TelegramIcon size={"2.5rem"} round />
                </TelegramShareButton>
            </div >
        )
    };
};

