import ResetPassword, { STATE_LOGIN } from 'components/ResetPassword';
import React from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Icon,
} from 'reactstrap';
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

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
    };
  }

  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  componentDidMount() { }

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
        }}
      >
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle()}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle()}></ModalHeader>

          <ModalBody>
            <h3>Email verification</h3>
            <Row>
              {this.state.verifysuccess ? (
                <p>Success - you can now login.</p>
              ) : (
                <div>
                  <p>
                    There was an issue with your email verification can you
                    contact buildingoncardano@gmail.com
                  </p>
                </div>
              )}
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
          <Card body>
            <ResetPassword
              authState={this.props.params.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(ResetPasswordPage);
