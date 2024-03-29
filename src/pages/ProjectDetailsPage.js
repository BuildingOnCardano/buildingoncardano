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
  Table,
} from 'reactstrap';
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import ReactImageFallback from 'react-image-fallback';
import SocialMedia from '../components/SocialMedia';
import ShareProject from '../components/ShareProject';
import CardanoImage from 'assets/img/cardanoIcon.png';
import Person from 'assets/img/person.png';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { isEmpty } from 'utils/stringutil.js';
import {
  baseUrl,
  getProjectByName,
  getProjectTokens,
} from '../assets/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPage4 } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import SimilarProjectCard from 'components/SimilarProjectCard';
import ReactMarkdown from 'react-markdown';
import {
  TwitterTimelineEmbed,
} from 'react-twitter-embed';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ModalImage from "react-modal-image";
import ImageComponent from 'components/ImageComponent';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

/* This is a higher order component that
 *  inject a special prop   to our component.
 */
function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class ProjectDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      type: '',
      name: '',
      project: null,
      projecttokens: null,
      projectname: '',
      verifiedProject: null,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    console.log('props = ' + this.props.params);
    this.setState({ projectname: this.props.params.projectname });
    this.state.projectname = this.props.params.projectname;


    if (this.state.project === null) {
      await this.getProjectDetails();
    }

  }

  async componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
    if (this.props.params.projectname !== prevProps.params.projectname) {
      this.setState({ projectname: this.props.params.projectname });
      this.state.projectname = this.props.params.projectname;
      await this.getProjectDetails();
      this.getTokenDetails();
    }
  }

  async getProjectDetails() {
    try {
      if (!isEmpty(this.state.projectname)) {
        this.setState({ projectname: this.props.params.projectname });
        var response = await fetch(
          baseUrl + getProjectByName + this.state.projectname,
        );
        const data = await response.json();
        this.state.project = data;
        this.setState({ project: data });

        this.setState({ verifiedProject: data.verified });

        try {
          this.setState({ projectname: this.props.params.projectname });
          var tokenresponse = await fetch(
            baseUrl + getProjectTokens + this.state.projectname,
          );
          const tokendata = await tokenresponse.json();
          this.setState({ projecttokens: tokendata });
        } catch (error) { }

        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTokenDetails() {
    try {
      if (!isEmpty(this.state.projectname)) {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getTwitterName() {
    var name = this.state.project.twitterHandle.replace(
      'https://twitter.com/',
      '',
    );
    return name;
  }

  render() {
    const markdown =
      '## Some markdown text in multiple paragraphs\n\nAnd this is a paragraph 1\n\nAnd this is a paragraph 2\n\nAnd this is a paragraph 3';

    return (
      <div>
        {this.state.loading ? (
          <div>
            <CircleLoader
              loading={this.state.loading}
              css={override}
              size={180}
            />
          </div>
        ) : (
          <Page
            className="ProjectDetailsPage"
            title=""
          // breadcrumbs={[{ name: 'Project Details' + ' / ' + this.props.params.projectname, active: true }]}

          >
            {this.state.verifiedProject == 'false' ? (
              <div>
                <h1
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  This project has not been verified.
                </h1>
              </div>
            ) : (
              <div>
                <Row
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  <Col xl={9} lg={12} md={9} sm={6}>
                    <Card>
                      <CardBody>
                        {this.state.project.screenshotUrl != null ? (
                          <Row>
                            <Col sm={6}>
                              {this.state.project.screenshotUrlBase64 != null ?


                                <ModalImage
                                  small={this.state.project.screenshotUrlBase64}
                                  large={this.state.project.screenshotUrlBase64}
                                  alt={CardanoImage}
                                  name="Test"
                                />
                                :
                                <ModalImage
                                  small={this.state.project.screenshotUrl}
                                  large={this.state.project.screenshotUrl}
                                  alt={CardanoImage}
                                  name="Test"
                                />
                              }
                            </Col>

                            <Col sm={6}>
                              <Col>
                                <Row>
                                  {this.state.project.imageUrlBase64 != null ?
                                    <ReactImageFallback
                                      src={this.state.project.imageUrlBase64}
                                      width="50"
                                      height="50"
                                      fallbackImage={CardanoImage}
                                    />
                                    :
                                    <ReactImageFallback
                                      src={this.state.project.imageUrl}
                                      width="50"
                                      height="50"
                                      fallbackImage={CardanoImage}
                                    />
                                  }

                                  <h1>{this.state.project.name}</h1>
                                </Row>
                              </Col>
                              <Col>
                                <p>{this.state.project.shortDescription}</p>
                                <p>
                                  <b>Tags: </b>
                                  {this.state.project.type}
                                </p>
                                {!isEmpty(this.state.project.stage) && (
                                  <div>
                                    <p>
                                      <b>Status: </b>
                                      {this.state.project.stage}
                                    </p>
                                  </div>
                                )}
                                {!isEmpty(this.state.project.releaseDate) && (
                                  <div>
                                    <p>
                                      <b>Release Date: </b>
                                      {this.state.project.releaseDate}
                                    </p>
                                  </div>
                                )}
                              </Col>
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col sm={6}>
                              <ReactImageFallback
                                src={this.state.project.imageUrl}
                                width="100%"
                                height="100%"
                                fallbackImage={CardanoImage}
                              />
                            </Col>

                            <Col sm={6}>
                              <Col>
                                <h1>{this.state.project.name}</h1>
                                <p>{this.state.project.shortDescription}</p>
                                <p>
                                  <b>Tags: </b>
                                  {this.state.project.type}
                                </p>
                                {!isEmpty(this.state.project.stage) && (
                                  <div>
                                    <p>
                                      <b>Status: </b>
                                      {this.state.project.stage}
                                    </p>
                                  </div>
                                )}
                                {!isEmpty(this.state.project.releaseDate) && (
                                  <div>
                                    <p>
                                      <b>Release Date: </b>
                                      {this.state.project.releaseDate}
                                    </p>
                                  </div>
                                )}
                              </Col>
                            </Col>
                          </Row>
                        )}
                        <hr />
                        <Row>
                          <Col>
                            {!isEmpty(this.state.project.description) && (
                              <div>
                                <h2>Project Description:</h2>
                                <ReactMarkdown>
                                  {this.state.project.description}
                                </ReactMarkdown>
                                <br></br>
                              </div>
                            )}
                            {!isEmpty(this.state.project.youTubeEmbedId) && (
                              <YoutubeEmbed
                                embedId={this.state.project.youTubeEmbedId}
                              />
                            )}
                            <br></br>
                            {!isEmpty(this.state.project.teamDescription) && (
                              <div>
                                <h2>Team Description:</h2>
                                <ReactMarkdown>
                                  {this.state.project.teamDescription}
                                </ReactMarkdown>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

                    {this.state.project.projectTeam != null &&
                      this.state.project.projectTeam.length != 0 && (
                        <Row
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Col>
                            <Card>
                              <CardHeader
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '100%',
                                  borderRadius: '1.9em',
                                }}
                              >
                                Team Details
                              </CardHeader>
                              <CardBody
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Row>
                                  {this.state.project.projectTeam.map(function (
                                    item,
                                    index,
                                  ) {
                                    return (
                                      <Card
                                        body
                                        style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          maxWidth: '12rem',
                                          boxShadow: 'none',
                                          margin: '14px',
                                          backgroundColor: '#f8f9fa',
                                        }}
                                      >
                                        <ReactImageFallback
                                          src={item.img}
                                          width="100"
                                          height="100"
                                          fallbackImage={Person}
                                        />
                                        <b>{item.memberName}</b>
                                        <p>{item.position}</p>
                                        <div
                                          style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                          }}
                                        >
                                          {item.twitter && (
                                            <a
                                              href={item.twitter}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              <FontAwesomeIcon
                                                icon={faTwitter}
                                              />{' '}
                                            </a>
                                          )}
                                          {item.linkin && (
                                            <a
                                              href={item.linkin}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              <FontAwesomeIcon
                                                icon={faLinkedin}
                                              />{' '}
                                            </a>
                                          )}
                                          {item.github && (
                                            <a
                                              href={item.github}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              <FontAwesomeIcon
                                                icon={faGithub}
                                              />{' '}
                                            </a>
                                          )}
                                        </div>
                                      </Card>
                                    );
                                  })}
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      )}

                    {this.state.project.salesDetails != null &&
                      this.state.project.salesDetails.length > 0 &&
                      this.state.project.salesDetails != undefined && (
                        <Card>
                          <CardHeader
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            Token Sales
                          </CardHeader>
                          <CardBody>
                            <Row>
                              <Col>
                                <div>
                                  <CardColumns>
                                    {this.state.project.salesDetails.map(
                                      function (item, index) {
                                        return (
                                          <Card
                                            body
                                            style={{
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              boxShadow: 'none',
                                              backgroundColor: '#f8f9fa',
                                            }}
                                          >
                                            <CardHeader
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                borderRadius: '0em',
                                              }}
                                            >
                                              {item.saleStatus}
                                            </CardHeader>
                                            <CardBody>
                                              <CardTitle>
                                                <b>Sale Type: </b>
                                                {item.upcomingSale}
                                              </CardTitle>
                                              <CardText>
                                                <p>
                                                  <b>Start Date: </b>
                                                  {item.saleStartDate}
                                                </p>
                                                <p>
                                                  <b>End Date: </b>
                                                  {item.saleEndDate}
                                                </p>
                                                <p>
                                                  <b>Token Price: </b>
                                                  {item.saleTokenPrice}
                                                </p>
                                                <p>
                                                  <b>Accepted Funding: </b>
                                                  {item.acceptedFunding}
                                                </p>
                                              </CardText>
                                              <hr />
                                              {!isEmpty(
                                                item.tokenDistributionDetail,
                                              ) && (
                                                  <div
                                                    style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                    }}
                                                  >
                                                    <Button variant="outline-light">
                                                      <a
                                                        href={
                                                          item.tokenDistributionDetail
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                      >
                                                        Sale Details
                                                      </a>
                                                    </Button>
                                                  </div>
                                                )}
                                            </CardBody>
                                          </Card>
                                        );
                                      },
                                    )}
                                  </CardColumns>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      )}
                  </Col>

                  <Col md={3} sm={6} lg={2} xs={12} className="mb-3">
                    <Row
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Col>
                        <Card
                          style={{
                            alignItems: 'center',
                          }}
                        >
                          <CardHeader
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              borderRadius: '1.9em',
                            }}
                          >
                            Project Links
                          </CardHeader>

                          <CardBody>
                            {!isEmpty(this.state.project.homepage) && (
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Button variant="outline-light">
                                  <a
                                    href={this.state.project.homepage}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Website
                                  </a>
                                </Button>
                                <br />
                                <br />
                              </div>
                            )}
                            {!isEmpty(this.state.project.whitepaperUrl) && (
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Button variant="outline-light">
                                  <a
                                    href={this.state.project.whitepaperUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Whitepaper
                                  </a>
                                </Button>
                                <br />
                                <br />
                              </div>
                            )}

                            <SocialMedia
                              extendedmeta={{
                                homepage: this.state.project.homepage,
                                twitter_handle:
                                  this.state.project.twitterHandle,
                                telegram_handle:
                                  this.state.project.telegramHandle,
                                youtube_handle:
                                  this.state.project.youtubeHandle,
                                facebook_handle:
                                  this.state.project.facebookHandle,
                                githubLink: this.state.project.githubLink,
                                redditHandle: this.state.project.redditHandle,
                                gitLabLink: this.state.project.gitLabLink,
                                discord_handle:
                                  this.state.project.discordHandle,
                              }}
                            />
                          </CardBody>
                        </Card>

                        {!isEmpty(this.state.projecttokens) &&
                          this.state.project.tokenType != 'No Token' && (
                            <Card>
                              <CardHeader
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '100%',
                                  borderRadius: '1.9em',
                                }}
                              >
                                Tokenomics
                              </CardHeader>
                              <CardBody>
                                <Row>
                                  <Col>
                                    <p>
                                      <b>Type: </b>
                                      {this.state.project.tokenType}
                                    </p>
                                    {!isEmpty(
                                      this.state.projecttokens.asset_name,
                                    ) && (
                                        <div>
                                          <p>
                                            <b>Name: </b>
                                            {this.state.projecttokens.asset_name}
                                          </p>
                                        </div>
                                      )}
                                    {!isEmpty(
                                      this.state.projecttokens.total_supply,
                                    ) && (
                                        <div>
                                          <p>
                                            <b>Supply: </b>
                                            {
                                              this.state.projecttokens
                                                .total_supply
                                            }
                                          </p>
                                        </div>
                                      )}
                                    {!isEmpty(
                                      this.state.projecttokens.policy_id,
                                    ) && (
                                        <div>
                                          <p>
                                            <b>Policy ID: </b>
                                            {this.state.projecttokens.policy_id}
                                          </p>
                                        </div>
                                      )}
                                    {!isEmpty(
                                      this.state.projecttokens.total_wallets,
                                    ) && (
                                        <div>
                                          <p>
                                            <b>Wallets: </b>
                                            {
                                              this.state.projecttokens
                                                .total_wallets
                                            }
                                          </p>
                                        </div>
                                      )}
                                    {!isEmpty(
                                      this.state.projecttokens
                                        .total_transactions,
                                    ) && (
                                        <div>
                                          <p>
                                            <b>Transactions: </b>
                                            {
                                              this.state.projecttokens
                                                .total_transactions
                                            }
                                          </p>
                                        </div>
                                      )}

                                    {!isEmpty(
                                      this.state.project.tokenDistributionLink,
                                    ) && (
                                        <div>
                                          <p>
                                            <b>Distribution Info: </b>
                                            <a
                                              href={
                                                this.state.project
                                                  .tokenDistributionLink
                                              }
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              Click Here
                                            </a>
                                          </p>
                                        </div>
                                      )}
                                  </Col>
                                </Row>
                                <small>
                                  Token Details provided by{' '}
                                  <a
                                    href="https://www.koios.rest/"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Koios
                                  </a>
                                </small>
                              </CardBody>
                            </Card>
                          )}

                        <Card>
                          <CardHeader
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              borderRadius: 'none',
                            }}
                          >
                            Share Project
                          </CardHeader>
                          <CardBody
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}
                          >
                            <ShareProject name={this.state.project.name} />
                          </CardBody>
                        </Card>

                        {!isEmpty(this.state.project.twitterHandle) && (
                          <Card>
                            <CardHeader
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                borderRadius: 'none',
                              }}
                            >
                              Twitter Feed
                            </CardHeader>
                            <CardBody
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}
                            >
                              <TwitterTimelineEmbed
                                sourceType="profile"
                                screenName={this.getTwitterName()}
                                options={{ height: 400 }}
                              />
                            </CardBody>
                          </Card>
                        )}
                        <Card
                          style={{
                            alignItems: 'center',
                          }}
                        >
                          <CardHeader
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              borderRadius: '1.9em',
                            }}
                          >
                            Promote App
                          </CardHeader>

                          <CardBody>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Link to={'/promote'}>
                                <Button variant="outline-light">
                                  Promote App
                                </Button>
                              </Link>
                              <br />
                              <br />
                            </div>
                          </CardBody>
                        </Card>

                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {this.state.project.relatedProjects != null &&
                      this.state.project.relatedProjects.length > 0 && (
                        <Card>
                          <CardHeader
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              borderRadius: '1.9em',
                              marginBottom: 10,
                            }}
                          >
                            Similar Projects
                          </CardHeader>
                          <Row>
                            {this.state.project.relatedProjects.map(function (
                              relatedProject,
                              index,
                            ) {
                              return (
                                <Col
                                  lg={3}
                                  md={6}
                                  sm={2}
                                  xs={1}
                                  className="mb-3"
                                >
                                  <SimilarProjectCard
                                    img={relatedProject.imageUrl}
                                    projectDetails={relatedProject}
                                    myprojectspage={false}
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </Card>
                      )}
                    <Card
                      body
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'none',
                      }}
                    >
                      <p>
                        <b>Project Added on </b>
                        {this.state.project.createdDate.split('T')[0]} |{' '}
                        <b>Last Updated on </b>
                        {this.state.project.updatedDate.split('T')[0]}
                      </p>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Page>
        )}
      </div>
    );
  }
}
export default withRouter(ProjectDetailsPage);
