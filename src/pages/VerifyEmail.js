import Page from 'components/Page';
import React from 'react';



class VerifyEmail extends React.Component {
  state = {
  };

  componentDidMount() {

  }



  render() {


    return (

      <Page
        className="VerifyEmail"
        title=""

      >

        <h3>Email address verified!</h3>
        <a href="/">
          Homepage
        </a>

      </Page >
    );
  }
}
export default VerifyEmail;
