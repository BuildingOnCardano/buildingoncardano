import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram, faYoutube, faFacebook, faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'utils/stringutil.js';
import Tooltip from "@material-ui/core/Tooltip";

import {
  Col,
  Row,
  } from 'reactstrap';

export default class SocialMedia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            homepage: "",
            twitterHandle: "",
            telegramHandle: "",
            youtubeHandle: "",
            facebookHandle: "",
            discordHandle: "",
            githubLink: ""
        }
    }
    async componentDidMount() {

        //website
        if (!isEmpty(this.props.extendedmeta.homepage)) {
            this.state.homepage = this.props.extendedmeta.homepage;
            this.setState({ homepage: this.props.extendedmeta.homepage });
        }

        //twitter
        if (!isEmpty(this.props.extendedmeta.twitter_handle)) {
            this.state.twitterHandle = this.props.extendedmeta.twitter_handle;
            this.setState({ twitterHandle: this.props.extendedmeta.twitter_handle });
        }

        //telegram
        if (!isEmpty(this.props.extendedmeta.twitter_handle)) {
            this.state.telegramHandle = this.props.extendedmeta.telegram_handle;
            this.setState({ telegramHandle: this.props.extendedmeta.telegram_handle });
        }

        //youtube
        if (!isEmpty(this.props.extendedmeta.youtube_handle)) {
            this.state.youtubeHandle = this.props.extendedmeta.youtube_handle;
            this.setState({ youtubeHandle: this.props.extendedmeta.youtube_handle });
        }

        //facebook
        if (!isEmpty(this.props.extendedmeta.facebook_handle)) {
            this.state.facebookHandle = this.props.extendedmeta.facebook_handle;
            this.setState({ facebookHandle: this.props.extendedmeta.facebook_handle });
        }

        //discord
        if (!isEmpty(this.props.extendedmeta.discord_handle)) {
            this.state.discordHandle = this.props.extendedmeta.discord_handle;
            this.setState({ discordHandle: this.props.extendedmeta.discord_handle });
        }

        //github
        if (!isEmpty(this.props.extendedmeta.githubLink)) {
            this.state.githubLink = this.props.extendedmeta.githubLink;
            this.setState({ githubLink: this.props.extendedmeta.githubLink });
        }
    }

    render() {
        return (
            <div>
            <Row>
               {/* <Col>
            {!isEmpty(this.state.homepage) &&
                <Tooltip
                    title="Website"
                    placement="left"
                >
                    <a href={this.state.homepage} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon size="2x" icon={faGlobe} /></a></Tooltip>
                }
                </Col>
                */}

                {this.state.twitterHandle !== "" &&
                    <Tooltip
                        title="Twitter"
                        placement="left"
                    >
                        <Col><a href={"https://twitter.com/@" + this.state.twitterHandle} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon size="2x" icon={faTwitter} /></a></Col></Tooltip>}

                {this.state.telegramHandle != "" &&
                    <Tooltip
                        title="Telegram"
                        placement="left"
                    >
                       <Col> <a href={"https://t.me/" + this.state.telegramHandle} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon size="2x" icon={faTelegram} /></a></Col></Tooltip>}

                
                {this.state.youtubeHandle != "" &&
                    <Tooltip
                        title="Youtube"
                        placement="left"
                    >
                     <Col>   <a href={"https://www.youtube.com/channel/" + this.state.youtubeHandle} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon size="2x" icon={faYoutube} /></a></Col></Tooltip>}

                {this.state.facebookHandle != "" &&
                    <Tooltip
                        title="Facebook"
                        placement="left"
                    >
                        <Col><a href={"https://www.facebook.com/" + this.state.facebookHandle} target="_blank" rel="noreferrer">
                         <FontAwesomeIcon size="2x" icon={faFacebook} /></a></Col></Tooltip>}
                
                {this.state.discordHandle != "" &&
                    <Tooltip
                        title="Discord"
                        placement="left"
                    >
                    <Col>
                        <a href={"https://discord.com/invite/" + this.state.discordHandle} target="_blank" rel="noreferrer">
                         <FontAwesomeIcon size="2x" icon={faDiscord} /></a></Col></Tooltip>}
                

                
                {this.state.githubLink != "" &&
                    <Tooltip
                        title="Github"
                        placement="left"
                    >
                       <Col> <a href={this.state.githubLink} target="_blank" rel="noreferrer">
                         <FontAwesomeIcon size="2x" icon={faGithub} /></a></Col></Tooltip>}
                    
                </Row>
            </div>
        )
    };
};

