import Page from 'components/Page';
import React from 'react';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';
import { Card, Col, Row } from 'reactstrap';
import { baseUrl, promotionRequest, createProject } from '../assets/services';
import { getUser, getPassword } from 'utils/Common.js';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import "react-mde/lib/styles/css/react-mde-all.css";


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


const inputnamewidth = 3;
const inputfieldwidth = 7;

var selectedListTags = [];

class PromoteAppPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,

      selectedValue: [],
      name: "",
      email: "",
      projectname: "",
      package: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loading: false });
  }

  async submitPromotion() {
    var requestBody = {name: this.state.name, projectName: this.state.projectname, email: this.state.email, packageType: this.state.package};
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'password': getPassword() },
      body: JSON.stringify(
        requestBody
      )
    };
    var response = await fetch(baseUrl + promotionRequest, requestOptions);
    var data = await response.json();
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.submitPromotion();
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



  handleTabChange = tab => {
    this.setState({ selectedTab: tab });
  };

  render() {

    return (
      <div>
        {
          this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
            :
            <Page
              className="MyProjectsAddEditPage"
              title=""
            // breadcrumbs={[{ name: 'Project Edit', active: false }]}
            >

              <Row
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <h2>Promote your DApp to attract more users</h2>
                <h3>Show off your amazing decentralized application to thousands of crypto investors, thought leaders, blockchain innovators, and technologists.</h3>
                <br></br>
                <br></br>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Col md={5} lg={5} sm={11} xs={11} className="mb-3">
                    <h3>To promote your DApp you can choose between these three packages:</h3>
                    <br></br>
                    <h4><b>Option 1:</b> Homepage, 30 days shared spot (rotating between 10 apps max).</h4>
                    <br></br>
                    <h4><b>Option 2:</b> Homepage, 7 days exclusive spot.</h4>
                    <br></br>
                    <h4><b>Option 3:</b> Homepage, 14 days exclusive spot.</h4>
                    <br></br>
                    <h4><b>Option 4:</b> Homepage, 30 days exclusive spot.</h4>

                    {/* By promoting your DApp you will benefit from an estimated traffic of 110K visits per month (source: SimilarWeb, May 2019). Featured DApps on State of the DApps typically see a CTR (Click Through Rate) between 4 and 11% to your DApp details page. The details page of featured DApps has a CTR of over 55% to your DApp website (and/or social media accounts). Our CTR is very high, compared to the industry average CTR of 1.91% for a search ad, and 0.35% for a display ad.</p> */}
                  </Col>
                  <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                    <Form>
                      <Card body>

                        <h3>Request a promotion</h3>
                        <br></br>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Your Name</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="text" name="name" id="name" placeholder="" value={this.state.name}
                              onChange={e => this.setState({ name: e.target.value })} /></Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Your Email</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="url" name="name" id="name" placeholder="" value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value  })} /></Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Project Name</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="url" name="name" id="name" placeholder="" value={this.state.projectname}
                              onChange={e => this.setState({ projectname: e.target.value })} /></Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="name" sm={inputnamewidth}>Promotion Package</Label>
                          <Col sm={inputfieldwidth}>
                            <Input type="select" name="select" onChange={e => this.setState({ package: e.target.value  })}
                              value={this.state.package}>
                              <option></option>
                              <option>30 Days Shared Homepage Spot</option>
                              <option>7 Days Exclusive Homepage Spot</option>
                              <option>14 Days Exclusive Homepage Spot</option>
                              <option>30 Days Exclusive Homepage Spot</option>
                            </Input></Col>
                        </FormGroup>

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
              </Row>
            </Page >}
      </div>
    );
  }
}
export default PromoteAppPage;
