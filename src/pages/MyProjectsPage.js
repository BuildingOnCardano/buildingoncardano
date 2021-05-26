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

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getProjectsByType();
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
      console.log(data);

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
        <Row>
          {this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
            :
            this.state.projects.map(function (item, index) {
              return (
                <Col lg={3} md={4} sm={6} xs={6} className="mb-3">
                  <ProjectCard
                    img={item.imageUrl}
                    projectDetails={item}
                    myprojectspage={true} />

                </Col>
              )

            })
          }


        </Row>

      </Page >
    );
  }
}
export default MyProjectsPage;
