import Page from 'components/Page';
import React from 'react';
import { baseUrl, verifyuser } from '../assets/services';
import { isEmpty } from 'utils/stringutil.js';
import { Row } from 'reactstrap';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
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

class VerifyEmail extends React.Component {
  state = {
    verifysuccess: false,
    loading: true,
  };

  componentDidMount() {
    try {
      if (!isEmpty(this.props.params.verifycode)) {
        this.handleCodeVerify(this.props.params.verifycode);
      }
    } catch (error) { }
  }

  async handleCodeVerify(code) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        verificationCode: code,
      }),
    };
    var response = await fetch(baseUrl + verifyuser, requestOptions);
    var data = await response.json();

    if (data.response == 'user_verified') {
      this.setState({ verifysuccess: true, loading: false });
    } else {
      this.setState({ verifysuccess: false, loading: false });
    }
  }

  render() {
    return (
      <Page className="VerifyEmail" title="">
        <Row>
          {this.state.loading ? (
            <div>
              <CircleLoader
                loading={this.state.loading}
                css={override}
                size={100}
              />
            </div>
          ) : this.state.verifysuccess ? (
            <div>
              {' '}
              <h3>Email address verified!</h3>
              <a href="/">Homepage</a>
            </div>
          ) : (
            <div>
              <p>
                There was an issue with your email verification can you contact
                buildingoncardano@gmail.com
              </p>
            </div>
          )}
        </Row>
      </Page>
    );
  }
}
export default withRouter(VerifyEmail);
