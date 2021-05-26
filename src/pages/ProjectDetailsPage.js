import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
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
import { getColor } from 'utils/colors';
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import ReactImageFallback from "react-image-fallback";
import SocialMedia from '../components/SocialMedia';
import CardanoImage from 'assets/img/cardanoIcon.png';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { isEmpty } from 'utils/stringutil.js';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ProjectDetailsPage extends React.Component {
  state = {
    loading: false
  };

  componentDidMount() {
    console.log(this.props.location.state.projectDetails)
    console.log(this.state.projectDetails)
  }



  render() {


    return (
      <Page
        className="ProjectDetailsPage"
        title=""
        breadcrumbs={[{ name: 'Project Details / ' + this.props.location.state.projectDetails.type + ' / ' + this.props.location.state.projectDetails.name, active: true }]}
      >
        <Row
          style={{
            height: '100vh',
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
                    src={this.props.location.state.projectDetails.imageUrl}
                    width="140"
                    height="140"
                    fallbackImage={CardanoImage} />
                  <br></br>
                  <h2>{this.props.location.state.projectDetails.name}</h2>
                  <h4>{this.props.location.state.projectDetails.shortDescription}</h4>
                  <h5>{this.props.location.state.projectDetails.type}</h5>
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
                    <h4>{this.props.location.state.projectDetails.description}</h4>
                    <br></br>
                    {!isEmpty(this.props.location.state.projectDetails.youTubeEmbedId) && (
                      <YoutubeEmbed embedId={this.props.location.state.projectDetails.youTubeEmbedId} />)}
                    <br></br>
                    <h3>Development Stage:</h3>
                    <h4>{this.props.location.state.projectDetails.stage}</h4>
                    <br></br>


                  </Col>
                </Row>
              </CardBody>
            </Card>
            {!isEmpty(this.props.location.state.projectDetails.tokenType) && (
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <h3>Tokenomics:</h3>
                      <br></br>
                      <h3>Token:</h3>
                      <h4>{this.props.location.state.projectDetails.tokenType}</h4>
                      <h3>Total Supply:</h3>
                      <h4>{this.props.location.state.projectDetails.totalSupply}</h4>
                      <h3>Circulating Supply:</h3>
                      <h4>{this.props.location.state.projectDetails.circulatingSupply}</h4>
                      <h3>Token Info:</h3>
                      <a href={this.props.location.state.projectDetails.tokenDistributionLink} target="_blank" rel="noreferrer">
                        <h4>{this.props.location.state.projectDetails.tokenDistributionLink}</h4></a>
                      <h3>Sales Info:</h3>
                      <a href={this.props.location.state.projectDetails.saleDetailsLink} target="_blank" rel="noreferrer">
                        <h4>{this.props.location.state.projectDetails.saleDetailsLink}</h4></a>
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
                <Card style={{
                  alignItems: 'center'
                }}>
                  <CardBody>
                    <SocialMedia extendedmeta={{
                      homepage: this.props.location.state.projectDetails.homepage,
                      twitter_handle: this.props.location.state.projectDetails.twitterHandle,
                      telegram_handle: this.props.location.state.projectDetails.telegramHandle,
                      youtube_handle: this.props.location.state.projectDetails.youtubeHandle,
                      facebook_handle: this.props.location.state.projectDetails.facebookHandle,
                      githubLink: this.props.location.state.projectDetails.githubLink,

                    }} />
                  </CardBody>
                </Card>
                <Card body style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <h4>Date Created:</h4>                  
                  <h5>{this.props.location.state.projectDetails.createdDate.split('T')[0]}</h5>
                  <h4>Date Updated:</h4>
                  <h5>{this.props.location.state.projectDetails.updatedDate.split('T')[0]}</h5>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default ProjectDetailsPage;
