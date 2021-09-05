import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { baseUrl, passwordReset } from '../assets/services';
import { Link, Redirect } from "react-router-dom";
import { setUserSession, removeUserSession } from 'utils/Common.js';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      redirect: false,
      redirectDashoard: false,
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      modal_text: "",
      loading: false,
      acceptedTerms: false
    };
  }

  componentDidMount() {
    removeUserSession();
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

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  setRedirectDashboard = () => {
    this.setState({
      redirectDashoard: true
    })
  }


  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = async event => {


    this.setState({
      modal_text: "Thankyou for your request please check your email account for further instructions.", modal: true
    });

    this.requestResetPassword();

  };



  async requestResetPassword() {

    var email = this.state.email;


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        //password: password
      })
    };
    var response = await fetch(baseUrl + passwordReset, requestOptions);
    var data = await response.json();
    return data;
  }





  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle()}
        >
          <ModalHeader toggle={this.toggle()}></ModalHeader>
          <ModalBody>
            <Row>
              <p>{this.state.modal_text}</p>
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

        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 120, height: 120, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
            <h1>Password Reset</h1>
          </div>
        )}

        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
        </FormGroup>

        <hr />
        {this.state.loading ? <CircleLoader loading={this.state.loading} css={override} size={100} />
          :
          <div>
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={this.handleSubmit}>
              Submit
            </Button>
            <br></br>
          </div>
        }


        <Row>
          <a href="/">
            Exit
          </a>
        </Row>


        {children}
      </Form>

    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

ResetPassword.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

ResetPassword.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => { },
};

export default ResetPassword;
