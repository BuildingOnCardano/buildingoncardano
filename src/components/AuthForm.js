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
import { baseUrl, registration, login } from '../assets/services';
import { Link, Redirect } from "react-router-dom";
import { setUserSession, removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class AuthForm extends React.Component {
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
  renderRedirectToLogin = () => {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/login' }} />
    }
  }

  renderRedirectToDashboard = () => {
    if (this.state.redirectDashoard) {
      localStorage.setItem('user', this.state.email);
      return <Redirect to={{ pathname: '/', state: { loggedIn: 'loggedIn' } }} />;
    }
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = async event => {

    if (isEmpty(this.state.email)) {
      this.setState({
        modal_text: "Enter your email address!", modal: true
      });
    } else {
      this.setState({
        loading: true
      });
      event.preventDefault();
      var authState = this.props.authState;
      var password = this.state.password;
      if (authState == 'SIGNUP') {
        var confirmPassword = this.state.confirmPassword;
        if (password == confirmPassword) {
          var status = await this.register();

          if (status.response == 'user_exists') {
            this.setState({
              modal_text: "User already exists.", modal: true
            });
          }
          else {
            this.setState({
              modal_text: "Registration submitted please check your email inbox/junk folder for a verification mail.", modal: true
            });
            //  this.setRedirect();

          }
        } else {

          this.setState({
            modal_text: "Passwords dont match.", modal: true
          });
        }
      } else {
        //login
        var status = await this.login();

        if (status.response == 'valid_user') {
          setUserSession(this.state.email, this.state.password);
          this.setRedirectDashboard();
        }
        else if (status.response == 'user doesnt exist') {
          this.setState({
            modal_text: "User doesnt exist.", modal: true
          });
        }
        else if (status.response == 'email_not_verified') {
          this.setState({
            modal_text: "Email address not verified check your email inbox.", modal: true
          });
        }
        else {
          this.setState({
            modal_text: "Incorrect password.", modal: true
          });
        }
      }
      this.setState({
        loading: false
      });
    }
  };

  async register() {
    var authState = this.props.authState;
    var email = this.state.email;
    var password = this.state.password;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    var response = await fetch(baseUrl + registration, requestOptions);
    var data = await response.json();
    return data;
  }

  async login() {
    var email = this.state.email;
    var password = this.state.password;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    var response = await fetch(baseUrl + login, requestOptions);
    var data = await response.json();
    return data;
  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  handleChange = (query) => (e) => {
    if (this.state.acceptedTerms) {
      this.setState({
        acceptedTerms: false
      });
    } else {
      this.setState({
        acceptedTerms: true
      });
    }
  }


  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderRedirectToLogin()}
        {this.renderRedirectToDashboard()}

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

            <Button color="secondary" onClick={this.toggle()}>
              Close
            </Button>

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
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} onChange={e => this.setState({ confirmPassword: e.target.value })} value={this.state.confirmPassword} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input
              style={{ fontSize: 14 }}
              type="checkbox"
              onChange={this.handleChange("&ticker=")}

            />{' '}
            {this.isSignup ? <Link to={{ pathname: '/termsandpolicy' }}>Agree the terms and policy</Link> : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        {this.state.loading ? <CircleLoader loading={this.state.loading} css={override} size={100} />
          :

          this.isSignup ?
            <Button
              disabled={!this.state.acceptedTerms}
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={this.handleSubmit}>
              {this.renderButtonText()}

            </Button>

            :
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={this.handleSubmit}>
              {this.renderButtonText()}

            </Button>
        }

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>

            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>

        </div>
        <Row>
          <Link to={{ pathname: '/resetpassword' }}>
            Reset Password</Link>
        </Row>
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

AuthForm.propTypes = {
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

AuthForm.defaultProps = {
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

export default AuthForm;
