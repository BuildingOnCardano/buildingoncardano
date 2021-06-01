import Page from 'components/Page';
import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table
} from 'reactstrap';
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import ReactImageFallback from "react-image-fallback";
import SocialMedia from '../components/SocialMedia';
import ShareProject from '../components/ShareProject';
import CardanoImage from 'assets/img/cardanoIcon.png';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { isEmpty } from 'utils/stringutil.js';
import { baseUrl, getProjectByName } from '../assets/services';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPage4 } from "@fortawesome/free-brands-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ProjectDetailsPage extends React.Component {
  state = {
    loading: true,
    type: "",
    name: "",

    project: null
  };

  componentDidMount() {
    try {
      this.setState({ project: this.props.location.state.projectDetails });
      this.state.project = this.props.location.state.projectDetails;
      this.setState({ loading: false });

    } catch (error) {

    }
    if (isEmpty(this.state.project)) {
      this.getProjectDetails();
    }
  }

  async getProjectDetails() {
    try {
      var response = await fetch(baseUrl + getProjectByName + this.props.match.params.projectname);
      const data = await response.json();
      this.setState({ project: data })
      this.setState({ loading: false });
    } catch (error) {
      console.log(error)
    }
  }



  render() {

    return (
      < div >
        {
          this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
            :
            <Page
              className="ProjectDetailsPage"
              title=""
              breadcrumbs={[{ name: 'Project Details' + ' / ' + this.props.match.params.projectname, active: true }]}
            >

              <Row
                style={{
                  justifyContent: 'center',
                }}>
                <Col md={2} sm={6} lg={3} xs={12} className="mb-3">
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Col>
                      <Card body style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <ReactImageFallback
                          src={this.state.project.imageUrl}
                          width="140"
                          height="140"
                          fallbackImage={CardanoImage} />
                        <br></br>
                        <h2>{this.state.project.name}</h2>
                        <h4>{this.state.project.shortDescription}</h4>
                        <br></br>
                        {!isEmpty(this.state.project.whitepaper) &&
                          (<div style={{ display: 'inline-block' }}>
                            <a href={this.state.project.whitepaper} target="_blank" rel="noreferrer">
                              <FontAwesomeIcon size="2x" icon={faNewspaper} /> White Paper</a><br></br>
                          </div>)}

                        {!isEmpty(this.state.project.releaseDate) &&

                          <h5>Release Date: {this.state.project.releaseDate}</h5>
                        }

                        <br></br>
                        <h5>{this.state.project.type}</h5>



                      </Card>

                      <Card style={{
                        alignItems: 'center'
                      }}>
                        <CardBody>
                          <SocialMedia extendedmeta={{
                            homepage: this.state.project.homepage,
                            twitter_handle: this.state.project.twitterHandle,
                            telegram_handle: this.state.project.telegramHandle,
                            youtube_handle: this.state.project.youtubeHandle,
                            facebook_handle: this.state.project.facebookHandle,
                            githubLink: this.state.project.githubLink,

                          }} />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6} lg={12} md={12} sm={6}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col>
                          <h3>Description:</h3>
                          <h4>{this.state.project.description}</h4>
                          <br></br>
                          {!isEmpty(this.state.project.youTubeEmbedId) && (
                            <YoutubeEmbed embedId={this.state.project.youTubeEmbedId} />)}
                          <br></br>
                          <h3>Development Stage:</h3>
                          <h4>{this.state.project.stage}</h4>
                          <br></br>


                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  {!isEmpty(this.state.project.tokenType) &&
                    this.state.project.tokenType != 'No Token' && (
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              <h3>Tokenomics:</h3>
                              <br></br>
                              <h3>Token:</h3>
                              <h4>{this.state.project.tokenType}</h4>
                              <h3>Total Supply:</h3>
                              <h4>{this.state.project.totalSupply}</h4>
                              <h3>Circulating Supply:</h3>
                              <h4>{this.state.project.circulatingSupply}</h4>
                              <h3>Token Info:</h3>
                              <a href={this.state.project.tokenDistributionLink} target="_blank" rel="noreferrer">
                                <h4>{this.state.project.tokenDistributionLink}</h4></a>
                              <h3>Sales Info:</h3>
                              <a href={this.state.project.saleDetailsLink} target="_blank" rel="noreferrer">
                                <h4>{this.state.project.saleDetailsLink}</h4></a>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>)}
                </Col>
                <Col md={2} sm={6} xs={12} className="mb-3">
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Col>
                      <Card body style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <h4>Share Project</h4>
                        <ShareProject name={this.state.project.name} />
                      </Card>
                      {this.state.project.salesDetails != null &&
                        <Card body style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <h3>Next Token Sale</h3>
                          <h4>Sale Link</h4>
                          <a href={this.state.project.salesDetails[0].saleDetailLink} target="_blank" rel="noreferrer">
                            <h5>{this.state.project.salesDetails[0].saleDetailLink}</h5></a>
                          <h4>Sale Start Date</h4>
                          <h5>{this.state.project.salesDetails[0].saleStartDate}</h5>
                          <h4>Sale End Date</h4>
                          <h5>{this.state.project.salesDetails[0].saleEndDate}</h5>
                        </Card>}


                      <Card body style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <h4>Date Created:</h4>
                        <h5>{this.state.project.createdDate.split('T')[0]}</h5>
                        <h4>Date Updated:</h4>
                        <h5>{this.state.project.updatedDate.split('T')[0]}</h5>
                      </Card>

                    </Col>
                  </Row>
                </Col>
              </Row>
            </Page>
        }
      </div >
    );
  }
}
export default ProjectDetailsPage;
