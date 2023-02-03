import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
export default class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() { }

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div
        className="ProjectCard"
        style={{
          minHeight: '12rem',
        }}
      >
        <br></br>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
            paddingLeft: '10px',
          }}
        >
          {this.props.myprojectspage && (
            <Col>
              <p>
                <b>Approved: </b>
                {this.props.projectDetails.verified}
              </p>
              <p>
                <b>Status: </b>
                {this.props.projectDetails.stage}
              </p>
              <p>
                <b>Type: </b>
                {this.props.projectDetails.type}
              </p>
            </Col>

          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
            paddingLeft: '10px',
          }}
        >
        </div>
        <Link
          to={'/projectdetails/' + this.props.projectDetails.name}
          state={{ projectDetails: this.props.projectDetails }}
        >
          <div style={{ alignSelf: 'flex-start' }}>
            {this.props.projectDetails.imageUrlBase64 != null ?
              <ReactImageFallback
                src={this.props.projectDetails.imageUrlBase64}
                width="50"
                height="70"
                fallbackImage={CardanoImage}
              />
              :
              <ReactImageFallback
                src={this.props.img}
                width="50"
                height="70"
                fallbackImage={CardanoImage}
              />
            }



            <div className="ProjectCard-body">
              <h2>{this.props.projectDetails.name}</h2>
              {/* {!this.props.myprojectspage &&
              <p>{this.props.projectDetails.shortDescription}</p>} */}
              <h5>{this.props.projectDetails.type}</h5>
            </div>
          </div>
        </Link>

        {this.props.myprojectspage && (
          <Row style={{

            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <Link to={'/editproject/' + this.props.projectDetails.name}>
              Edit Project
            </Link>
          </Row>
        )}
      </div>
    );
  }
}
