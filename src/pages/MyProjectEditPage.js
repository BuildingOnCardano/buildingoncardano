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
import { baseUrl, updateProject } from '../assets/services';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { getUser, getPassword } from 'utils/Common.js';
import { isEmpty } from 'lodash';


const inputnamewidth = 2;
const inputfieldwidth = 8;

const tagOptions = [
  { name: 'Defi', id: 1 },
  { name: 'Application', id: 2 },
  { name: 'Tooling', id: 3 },
  { name: 'Wallet', id: 4 },
  { name: 'Data', id: 5 },
  { name: 'Nft', id: 6 },
]

var selectedListTags = [];

class MyProjectEditPage extends React.Component {
  state = {
    loading: false,

    name: "",
    type: "",
    selectedValue: [],
    ticker: "",
    stage: "",
    description: null,
    shortDescription: null,
    homepage: null,
    whitepaperUrl: null,

    twitterHandle: null,
    telegramHandle: null,
    youtubeHandle: null,
    facebookHandle: null,
    discordHandle: null,
    youTubeEmbedId: null,

    imageUrl: null,

    tokenType: null,
    totalSupply: null,
    circulatingSupply: null,
    tokenDistributionLink: null,

    saleDetailsLink: null,

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

    console.log(this.props.location.state.projectDetails);
    this.setIncomingStateValues();
  }

  setIncomingStateValues() {
    this.setState({ id: this.props.location.state.projectDetails.id });
    this.setState({ name: this.props.location.state.projectDetails.name });
    this.setState({ type: this.props.location.state.projectDetails.type });
    this.setState({ ticker: this.props.location.state.projectDetails.ticker });
    this.setState({ stage: this.props.location.state.projectDetails.stage });
    this.setState({ description: this.props.location.state.projectDetails.description });
    this.setState({ shortDescription: this.props.location.state.projectDetails.shortDescription });
    this.setState({ homepage: this.props.location.state.projectDetails.homepage });
    this.setState({ whitepaperUrl: this.props.location.state.projectDetails.whitepaperUrl });
    this.setState({ twitterHandle: this.props.location.state.projectDetails.twitterHandle });
    this.setState({ telegramHandle: this.props.location.state.projectDetails.telegramHandle });
    this.setState({ youtubeHandle: this.props.location.state.projectDetails.youtubeHandle });
    this.setState({ facebookHandle: this.props.location.state.projectDetails.facebookHandle });
    this.setState({ discordHandle: this.props.location.state.projectDetails.discordHandle });
    this.setState({ youTubeEmbedId: this.props.location.state.projectDetails.youTubeEmbedId });
    this.setState({ imageUrl: this.props.location.state.projectDetails.imageUrl });
    this.setState({ tokenType: this.props.location.state.projectDetails.tokenType });
    this.setState({ totalSupply: this.props.location.state.projectDetails.totalSupply });
    this.setState({ circulatingSupply: this.props.location.state.projectDetails.circulatingSupply });
    this.setState({ tokenDistributionLink: this.props.location.state.projectDetails.tokenDistributionLink });
    this.setState({ saleDetailsLink: this.props.location.state.projectDetails.saleDetailsLink });

    var types = this.props.location.state.projectDetails.type;

    if (!isEmpty(types)) {
      selectedListTags = null;
      var pieces = types.split(" ");

      var selectedValue = [];
      pieces.forEach(typeInDb => {
        if(!isEmpty(typeInDb)){
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

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'password': getPassword() },
      body: JSON.stringify({
        id: this.state.id,

        name: this.state.name,
        type: tags,
        imageUrl: this.state.imageUrl,
        homepage: this.state.homepage,
        whitepaperUrl: this.state.whitepaperUrl,

        ticker: this.state.ticker,
        stage: this.state.stage,
        description: this.state.description,
        shortDescription: this.state.shortDescription,

        twitterHandle: this.state.twitterHandle,
        telegramHandle: this.state.telegramHandle,
        youtubeHandle: this.state.youtubeHandle,
        facebookHandle: this.state.facebookHandle,
        discordHandle: this.state.discordHandle,

        youTubeEmbedId: this.state.youTubeEmbedId,

        tokenType: this.state.tokenType,
        totalSupply: this.state.totalSupply,
        circulatingSupply: this.state.circulatingSupply,
        tokenDistributionLink: this.state.tokenDistributionLink,

        saleDetailsLink: this.state.saleDetailsLink,

        ownerEmail: getUser()
      })
    };

    var response = await fetch(baseUrl + updateProject, requestOptions);

    var data = await response.json();

    console.log(data.response);
    if (data.response == "created") {
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
      <Page
        className="ProjectAddPage"
        title="Project Edit"
        breadcrumbs={[{ name: 'Project Edit', active: true }]}
      >

        {/* https://reactstrap.github.io/components/form/?email=&password=&select=1&text=&file= */}

        {/* {
        "id": 1,
        "name": "Poolpeek",
        "type": "Application",
        "tokenType": "DUNNO",
        "ticker": "12345",
        "stage": "ISO",
        "description": null,
        "homepage": null,
        "twitterHandle": null,
        "telegramHandle": null,
        "youtubeHandle": null,
        "facebookHandle": null,
        "discordHandle": null
    }, */}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle()}
        // className={this.props.className}
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
            height: '100vh',
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
                    <Input type="text" name="name" id="name" placeholder="" value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })} /></Col>
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
                    <Input type="text" name="name" id="name" placeholder="Website Url" value={this.state.homepage}
                      onChange={e => this.setState({ homepage: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Whitepaper</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="Whitepaper Url" value={this.state.whitepaperUrl}
                      onChange={e => this.setState({ whitepaperUrl: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Project Logo Url</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="Add link/Url to project logo" value={this.state.imageUrl}
                      onChange={e => this.setState({ imageUrl: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Youtube presentation</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="ID to video presenation on YouTube E.G KPTA9J6S-pY" value={this.state.youTubeEmbedId}
                      onChange={e => this.setState({ youTubeEmbedId: e.target.value })} /></Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Ticker</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="" value={this.state.ticker}
                      onChange={e => this.setState({ ticker: e.target.value })} /></Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Stage / Status</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="E.G Pre Funding, Catalyst, Private Sale, Presale, IEO, IDO, ISO, Live on Exchange" value={this.state.stage}
                      onChange={e => this.setState({ stage: e.target.value })} /></Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="description" sm={inputnamewidth}>Short Description</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="description" id="description" value={this.state.shortDescription}
                      onChange={e => this.setState({ shortDescription: e.target.value })} /></Col>
                </FormGroup>


                <FormGroup row>
                  <Label for="description" sm={inputnamewidth}>Long Description</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="textarea" name="description" id="description" value={this.state.description}
                      onChange={e => this.setState({ description: e.target.value })} /></Col>
                </FormGroup>

                <br></br>
                <h4>Tokenomics</h4>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Token Type</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="Native Asset, ERC20, BSC, No Token" value={this.state.tokenType}
                      onChange={e => this.setState({ tokenType: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Total Supply</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="" value={this.state.totalSupply}
                      onChange={e => this.setState({ totalSupply: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Circulating Supply</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="" value={this.state.circulatingSupply}
                      onChange={e => this.setState({ circulatingSupply: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Token Distribution Link</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="" value={this.state.tokenDistributionLink}
                      onChange={e => this.setState({ tokenDistributionLink: e.target.value })} /></Col>
                </FormGroup>

                <br></br>
                <h4>Sale Details</h4>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Sales Details Link</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="" value={this.state.saleDetailsLink}
                      onChange={e => this.setState({ saleDetailsLink: e.target.value })} /></Col>
                </FormGroup>

                <br></br>
                <h4>Social Media</h4>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Twitter Handle</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="@BuildingOnCardano" value={this.state.twitterHandle}
                      onChange={e => this.setState({ twitterHandle: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Telegram Handle</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="name of chat" value={this.state.twitterHandle}
                      onChange={e => this.setState({ twitterHandle: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Youtube Handle</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="channel id" value={this.state.youtubeHandle}
                      onChange={e => this.setState({ youtubeHandle: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Facebook Handle</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="facebook id" value={this.state.facebookHandle}
                      onChange={e => this.setState({ facebookHandle: e.target.value })} /></Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={inputnamewidth}>Discord</Label>
                  <Col sm={inputfieldwidth}>
                    <Input type="text" name="name" id="name" placeholder="discord id" value={this.state.discordHandle}
                      onChange={e => this.setState({ discordHandle: e.target.value })} /></Col>
                </FormGroup>
                <br></br>




                <Button onClick={this.handleSubmit}>Update</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Page >
    );
  }
}
export default MyProjectEditPage;
