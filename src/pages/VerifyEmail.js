import Page from 'components/Page';
import React from 'react';



class VerifyEmail extends React.Component {
  state = {
    verifysuccess: false
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
      this.setState({verifysuccess: true });
    } else {
      this.setState({verifysuccess: false });
    }
  }

  render() {


    return (

      <Page
        className="VerifyEmail"
        title=""

      >

        <Row>
          {this.state.verifysuccess ? <div> <h3>Email address verified!</h3>
            <a href="/">
              Homepage
        </a></div>
            : <div>
              <p>There was an issue with your email verification can you contact buildingoncardano@gmail.com</p>
            </div>}
        </Row>
      </Page >
    );
  }
}
export default VerifyEmail;
