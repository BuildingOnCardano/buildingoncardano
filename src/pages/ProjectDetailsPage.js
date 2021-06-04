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
  CardColumns,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table

} from 'reactstrap';
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import ReactImageFallback from "react-image-fallback";
import SocialMedia from '../components/SocialMedia';
import ShareProject from '../components/ShareProject';
import CardanoImage from 'assets/img/cardanoIcon.png';
import Person from 'assets/img/person.png';
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
                  justifyContent: 'left',
                }}>
                <Col xl={8} lg={12} md={12} sm={6}>
                  <Card>
                    <CardBody>
                    <Row>
                        <Col sm={3}>
                          <ReactImageFallback
                          src={this.state.project.imageUrl}
                          width="140"
                          height="140"
                          fallbackImage={CardanoImage} />
                        </Col>
                        
                        <Col sm={8}>
                        <h1>{this.state.project.name}</h1>
                        <p>{this.state.project.shortDescription}</p>
                        <p><b>Tags: </b>{this.state.project.type}</p>
                        {!isEmpty(this.state.project.stage) && (
                            <div>
                        <p><b>Development Stage: </b>{this.state.project.stage}</p>
                            </div>
                        )}
                        {!isEmpty(this.state.project.releaseDate) && (
                            <div>
                        <p><b>Release Date: </b>{this.state.project.releaseDate}</p>
                            </div>
                        )}
                       </Col>
                    </Row>
                    <hr/>
                      <Row>
                        <Col>
                          <h2>Project Description:</h2>
                          <p>{this.state.project.description}</p>
                          <br></br>
                          {!isEmpty(this.state.project.youTubeEmbedId) && (
                            <YoutubeEmbed embedId={this.state.project.youTubeEmbedId} />)}
                          <br></br>

                        </Col>

                      </Row>
                    </CardBody>

                  </Card>


                <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Col>
                    <Card>
                    <CardHeader>Team Details</CardHeader>
                      <CardBody style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        
                        <Row>
                          {this.state.project.projectTeam.map(function (item, index) {
                            return (
                              <Card body style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                                <ReactImageFallback
                                  src={item.img}
                                  width="100"
                                  height="100"
                                  fallbackImage={Person} />
                                <b>{item.memberName}</b>
                                <p>{item.position}</p>
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                  }}>
                                {item.twitter &&
                                  <a href={item.twitter} target="_blank" rel="noreferrer">
                                      <FontAwesomeIcon icon={faTwitter} />  </a>}
                                {item.linkin &&
                                  <a href={item.linkin} target="_blank" rel="noreferrer">
                                      <FontAwesomeIcon icon={faLinkedin} />  </a>}
                                {item.github &&
                                  <a href={item.github} target="_blank" rel="noreferrer">
                                      <FontAwesomeIcon icon={faGithub} />  </a>}
                                </div>
                            </Card>
                            )
                          })
                          }
                        </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  <Card>
                    <CardHeader>Token Sales</CardHeader>
                    <CardBody>
                      <Row>
                        <Col>

                          {this.state.project.salesDetails != null && this.state.project.salesDetails.length > 0 && this.state.project.salesDetails != undefined &&
                            <div>
                              
                             <CardColumns>
                              {this.state.project.salesDetails.map(function (item, index) {
                                return (
                                
                                <Card>
                                      <CardHeader>{item.saleStatus}</CardHeader>
                                      <CardBody>
                                        <CardTitle><b>Sale Type: </b>{item.upcomingSale}</CardTitle>
                                        <CardText>
                                            <p><b>Start Date: </b>{item.saleStartDate}</p>
                                            <p><b>End Date: </b>{item.saleEndDate}</p>
                                            <p><b>Token Price: </b>{item.saleTokenPrice}</p>
                                            <p><b>Accepted Funding: </b>{item.acceptedFunding}</p>
                                        </CardText>
                                        <hr/>
                                         {!isEmpty(item.tokenDistributionDetail) && (
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Button variant="outline-light"><a href={item.tokenDistributionDetail} target="_blank" rel="noreferrer">Sale Details</a></Button>
                                        </div>
                                        )} 
                                        </CardBody>
                                </Card>
                                )
                              })
                              }
                              </CardColumns>
                              </div>}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                    
                  <Card body style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <p><b>Project Added on </b>{this.state.project.createdDate.split('T')[0]}  |  <b>Last Updated on </b>{this.state.project.updatedDate.split('T')[0]}</p>
                     </Card>
                </Col>

                <Col md={2} sm={6} lg={3} xs={12} className="mb-3">
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Col>
                      <Card style={{
                        alignItems: 'center'
                      }}>

                    < CardHeader style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>Project Links</CardHeader>

                        <CardBody>
                            {!isEmpty(this.state.project.homepage) && (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Button variant="outline-light"><a href={this.state.project.homepage} target="_blank" rel="noreferrer">Website</a></Button>
                                <br/><br/>
                                </div>
                            )}
                            {!isEmpty(this.state.project.whitepaperUrl) && (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Button variant="outline-light"><a href={this.state.project.whitepaperUrl} target="_blank" rel="noreferrer">Whitepaper</a></Button>
                                    <br/><br/>
                                </div>
                            )}

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

                     {!isEmpty(this.state.project.tokenType) &&
                    this.state.project.tokenType != 'No Token' && (
                      <Card>
                      <CardHeader style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      Tokenomics</CardHeader>
                        <CardBody>
                          <Row>
                            <Col>
                              <p><b>Token Type: </b>{this.state.project.tokenType}</p>
                              
                            {!isEmpty(this.state.project.totalSupply) && (
                                <div>
                              <p><b>Total Supply: </b>{this.state.project.totalSupply}</p>
                                </div>
                              )}

                              {!isEmpty(this.state.project.tokenDistributionLink) && (
                                <div>
                              <p><b>Token Distribution Info: </b><a href={this.state.project.tokenDistributionLink} target="_blank" rel="noreferrer">Click Here</a></p>
                                </div>
                              )}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>)}

                    <Card>
                      <CardHeader style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      Share Project</CardHeader>
                      <CardBody style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                        <ShareProject name={this.state.project.name} />
                        </CardBody>
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
