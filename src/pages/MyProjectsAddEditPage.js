import Page from 'components/Page';
import MultiAddTeamMembers from 'components/MultiAddTeamMembers';
import MultiAddSales from 'components/MultiAddSales';
import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import {
  baseUrl,
  updateProject,
  getProjectByNameAndOwner,
  createProject,
} from '../assets/services';
import { project } from '../assets/project';
import { Link } from 'react-router-dom';
import { getUser, getPassword, getIsLoggedIn } from 'utils/Common.js';
import { isEmpty } from 'lodash';
import { getLength } from 'utils/stringutil.js';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import ReactMarkdown from 'react-markdown';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { useParams } from 'react-router-dom';
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
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const inputnamewidth = 2;
const inputfieldwidth = 8;

const tagOptions = [
  'Application',
  'Catalyst',
  'Charity',
  'Cloud Storage',
  'Cross-Chain',
  'Data',
  'Dao',
  'Defi',
  'Dex',
  'Forex',
  'Gambling',
  'Gaming',
  'Identity',
  'Infrastructure',
  'Launch Pad',
  'Lending',
  'Meme Coin',
  'Metaverse',
  'NFT',
  'NFT Lending',
  'NFT Marketplace',
  'NFT Platform',
  'Oracle',
  'Payment',
  'Stablecoin',
  'Subscriptions',
  'Telcom',
  'Tooling',
  'Wallet'
];


var selectedListTags = [];

class MyProjectsAddEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.salesDataHandler = this.salesDataHandler.bind(this);

    this.state = {
      loading: true,

      selectedValue: [],
      hasToken: false,

      project: null,

      modal: false,
      errormodal: false,

      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,

      lockProjectName: false,

      longDesc: '',
      selectedTab: 'write',

      loggedIn: null,
    };
  }

  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  async componentDidMount() {
    window.scrollTo(0, 0);

    if (getIsLoggedIn() === 'true') {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }

    //if edit get existing project
    if (this.props.action === 'edit') {
      await this.getProjectDetails();

      this.setState({ lockProjectName: true });
    } else {
      this.setState({ project: project });

      this.setState({ loading: false });
    }
  }

  async getProjectDetails() {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ownerEmail: getUser(),
          user: getUser(),
          password: getPassword(),
        },
      };
      var response = await fetch(
        baseUrl +
        getProjectByNameAndOwner +
        this.props.params.projectname,
        requestOptions,
      );
      const data = await response.json();
      this.setState({ project: data });
      //this.setIncomingStateValues();
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  // setIncomingStateValues() {
  //   var types = this.state.project.type;
  //   if (!isEmpty(types)) {
  //     selectedListTags = null;
  //     var pieces = types.split(' ');
  //     var selectedValue = [];
  //     pieces.forEach(typeInDb => {
  //       if (!isEmpty(typeInDb)) {
  //         var typeFound = tagOptions.filter(item =>
  //           item.name.toLowerCase().includes(typeInDb.toLowerCase()),
  //         );
  //         selectedValue.push(typeFound[0]);
  //       }
  //     });
  //     selectedListTags = selectedValue;
  //   }
  //   var tags = '';
  //   if (selectedListTags != null && selectedListTags.length > 0) {
  //     try {
  //       selectedListTags.forEach(element => {
  //         tags += element.name + ' ';
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   this.setState({ project: { ...this.state.project, type: tags } });
  //   this.setState({ loading: false });
  // }

  async updateProject() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        user: getUser(),
        password: getPassword(),
      },
      body: JSON.stringify(this.state.project),
    };
    var response = await fetch(baseUrl + updateProject, requestOptions);
    var data = await response.json();
    if (data.response == 'updated') {
      this.setState({ modal: true });
    } else {
      this.setState({ errormodal: true });
    }
  }

  async createProject() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', password: getPassword() },
      body: JSON.stringify(this.state.project),
    };
    var response = await fetch(baseUrl + createProject, requestOptions);
    var data = await response.json();
    if (data.response == 'created') {
      this.setState({ modal: true });
      selectedListTags = [];
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {

      this.setState({
        project: { ...this.state.project },
      });


      if (this.props.action === 'edit') {
        this.updateProject();
      } else {
        this.state.project.ownerEmail = getUser()
        // this.setState({ project: { ...this.state.project, ownerEmail: getUser() } });
        this.createProject();
      }
    } catch (error) { }
  };

  onSelect(selectedList, selectedItem) {
    selectedListTags = selectedList;
  }

  onRemove(selectedList, removedItem) {
    selectedListTags = selectedList;
  }

  handler(data) {
    this.setState({ project: { ...this.state.project, projectTeam: data } });
  }

  salesDataHandler(data) {
    this.setState({ project: { ...this.state.project, salesDetails: data } });
  }

  handleValueChange = value => {
    this.setState({ project: { ...this.state.project, description: value } });
  };

  handleTabChange = tab => {
    this.setState({ selectedTab: tab });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            <CircleLoader
              loading={this.state.loading}
              css={override}
              size={100}
            />
          </div>
        ) : (
          <Page
            className="MyProjectsAddEditPage"
            title=""
            breadcrumbs={[{ name: `${this.props.action} Project`, active: true }]}
          >
            {this.state.loggedIn == false && (
              <Modal
                isOpen={true}
                toggle={this.toggle()}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle()}></ModalHeader>

                <ModalBody>
                  <h3>User not logged in.</h3>
                  <Row>
                    <p>
                      To add a project to Building On Cardano you must be
                      registered and logged in.
                    </p>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  {' '}
                  <Link to="/login">
                    <Button color="secondary" onClick={this.toggle()}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button color="secondary" onClick={this.toggle()}>
                      Close
                    </Button>
                  </Link>
                </ModalFooter>
              </Modal>
            )}

            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle()}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle()}></ModalHeader>

              <ModalBody>
                <h3>Success.</h3>
                <Row>
                  {this.props.action === 'edit' ? (
                    <p>Project updated successfully.</p>
                  ) : (
                    <div>
                      <p>
                        Thank you for submitting a project to Building On
                        Cardano.
                      </p>
                      <br></br>
                      <p>
                        We have a short process of verification before a project
                        is displayed.
                      </p>
                    </div>
                  )}
                </Row>
              </ModalBody>
              <ModalFooter>
                {' '}
                <Link to="/myprojects">
                  <Button color="secondary" onClick={this.toggle()}>
                    Close
                  </Button>
                </Link>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={this.state.errormodal}
              toggle={this.toggle()}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle()}></ModalHeader>

              <ModalBody>
                <h3>Failure.</h3>
                <Row>
                  {this.props.action === 'edit' ? (
                    <p>
                      Project didnt update.{' '}
                      <p>
                        If the issue persists please contact:
                        buildingoncardano@gmail.com
                      </p>
                    </p>
                  ) : (
                    <div></div>
                  )}
                </Row>
              </ModalBody>
              <ModalFooter>
                {' '}
                <Link to="/myprojects">
                  <Button color="secondary" onClick={this.toggle()}>
                    Close
                  </Button>
                </Link>
              </ModalFooter>
            </Modal>

            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <Col md={8} lg={8}>
                <Card
                  body
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button onClick={this.handleSubmit}>Submit</Button>
                </Card>
                <Form>
                  <Card body>
                    <h3>Project Info</h3>
                    <br></br>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Name *
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder=""
                          value={this.state.project.name}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                name: e.target.value,
                              },
                            })
                          }
                          disabled={this.state.lockProjectName}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleSelect" sm={inputnamewidth}>
                        Type *
                      </Label>

                      {/* <Multiselect
                          options={tagOptions} // Options to display in the dropdown
                          onSelect={this.onSelect} // Function will trigger on select event
                          onRemove={this.onRemove} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                          selectedValues={selectedListTags}
                          id="name"
                        /> */}
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="select"
                          name="select"
                          id="name"
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                type: e.target.value,
                              },
                            })
                          }
                          value={this.state.project.type}
                        >
                          <option></option>
                          {tagOptions.map((item, index) => (
                            <option>{item}</option>
                          ))}


                        </Input>
                      </Col>

                    </FormGroup>

                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Stage / Status *
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="select"
                          name="select"
                          id="name"
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                stage: e.target.value,
                              },
                            })
                          }
                          value={this.state.project.stage}
                        >
                          <option></option>
                          <option>In Development</option>
                          <option>Testnet</option>
                          <option>Live</option>
                          <option>Rugged</option>
                          <option>Failed</option>
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Website
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="url"
                          name="name"
                          id="name"
                          placeholder="Website Url"
                          value={this.state.project.homepage}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                homepage: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Whitepaper
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="url"
                          name="name"
                          id="name"
                          placeholder="Whitepaper Url"
                          value={this.state.project.whitepaperUrl}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                whitepaperUrl: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Project Logo Url *
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="url"
                          name="name"
                          id="name"
                          placeholder="Add link/Url to project logo"
                          value={this.state.project.imageUrl}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                imageUrl: e.target.value,
                              },
                            })
                          }
                        />
                        <small>Dimensions 250x250px</small>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Project Screenshot Url
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="url"
                          name="name"
                          id="name"
                          placeholder="Add link/Url to project screenshot"
                          value={this.state.project.screenshotUrl}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                screenshotUrl: e.target.value,
                              },
                            })
                          }
                        />
                        <small>Dimensions 400x400px</small>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Youtube presentation
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="ID to video presenation on YouTube E.G KPTA9J6S-pY"
                          value={this.state.project.youTubeEmbedId}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                youTubeEmbedId: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="description" sm={inputnamewidth}>
                        Short Description
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="textarea"
                          name="description"
                          id="description"
                          value={this.state.project.shortDescription}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                shortDescription: e.target.value,
                              },
                            })
                          }
                        />
                        <small>
                          Characters left{' '}
                          {5000 -
                            getLength(this.state.project.shortDescription)}
                        </small>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="description" sm={inputnamewidth}>
                        Long Description
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <ReactMde
                          onChange={this.handleValueChange}
                          value={this.state.project.description}
                          generateMarkdownPreview={markdown =>
                            Promise.resolve(
                              <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                          }
                          selectedTab={this.state.selectedTab}
                          onTabChange={this.handleTabChange}
                        />

                        <small>
                          Characters left{' '}
                          {10000 - getLength(this.state.project.description)}
                        </small>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Release Date
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <TextField
                          id="date"
                          type="date"
                          defaultValue={this.state.project.releaseDate}
                          // className={useStyles().textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                releaseDate: e.target.value,
                              },
                            })
                          }
                          id="name"
                        />
                      </Col>
                    </FormGroup>
                  </Card>

                  <Card body>
                    <h3>Tokenomics</h3>
                    <br></br>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Token Type
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="select"
                          name="select"
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                tokenType: e.target.value,
                              },
                            })
                          }
                          value={this.state.project.tokenType}
                        >
                          <option>No Token</option>
                          <option>Native Asset</option>
                          <option>NFT</option>
                          <option>ERC20</option>
                          <option>BSC</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    {!isEmpty(this.state.project.tokenType) &&
                      this.state.project.tokenType != 'No Token' && (
                        <div>
                          <FormGroup row>
                            <Label for="name" sm={inputnamewidth}>
                              Ticker
                            </Label>
                            <Col sm={inputfieldwidth}>
                              <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="eg ADA"
                                value={this.state.project.ticker}
                                onChange={e =>
                                  this.setState({
                                    project: {
                                      ...this.state.project,
                                      ticker: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Col>
                          </FormGroup>

                          {!isEmpty(this.state.project.tokenType) &&
                            this.state.project.tokenType != 'ERC20' &&
                            this.state.project.tokenType != 'BSC' && (
                              <div>
                                <FormGroup row>
                                  <Label for="name" sm={inputnamewidth}>
                                    Policy ID
                                  </Label>
                                  <Col sm={inputfieldwidth}>
                                    <Input
                                      type="text"
                                      name="name"
                                      id="name"
                                      placeholder="eg d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc"
                                      value={this.state.project.policyID}
                                      onChange={e =>
                                        this.setState({
                                          project: {
                                            ...this.state.project,
                                            policyID: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                              </div>
                            )}

                          <FormGroup row>
                            <Label for="name" sm={inputnamewidth}>
                              Total Supply
                            </Label>
                            <Col sm={inputfieldwidth}>
                              <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder=""
                                value={this.state.project.totalSupply}
                                onChange={e =>
                                  this.setState({
                                    project: {
                                      ...this.state.project,
                                      totalSupply: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Col>
                          </FormGroup>
                          {/*
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Circulating Supply</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.state.project.circulatingSupply}
                              onChange={e => this.setState({ project: { ...this.state.project, circulatingSupply: e.target.value } })} /></Col>
                        </FormGroup>
                        */}
                          <FormGroup row>
                            <Label for="name" sm={inputnamewidth}>
                              Token Distribution Link
                            </Label>
                            <Col sm={inputfieldwidth}>
                              <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Link to Details on Token Distribution"
                                value={this.state.project.tokenDistributionLink}
                                onChange={e =>
                                  this.setState({
                                    project: {
                                      ...this.state.project,
                                      tokenDistributionLink: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Col>
                          </FormGroup>
                        </div>
                      )}
                  </Card>

                  <Card body>
                    <h3>Social Media</h3>
                    <br></br>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Twitter Url
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="https://twitter.com/BuildingOnCardano"
                          value={this.state.project.twitterHandle}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                twitterHandle: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Telegram Chat
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="https://t.me/BuildingOnCardano"
                          value={this.state.project.telegramHandle}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                telegramHandle: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Youtube Channel
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="https://www.youtube.com/channel/channelid"
                          value={this.state.project.youtubeHandle}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                youtubeHandle: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Reddit
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="https://www.reddit.com/r/cardano/"
                          value={this.state.project.redditHandle}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                redditHandle: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Facebook Url
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="https://www.facebook.com/BuildingOnCardano"
                          value={this.state.project.facebookHandle}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                facebookHandle: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Discord Url
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Discord Invite Url"
                          value={this.state.project.discordHandle}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                discordHandle: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Card>

                  <Card body>
                    <h3>Source Code</h3>
                    <br></br>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        Github Link
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder=""
                          value={this.state.project.githubLink}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                githubLink: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>
                        GitLab Link
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder=""
                          value={this.state.project.gitLabLink}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                gitLabLink: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Card>

                  {this.state.project.salesDetails != null &&
                    <Card body>
                      <h3>Upcoming/Past Sale Details</h3>
                      <br />
                      <MultiAddSales
                        sendData={this.salesDataHandler}
                        existingSalesDetails={this.state.project.salesDetails}
                      />
                    </Card>}

                  <Card body>
                    <h3>Team Details</h3>
                    <FormGroup row>
                      <Label for="teamDescription" sm={inputnamewidth}>
                        Team Description
                      </Label>
                      <Col sm={inputfieldwidth}>
                        <Input
                          type="textarea"
                          name="teamDescription"
                          id="teamDescription"
                          value={this.state.project.teamDescription}
                          onChange={e =>
                            this.setState({
                              project: {
                                ...this.state.project,
                                teamDescription: e.target.value,
                              },
                            })
                          }
                        />
                        <small>
                          Characters left{' '}
                          {5000 - getLength(this.state.project.teamDescription)}
                        </small>
                      </Col>
                    </FormGroup>
                    <h3>Team Details</h3>
                    <MultiAddTeamMembers
                      sendData={this.handler}
                      existingTeam={this.state.project.projectTeam}
                    />
                  </Card>

                  <Card
                    body
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button onClick={this.handleSubmit}>Submit</Button>
                  </Card>
                </Form>
              </Col>
            </Row>
          </Page>
        )}
      </div>
    );
  }
}
export default withRouter(MyProjectsAddEditPage);
