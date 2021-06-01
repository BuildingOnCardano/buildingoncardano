import Page from 'components/Page';
import ProjectCard from 'components/ProjectCard';
import React from 'react';
import {
  Col,
  Row,
  Button
} from 'reactstrap';
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import { baseUrl, getProjectByOwner } from '../assets/services';
import { getUser, getPassword } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class MyProjectsPage extends React.Component {
  state = {
    projects: [],
    loading: true
  };

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    if (!isEmpty(getUser())) {
      this.getProjectsByType();
    }
  }

  async getProjectsByType() {
    try {
      var response = await fetch(baseUrl + getProjectByOwner + getUser(), {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'password': getPassword()
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const data = await response.json();
      this.setState({ projects: data, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {


    return (
      <Page
        className="MyProjectsPage"
        title=""
        breadcrumbs={[{ name: 'My Projects /', active: true }]}
      >

        <BeatLoader loading={this.state.loading} css={override} size={180} />
        {this.state.projects != null ?
          <Row>
            {
              this.state.projects.map(function (item, index) {
                return (
                  <Col lg={3} md={10} sm={10} xs={12} className="mb-3">
                    <ProjectCard
                      img={item.imageUrl}
                      projectDetails={item}
                      myprojectspage={true} />
                  </Col>
                )
              })
            }
          </Row>
          :
          <p>You currently have no projects added.</p>
        }



      </Page >
    );
  }
}
export default MyProjectsPage;
