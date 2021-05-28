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
import { baseUrl, createProject } from '../assets/services';
import { project } from '../assets/project';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { getUser, getPassword } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';

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

var selectedValue = [];



class ProjectAddPage extends React.Component {
  state = {
    loading: false,

    hasToken: false,

    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false
  };

  constructor(props) {
    super(props);
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
  }


  handleSubmit = event => {
    event.preventDefault();

    var tags = "";
    //get tags
    selectedValue.forEach(element => {
      console.log(element.name);
      tags += element.name + " ";
    });

    project.ownerEmail = getUser();
    project.type = tags;

    console.log(project.ownerEmail);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'password': getPassword() },
      body: JSON.stringify(
        project
      )
    };
    fetch(baseUrl + createProject, requestOptions)
      .then(response => response.json());

    console.log("success!");
    this.setState({ modal: true });
  };

  onSelect(selectedList, selectedItem) {
    selectedValue = selectedList;
  }

  onRemove(selectedList, removedItem) {
    selectedValue = selectedList;
  }

  onSelect(selectedList, selectedItem) {
    selectedValue = selectedList;
  }


  render() {
    return (
      <Page
        className="ProjectAddPage"
        title=""
        breadcrumbs={[{ name: 'Project Add', active: true }]}
      >
        <div>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle()}
          // className={this.props.className}
          >
            <ModalHeader toggle={this.toggle()}></ModalHeader>
            <ModalBody>
              <Row>
                <p>Project Submitted successfully.</p>
                <p>We will be reviewing this project for credability and will hope to approve ASAP.</p>
              </Row>

            </ModalBody>
            <ModalFooter>
              {' '}
              <Link to={{ pathname: '/' }}>
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
            <Col md={6} lg={9}>
              <Card body>
                <h3>Submit Project</h3>
                <Form>
                  <br></br>
                  <h4>Info</h4>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Name</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder=""
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
                        //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Website</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="Website Url"
                        onChange={e => (project.homepage = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Whitepaper</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="Whitepaper Url"
                        onChange={e => (project.whitepaperUrl = e.target.value) } /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Project Logo Url</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="Add link/Url to project logo"
                        onChange={e => (project.imageUrl = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Youtube presentation</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="ID to video presenation on YouTube E.G KPTA9J6S-pY"
                        onChange={e => (project.youTubeEmbedId = e.target.value)} /></Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Ticker</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="E.G ADA"
                        onChange={e => (project.ticker = e.target.value)} /></Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleSelect" sm={inputnamewidth}>Stage / Status</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="select" name="select" onChange={e => (project.stage = e.target.value)}>
                        <option></option>
                        <option>Pre Funding</option>
                        <option>Catalyst</option>
                        <option>Private Sale</option>
                        <option>Presale</option>
                        <option>IEO</option>
                        <option>IDO</option>
                        <option>ISO</option>
                        <option>Live on Exchange</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="description" sm={inputnamewidth}>Short Description</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="description" id="description"
                        onChange={e => (project.shortDescription = e.target.value)} /></Col>
                  </FormGroup>


                  <FormGroup row>
                    <Label for="description" sm={inputnamewidth}>Long Description</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="textarea" name="description" id="description"
                        onChange={e => (project.description = e.target.value)} /></Col>
                  </FormGroup>

                  <br></br>
                  <h4>Tokenomics</h4>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Token Type</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="select" name="select" onChange={e => (project.tokenType = e.target.value, this.setState({hasToken: true}))} >
                        <option>No Token</option>
                        <option>Native Asset</option>
                        <option>ERC20</option>
                        <option>BSC</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  {this.state.hasToken == true && (<div>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>Total Supply</Label>
                      <Col sm={inputfieldwidth}>
                        <Input type="text" name="name" id="name" placeholder=""
                          onChange={e => (project.totalSupply = e.target.value)} /></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>Circulating Supply</Label>
                      <Col sm={inputfieldwidth}>
                        <Input type="text" name="name" id="name" placeholder=""
                          onChange={e => (project.circulatingSupply = e.target.value)} /></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="name" sm={inputnamewidth}>Token Distribution Link</Label>
                      <Col sm={inputfieldwidth}>
                        <Input type="text" name="name" id="name" placeholder=""
                          onChange={e => (project.tokenDistributionLink = e.target.value)} /></Col>
                    </FormGroup>
                  </div>)}


                  <br></br>
                  <h4>Sale Details</h4>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Sales Details Link</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder=""
                        onChange={e => (project.saleDetailsLink = e.target.value)} /></Col>
                  </FormGroup>

                  <br></br>
                  <h4>Social Media</h4>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Twitter Handle</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="@BuildingOnCardano"
                        onChange={e => (project.twitterHandle = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Telegram Handle</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="name of chat"
                        onChange={e => (project.telegramHandle = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Youtube Handle</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="channel id"
                        onChange={e => (project.youtubeHandle = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Facebook Handle</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="facebook id"
                        onChange={e => (project.facebookHandle = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Discord</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="discord id"
                        onChange={e => (project.discordHandle = e.target.value)} /></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="name" sm={inputnamewidth}>Github Link</Label>
                    <Col sm={inputfieldwidth}>
                      <Input type="text" name="name" id="name" placeholder="https://github.com"
                        onChange={e => (project.githubLink = e.target.value) } /></Col>
                  </FormGroup>
                  <br></br>

                  <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Page >
    );
  }
}
export default ProjectAddPage;
