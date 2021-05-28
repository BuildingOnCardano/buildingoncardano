import React from 'react';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import {
    Button
} from 'reactstrap';
export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {


    }

    handleSubmit = event => {
        event.preventDefault();

    };

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
            <div className="ProjectCard" style={{
                minHeight: '25rem'
            }}>
                <br></br>
                {this.props.myprojectspage && (<Link to={{ pathname: '/editproject/'+this.props.projectDetails.name}}>Edit Project</Link>)}
                {this.props.myprojectspage && (<p>Verified: {this.props.projectDetails.verified}</p>)}
                <Link to={{ pathname: '/projectdetails/'+this.props.projectDetails.name, state: { projectDetails: this.props.projectDetails } }}>
                    <div style={{ paddingTop: 10, alignSelf: 'flex-start' }}>
                        <ReactImageFallback
                            src={this.props.img}
                            width="50"
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

