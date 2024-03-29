import Page from 'components/Page';
import React from 'react';
import { Col, Button, Card, CardHeader, CardBody, Row } from 'reactstrap';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { baseUrl, getAllProjectsWithTypes } from '../assets/services';
import '../styles/styles.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';

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

const width = window.innerWidth;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Toolbox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: calc(100vw - 60px);
  margin-bottom: 10px;
  button {
    margin-left: 10px;
    width: 2em;
  }
`;

class Ecosystem extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false,
    searched: '',
    filterAbleProjects: null,
    barChartData: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    this.getAllProjects();
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjectsWithTypes);
      const data = await response.json();
      console.log(data);

      // for (let typeIndex = 0; typeIndex < data.length; typeIndex++) {
      //   for (let index = 0; index < data[typeIndex].projects.length; index++) {
      //     data[typeIndex].projects[index].name = data[typeIndex].projects[index].name.replace(" ", "\n");
      //   }
      // }

      this.setState({ projects: data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Page
        className="Ecosystem"
        breadcrumbs={[{ name: 'Ecosystem', active: true }]}
      >
        {this.state.loading ? (
          <div>
            <CircleLoader
              loading={this.state.loading}
              css={override}
              size={100}
            />
          </div>
        ) : (
          <Row>
            {this.state.projects.map(function (item, index) {
              return (
                <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                  <Card>
                    <Button
                      size="s"
                      color="secondary"
                    >
                      <h6 style={{ color: '#fff' }}>
                        {item.project_maintype}
                      </h6>
                    </Button>

                    <CardBody>
                      <Row>
                        {item.projects.map(project => {
                          return (
                            <Link to={'/projectdetails/' + project.name}>
                              <Row>

                                <div
                                 style={{
                                      marginRight: '1px',
                                      marginLeft: '20px',
                                      marginBottom: '20px'
                                    }}>
                                  {project.imageUrlBase64 == null ?

                                    // <img
                                    //   style={{
                                    //     height: '40px',
                                    //     width: '40px',
                                    //     marginRight: '1px',
                                    //     marginLeft: '20px',
                                    //     marginBottom: '20px'
                                    //   }}
                                    //   src={project.imageUrlBase64}

                                    // />

                                    <ReactImageFallback
                                      src={project.imageUrl}
                                      width="40"
                                      height="40"
                                      fallbackImage={CardanoImage}
                                    />

                                    :
                                    <ReactImageFallback
                                      src={project.imageUrlBase64}
                                      width="40"
                                      height="40"
                                      fallbackImage={CardanoImage}
                                    />
                                  }
                                </div>
                                <h5 style={{ color: '#000', marginRight: '20px' }}>
                                  {project.name}
                                </h5>

                                &nbsp;
                              </Row>
                            </Link>

                          );
                        })}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}

            {/* </Col> */}
          </Row>
        )}
      </Page>
    );
  }
}
export default withRouter(Ecosystem);
