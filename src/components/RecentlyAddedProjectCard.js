import React from 'react';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
export default class RecentlyAddedProjectCard extends React.Component {

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

    render() {
        return (
            <div className="ProjectCard" style={{
                minHeight: '6rem'
            }}>
                <br></br>
                <Link to={{ pathname: '/projectdetails/' + this.props.projectDetails.name, state: { projectDetails: this.props.projectDetails } }}>
                    <div style={{ alignSelf: 'flex-start' }}>
                        <ReactImageFallback
                            src={this.props.img}
                            width="30"
                            height="30"
                            fallbackImage={CardanoImage} />
                        <div className="ProjectCard-body">
                            <h3>{this.props.projectDetails.name}</h3>
                            {/* <h5>{this.props.projectDetails.type}</h5> */}
                        </div>
                    </div>
                </Link>
            </div>
        )
    };
};

