import Page from 'components/Page';
import React from 'react';
import {
  Button, Form, FormGroup, Input, Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import { baseUrl, updateProject, getProjectByName } from '../assets/services';
import { project } from '../assets/project';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { getUser, getPassword } from 'utils/Common.js';
import { isEmpty } from 'lodash';
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

class MyProjectEditPage extends React.Component {
  state = {
    loading: true,

    selectedValue: [],
    hasToken: false,

    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false
  };

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
    this.getProjectDetails();
  }

  async getProjectDetails() {
    try {
      var response = await fetch(baseUrl + getProjectByName + this.props.match.params.projectname);
      const data = await response.json();
      console.log(data);
      // this.setState({ project: data })
      this.project = data;
      this.setIncomingStateValues();
      this.setState({ loading: false });
    } catch (error) {
      console.log(error)
    }
  }

  setIncomingStateValues() {
    var types = this.project.type;

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
  }

  handleSubmit = async event => {
    event.preventDefault();

    var tags = "";
    //get tags
    selectedListTags.forEach(element => {
      console.log(element.name);
      tags += element.name + " ";
    });

    this.project.type = tags;
    this.project.ownerEmail = getUser();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'password': getPassword() },
      body: JSON.stringify(this.project)
    };

    var response = await fetch(baseUrl + updateProject, requestOptions);

    var data = await response.json();

    console.log(data.response);
    if (data.response == "updated") {
      this.setState({ modal: true });
      selectedListTags = []
    }

  };

  onSelect(selectedList, selectedItem) {
    selectedListTags = selectedList;
  }

  onRemove(selectedList, removedItem) {
    console.log(selectedList)
    selectedListTags = selectedList;
  }

  render() {
    return (
      <div>
        {
          this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
            :
            <Page
              className="ProjectAddPage"
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
                  <Card body>
                    <h3>Edit Project</h3>
                    <Form>
                      <br></br>
                      <h4>Info</h4>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Name</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="" value={this.project.name}
                            onChange={e => (project.name = e.target.value)} /></Col>
                      </FormGroup>
                      {/* onChange={e => this.s etState({ type: e.target.value })} */}
                      <FormGroup row>
                        <Label for="exampleSelect" sm={inputnamewidth}>Tags</Label>
                        <Col sm={inputfieldwidth}>
                          {/* <Select name="select" id="exampleSelect"
                      placeholder="nft, dex, protocol, cross chain, Wallet, Oracle, Tooling, Infrastructure"
                      onChange={this.handleChange} value={this.state.value} multiple={true} options={tagOptions}> */}

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
                          <Input type="text" name="name" id="name" placeholder="Website Url" value={this.project.homepage}
                            onChange={e => (project.homepage = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Whitepaper</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="Whitepaper Url" value={this.project.whitepaperUrl}
                            onChange={e => (project.whitepaperUrl = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Project Logo Url</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="Add link/Url to project logo" value={this.project.imageUrl}
                            onChange={e => (project.imageUrl = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Youtube presentation</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="ID to video presenation on YouTube E.G KPTA9J6S-pY" value={this.project.youTubeEmbedId}
                            onChange={e => (project.youTubeEmbedId = e.target.value)} /></Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Ticker</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="" value={this.project.ticker}
                            onChange={e => (project.ticker = e.target.value)} /></Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Stage / Status</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="select" name="select" onChange={e => (project.stage = e.target.value)} value={this.project.stage}>
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
                          <Input type="text" name="description" id="description" value={this.project.shortDescription}
                            onChange={e => (project.shortDescription = e.target.value)} /></Col>
                      </FormGroup>


                      <FormGroup row>
                        <Label for="description" sm={inputnamewidth}>Long Description</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="textarea" name="description" id="description" value={this.project.description}
                            onChange={e => (project.description = e.target.value)} /></Col>
                      </FormGroup>

                      <br></br>
                      <h4>Tokenomics</h4>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Token Type</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="select" name="select" onChange={e => (project.tokenType = e.target.value , this.setState({hasToken: true}))} value={this.project.tokenType}>
                            <option>No Token</option>
                            <option>Native Asset</option>
                            <option>ERC20</option>
                            <option>BSC</option>
                          </Input></Col>
                      </FormGroup>
                      {this.state.hasToken == true && (<div>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Total Supply</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.project.totalSupply}
                              onChange={e => (project.totalSupply = e.target.value)} /></Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Circulating Supply</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.project.circulatingSupply}
                              onChange={e => (project.circulatingSupply = e.target.value)} /></Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Token Distribution Link</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.project.tokenDistributionLink}
                              onChange={e => (project.tokenDistributionLink = e.target.value)} /></Col>
                        </FormGroup>
                      </div>)}

                      <br></br>
                      <h4>Sale Details</h4>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Sales Details Link</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="" value={this.project.saleDetailsLink}
                            onChange={e => (project.saleDetailsLink = e.target.value)} /></Col>
                      </FormGroup>

                      <br></br>
                      <h4>Social Media</h4>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Twitter Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="@BuildingOnCardano" value={this.project.twitterHandle}
                            onChange={e => (project.twitterHandle = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Telegram Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="name of chat" value={this.project.telegramHandle}
                            onChange={e => (project.telegramHandle = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Youtube Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="channel id" value={this.project.youtubeHandle}
                            onChange={e => (project.youtubeHandle = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Facebook Handle</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="facebook id" value={this.project.facebookHandle}
                            onChange={e => (project.facebookHandle = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Discord</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="discord id" value={this.project.discordHandle}
                            onChange={e => (project.discordHandle = e.target.value)} /></Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>Github Link</Label>
                        <Col sm={inputfieldwidth}>
                          <Input type="text" name="name" id="name" placeholder="" value={this.project.githubLink}
                            onChange={e => this.project.githubLink = e.target.value} /></Col>
                      </FormGroup>
                      <br></br>




                      <Button onClick={this.handleSubmit}>Update</Button>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Page >}
      </div>
    );
  }
}
export default MyProjectEditPage;
