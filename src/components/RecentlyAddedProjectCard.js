import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import CircularImage from 'utils/CircularImage';
import { Media } from 'reactstrap';
export default class RecentlyAddedProjectCard extends React.Component {
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
          minHeight: '4rem',
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
              width="50"
              height="50"
              fallbackImage={CardanoImage}
            />
            <div className="ProjectCard-body">
              <h5 style={{ color: '#225cb6' }}>
                {this.props.projectDetails.name}
              </h5>
              {/* <h5>{this.props.projectDetails.type}</h5> */}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
