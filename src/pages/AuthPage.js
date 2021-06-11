import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import {
  Button,
  Card, Col, Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Icon
} from 'reactstrap';
import { baseUrl, verifyuser } from '../assets/services';
import { isEmpty } from 'utils/stringutil.js';
import {
  MdDashboard
} from 'react-icons/md';

class AuthPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
 
      verifysuccess: false,
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false
    };
  }



  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };


  componentDidMount() {
    try {
      if (!isEmpty(this.props.match.params.verifycode)) {
        this.handleCodeVerify(this.props.match.params.verifycode);
      }
    } catch (error) {

    }
  }

  async handleCodeVerify(code) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        verificationCode: code
      })
    };
    var response = await fetch(baseUrl + verifyuser, requestOptions);
    var data = await response.json();

    if (data.response == "user_verified") {
      this.setState({ modal: true, verifysuccess: true });
    }else{
      this.setState({ modal: true, verifysuccess: false });
    }
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

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle()}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle()}></ModalHeader>

          <ModalBody>
            <h3>Email verification</h3>
            <Row>
              {this.state.verifysuccess ? <p>Success - you can now login.</p>
                : <div>
                  <p>There was an issue with your email verification can you contact buildingoncardano@gmail.com</p>
                </div>}
            </Row>

          </ModalBody>
          <ModalFooter>
            {' '}
            <Button color="secondary" onClick={this.toggle()}>
              Close
                    </Button>
          </ModalFooter>
        </Modal>


        <Col md={6} lg={4}>
        {/* <Icon className={MdDashboard} /> */}
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
