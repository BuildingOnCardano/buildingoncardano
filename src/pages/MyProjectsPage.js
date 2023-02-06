import Page from 'components/Page';
import ProjectCard from 'components/ProjectCard';
import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { baseUrl, getProjectByOwner } from '../assets/services';
import { getUser, getPassword, getIsLoggedIn } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

class MyProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      loading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (getIsLoggedIn === 'true') {
    if (!isEmpty(getUser())) {
      this.getProjectByOwner();
    }}
  }

  async getProjectByOwner() {
    try {
      var response = await fetch(baseUrl + getProjectByOwner + getUser(), {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          password: getPassword(),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const data = await response.json();
      this.setState({ projects: data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Page
        className="MyProjectsPage"
        breadcrumbs={[{ name: 'My Projects', active: true }]}
      >

        <Col lg={12} md={12} sm={12} xs={12} className="mb-3"
        >
          <Row style={{
            justifyContent: 'right',
            alignItems: 'right',
            textAlign: 'center',
          }}>
            <Link to={'/addproject'}
            >
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
              >
                Add New Project
              </Button>

            </Link>
          </Row>
        </Col>


        <CircleLoader loading={this.state.loading} css={override} size={100} />
        {this.state.projects != null ? (
          <Row>
            {this.state.projects.map(function (item, index) {
              return (
                <Col lg={2} md={6} sm={10} xs={12} className="mb-3">
                  <ProjectCard
                    img={item.imageUrlBase64}
                    projectDetails={item}
                    myprojectspage={true}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>You currently have no projects added.</p>
        )}
      </Page>
    );
  }
}
export default withRouter(MyProjectsPage);
