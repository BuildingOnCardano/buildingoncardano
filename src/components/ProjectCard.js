import React from 'react';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import SocialMedia from '../components/SocialMedia';
export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {


    }

                  //   {
                //     "id": 1,
                //     "name": "Poolpeek",
                //     "type": "Application",
                //     "tokenType": "DUNNO",
                //     "ticker": "12345",
                //     "stage": "ISO",
                //     "description": null,
                //     "homepage": null,
                //     "twitterHandle": null,
                //     "telegramHandle": null,
                //     "youtubeHandle": null,
                //     "facebookHandle": null,
                //     "discordHandle": null
                // },

    render() {
        return (
            <div className="ProjectCard" style={{ height: '20rem', width: '25rem' }}>
                <Link to={{ pathname: '/projectdetails', state: { projectDetails: this.props.projectDetails } }}>
                    <div style={{paddingTop: 15, alignSelf: 'flex-start'}}>
                    <ReactImageFallback
                        src={this.props.img}
                        width="40"
                        height="70"
                        fallbackImage={CardanoImage} />
                        
                    <div className="ProjectCard-body">                        
                        <h2>{this.props.projectDetails.name}</h2>
                        <h4>{this.props.projectDetails.description}</h4>
                        <h5>{this.props.projectDetails.type}</h5>
                    </div>
                    </div>
                </Link>
            </div>
        )
    };
};

