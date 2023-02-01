import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
export default class FeaturedProjectCard extends React.Component {
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
          minHeight: '8rem',
        }}
      >
        <br></br>
        <Link
          to={'/projectdetails/' + this.props.projectDetails.name}
          state={{ projectDetails: this.props.projectDetails }}
        >
          <div style={{ alignSelf: 'flex-start' }}>
            <ReactImageFallback
              src={this.props.img}
              width="75"
              height="70"
              fallbackImage={CardanoImage}
            />
            <div className="ProjectCard-body">
              <h2 style={{ color: '#225cb6' }}>
                {this.props.projectDetails.name}
              </h2>
              <h5 style={{ color: '#225cb6' }}>
                {this.props.projectDetails.type}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
