import Page from 'components/Page';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {
  Card,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl, promotionRequest, createProject } from '../assets/services';
import { getUser, getPassword } from 'utils/Common.js';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles } from '@mui/styles';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { isEmpty } from 'lodash';
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

const inputnamewidth = 3;
const inputfieldwidth = 7;

var selectedListTags = [];

class PromoteAppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      selectedValue: [],
      name: '',
      email: '',
      projectname: '',
      package: '',

      showMandatory: false,

      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loading: false });
  }

  async submitPromotion() {
    var requestBody = {
      name: this.state.name,
      projectName: this.state.projectname,
      email: this.state.email,
      packageType: this.state.package,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', password: getPassword() },
      body: JSON.stringify(requestBody),
    };
    var response = await fetch(baseUrl + promotionRequest, requestOptions);
    var data = await response.json();
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (
      !isEmpty(this.state.name) &&
      !isEmpty(this.state.email) &&
      !isEmpty(this.state.projectname) &&
      !isEmpty(this.state.package)
    ) {
      this.setState({ modal: true });
      this.submitPromotion();
    }
    {
      this.setState({ showMandatory: true });
    }
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
          // breadcrumbs={[{ name: 'Project Edit', active: false }]}
          >
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle()}
              className={this.props.params.className}
            >
              <ModalHeader toggle={this.toggle()}></ModalHeader>

              <ModalBody>
                <h3>Success.</h3>
                <Row>
                  <div>
                    <p>
                      Thank you for submitting a promotion requestto Building On
                      Cardano.
                    </p>
                    <br></br>
                    <p>We will be intouch soon.</p>
                  </div>
                </Row>
              </ModalBody>
              <ModalFooter>
                {' '}
                <Link to="/">
                  <Button color="secondary" onClick={this.toggle()}>
                    Close
                  </Button>
                </Link>
              </ModalFooter>
            </Modal>

            <Col md={12} lg={12} sm={11} xs={11} className="mb-3">
<br></br>
              <Row style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Col md={3} lg={3} sm={11} xs={11} className="mb-3">
                  <Form>
                    <Card body >
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <h2>Package 1</h2>
                      </Row>
                        <Row>
                          <Col md={12} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Duration</h3>
                          </Col>
                          <Col md={12} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>30 Days</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Benefit</h3>
                          </Col>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Homepage Featured Spot</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Price</h3>
                          </Col>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>300₳</h3>
                          </Col>
                        </Row>
                    </Card>
                  </Form>
                </Col>
                <Col md={3} lg={3} sm={11} xs={11} className="mb-3">
                  <Form>
                  <Card body >
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <h2>Package 2</h2>
                      </Row>
                        <Row>
                          <Col md={12} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Duration</h3>
                          </Col>
                          <Col md={12} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>45 Days</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Benefit</h3>
                          </Col>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Homepage Featured Spot</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Price</h3>
                          </Col>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>400₳</h3>
                          </Col>
                        </Row>
                    </Card>
                  </Form>
                </Col>
                <Col md={3} lg={3} sm={11} xs={11} className="mb-3">
                  <Form>
                  <Card body >
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <h2>Package 3</h2>
                      </Row>
                        <Row>
                          <Col md={12} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Duration</h3>
                          </Col>
                          <Col md={12} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>60 Days</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Benefit</h3>
                          </Col>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Homepage Featured Spot</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>Price</h3>
                          </Col>
                          <Col md={5} lg={6} sm={11} xs={11} className="mb-3">
                            <h3>600₳</h3>
                          </Col>
                        </Row>
                    </Card>
                  </Form>
                </Col>
              </Row>


              <Row style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Col md={8} lg={8} sm={11} xs={11} className="mb-3">
                  <Form>
                    <Card body>
                      <h3>Request a promotion</h3>
                      <br></br>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>
                          Your Name
                        </Label>
                        <Col sm={inputfieldwidth}>
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder=""
                            value={this.state.name}
                            onChange={e =>
                              this.setState({ name: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>
                          Your Email
                        </Label>
                        <Col sm={inputfieldwidth}>
                          <Input
                            type="url"
                            name="name"
                            id="name"
                            placeholder=""
                            value={this.state.email}
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>
                          Project Name
                        </Label>
                        <Col sm={inputfieldwidth}>
                          <Input
                            type="url"
                            name="name"
                            id="name"
                            placeholder=""
                            value={this.state.projectname}
                            onChange={e =>
                              this.setState({ projectname: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="name" sm={inputnamewidth}>
                          Promotion Package
                        </Label>
                        <Col sm={inputfieldwidth}>
                          <Input
                            type="select"
                            name="select"
                            onChange={e =>
                              this.setState({ package: e.target.value })
                            }
                            value={this.state.package}
                          >
                            <option></option>
                            <option>Package 1</option>
                            <option>Package 2</option>
                            <option>Package 3</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Card>
                    {this.state.showMandatory && (
                      <p style={{ color: 'red' }}>All fields are mandatory.</p>
                    )}
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

            </Col>
          </Page>
        )}
      </div>
    );
  }
}
export default withRouter(PromoteAppPage);
