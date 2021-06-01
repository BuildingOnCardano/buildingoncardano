import Page from 'components/Page';
import MultiAddTeamMembers from 'components/MultiAddTeamMembers';
import MultiAddSales from 'components/MultiAddSales';

import React from 'react';
import {
  Button, Form, FormGroup, Input, Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import { baseUrl, updateProject, getProjectByName, createProject } from '../assets/services';
import { project } from '../assets/project';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { getUser, getPassword } from 'utils/Common.js';
import { isEmpty } from 'lodash';
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
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
  { name: 'Defi', id: 1 },
  { name: 'Application', id: 2 },
  { name: 'Tooling', id: 3 },
  { name: 'Wallet', id: 4 },
  { name: 'Data', id: 5 },
  { name: 'Nft', id: 6 },
  { name: 'Dex', id: 6 },
]

var selectedListTags = [];

class MyProjectsAddEditPage extends React.Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this);
    this.salesDataHandler = this.salesDataHandler.bind(this);

    this.state = {
      loading: true,

      selectedValue: [],
      hasToken: false,

      project: null,

      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false
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

  componentDidMount() {
    window.scrollTo(0, 0);
    //if edit get existing project
    if (this.props.action == 'edit') {
      this.getProjectDetails();
    }
    else {
      this.setState({ project: project });

      this.setState({ loading: false });
    }
  }

  async getProjectDetails() {
    try {
      var response = await fetch(baseUrl + getProjectByName + this.props.match.params.projectname);
      const data = await response.json();
      this.setState({ project: data });
      this.setIncomingStateValues();
    } catch (error) {
      console.log(error)
    }
  }

  setIncomingStateValues() {
    var types = this.state.project.type;
    if (!isEmpty(types)) {
      selectedListTags = null;
      var pieces = types.split(" ");
      var selectedValue = [];
      pieces.forEach(typeInDb => {
        if (!isEmpty(typeInDb)) {
          var typeFound = tagOptions.filter(item => item.name.includes(typeInDb));
          selectedValue.push(typeFound[0]);
        }
      });
      selectedListTags = selectedValue;
    }
    var tags = "";
    selectedListTags.forEach(element => {
      tags += element.name + " ";
    });

    this.setState({ project: { ...this.state.project, type: tags } });
    this.setState({ loading: false });
  }

  async updateProject() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'password': getPassword() },
      body: JSON.stringify(this.state.project)
    };
    var response = await fetch(baseUrl + updateProject, requestOptions);
    var data = await response.json();
    if (data.response == "updated") {
      this.setState({ modal: true });
    }
  }

  async createProject() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'password': getPassword() },
      body: JSON.stringify(
        this.state.project
      )
    };
    var response = await fetch(baseUrl + createProject, requestOptions);
    var data = await response.json();
    if (data.response == "created") {
      this.setState({ modal: true });
      selectedListTags = []
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    var tags = "";
    for (const key in selectedListTags) {
      if (key > 0) {
        tags += " ";
      }
      tags += selectedListTags[key].name;
    }

    this.setState({ project: { ...this.state.project, ownerEmail: getUser() } });
    this.state.project.ownerEmail = getUser();
    this.setState({ project: { ...this.state.project, type: tags } });
    this.state.project.type = tags;

    if (this.props.action == 'edit') {
      this.updateProject();
    }
    else {
      this.createProject();
    }
  };

  onSelect(selectedList, selectedItem) {
    selectedListTags = selectedList;
  }

  onRemove(selectedList, removedItem) {
    selectedListTags = selectedList;
  }


  // getData(data) {
  //   console.log(this.state.project);
  //   this.state.project.projectTeam = data;
  //   //this.setState({ project: { ...this.state.project, projectTeam: data } });
  // }

  handler(data) {
    this.setState({ project: { ...this.state.project, projectTeam: data } });
  }

  salesDataHandler(data) {
    console.log(data);
  }

  render() {

    return (
      <div>
        {
          this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
            :
            <Page
              className="MyProjectsAddEditPage"
              title=""
              breadcrumbs={[{ name: 'Project Edit', active: false }]}
            >

              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle()}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle()}></ModalHeader>
                <ModalBody>
                  <Row>
                    <p>Project updated successfully.</p>
                  </Row>

                </ModalBody>
                <ModalFooter>
                  {' '}
                  <Link to={{ pathname: '/myprojects' }}>
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
                }}>
                <Col md={6} lg={8}>

                  <h2>Edit Project</h2>
                  <Form>
                    <Card body>

                      <h3>Project Info</h3>
                      <br></br>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Name</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="" value={this.state.project.name}
                            onChange={e => this.setState({ project: { ...this.state.project, name: e.target.value } })} /></Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="exampleSelect" sm={inputnamewidth}>Tags</Label>
                        <Col sm={inputfieldwidth}>
                          <Multiselect
                            options={tagOptions} // Options to display in the dropdown                     
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            selectedValues={selectedListTags}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Website</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="url" name="name" id="name" placeholder="Website Url" value={this.state.project.homepage}
                            onChange={e => this.setState({ project: { ...this.state.project, homepage: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Whitepaper</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="url" name="name" id="name" placeholder="Whitepaper Url" value={this.state.project.whitepaperUrl}
                            onChange={e => this.setState({ project: { ...this.state.project, whitepaperUrl: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Project Logo Url</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="url" name="name" id="name" placeholder="Add link/Url to project logo" value={this.state.project.imageUrl}
                            onChange={e => this.setState({ project: { ...this.state.project, imageUrl: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Youtube presentation</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="ID to video presenation on YouTube E.G KPTA9J6S-pY"
                            value={this.state.project.youTubeEmbedId}
                            onChange={e => this.setState({ project: { ...this.state.project, youTubeEmbedId: e.target.value } })} /></Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Ticker</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="" value={this.state.project.ticker}
                            onChange={e => this.setState({ project: { ...this.state.project, ticker: e.target.value } })} /></Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Stage / Status</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="select" name="select" onChange={e => this.setState({ project: { ...this.state.project, stage: e.target.value } })}
                            value={this.state.project.stage}>
                            <option></option>
                            <option>Pre Funding</option>
                            <option>Catalyst</option>
                            <option>Private Sale</option>
                            <option>Presale</option>
                            <option>IEO</option>
                            <option>IDO</option>
                            <option>ISO</option>
                            <option>Live on Exchange</option>
                          </Input></Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="description" sm={inputnamewidth}>Short Description</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="description" id="description" value={this.state.project.shortDescription}
                            onChange={e => this.setState({ project: { ...this.state.project, shortDescription: e.target.value } })} /></Col>
                      </FormGroup>


                      <FormGroup row>
                        <Label for="description" sm={inputnamewidth}>Long Description</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="textarea" name="description" id="description" value={this.state.project.description}
                            onChange={e => this.setState({ project: { ...this.state.project, description: e.target.value } })} /></Col>
                      </FormGroup>


                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Release Date</Label>
                        <Col sm={inputfieldwidth}>
                          <TextField
                            id="date"
                            type="date"
                            defaultValue={this.state.project.releaseDate}
                            // className={useStyles().textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={e => this.setState({ project: { ...this.state.project, releaseDate: e.target.value } })}
                          />
                        </Col>
                      </FormGroup>
                    </Card>

                    <Card body>
                      <h3>Tokenomics</h3>
                      <br></br>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Token Type</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="select" name="select" onChange={e => this.setState({ project: { ...this.state.project, tokenType: e.target.value } })}
                            value={this.state.project.tokenType}>
                            <option>No Token</option>
                            <option>Native Asset</option>
                            <option>ERC20</option>
                            <option>BSC</option>
                          </Input></Col>
                      </FormGroup>
                      {!isEmpty(this.state.project.tokenType) && this.state.project.tokenType != 'No Token' && (<div>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Total Supply</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.state.project.totalSupply}
                              onChange={e => this.setState({ project: { ...this.state.project, totalSupply: e.target.value } })} /></Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Circulating Supply</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.state.project.circulatingSupply}
                              onChange={e => this.setState({ project: { ...this.state.project, circulatingSupply: e.target.value } })} /></Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Token Distribution Link</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.state.project.tokenDistributionLink}
                              onChange={e => this.setState({ project: { ...this.state.project, tokenDistributionLink: e.target.value } })} /></Col>
                        </FormGroup>
                      </div>)}
                    </Card>

                    <Card body>
                      <br></br>
                      <h3>Social Media</h3>
                      <br></br>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Twitter Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="@BuildingOnCardano" value={this.state.project.twitterHandle}
                            onChange={e => this.setState({ project: { ...this.state.project, twitterHandle: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Telegram Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="name of chat" value={this.state.project.telegramHandle}
                            onChange={e => this.setState({ project: { ...this.state.project, telegramHandle: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Youtube Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="channel id" value={this.state.project.youtubeHandle}
                            onChange={e => this.setState({ project: { ...this.state.project, youtubeHandle: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Facebook Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="facebook id" value={this.state.project.facebookHandle}
                            onChange={e => this.setState({ project: { ...this.state.project, facebookHandle: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Discord</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="discord id" value={this.state.project.discordHandle}
                            onChange={e => this.setState({ project: { ...this.state.project, discordHandle: e.target.value } })} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Github Link</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="Github url" value={this.state.project.githubLink}
                            onChange={e => this.setState({ project: { ...this.state.project, githubLink: e.target.value } })} /></Col>
                      </FormGroup>
                    </Card>

                    <Card body>
                      <h3>Sale Details</h3>
                      <MultiAddSales sendData={this.salesDataHandler} existingSalesDetails={this.state.project.salesDetails} />
                    </Card>

                    <Card body>
                      <h3>Team Details</h3>
                      <MultiAddTeamMembers sendData={this.handler} existingTeam={this.state.project.projectTeam} />
                    </Card>


                    <Card body style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Button onClick={this.handleSubmit}>Submit</Button>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Page >}
      </div>
    );
  }
}
export default MyProjectsAddEditPage;
