import Page from 'components/Page';
import React from 'react';
import {
  Col,
  CardGroup,
  Card,
  CardHeader,
  CardBody,
  Row
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, getAllProjectsWithTypes } from '../assets/services';
import "../styles/styles.css";
import { Link } from 'react-router-dom';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import sidebarBgImage from 'assets/img/sidebar/rsz_1sidebar-4.jpg';
import styled from "styled-components";

import CardanoImage from 'assets/img/cardanoIcon.png';

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
    searched: "",
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
      this.setState({ projects: data, loading: false });
    } catch (error) {
      console.log(error)
    }
  }








  render() {

    return (
      <Page
        className="AllProjects"
      // title="Projects BuildingOnCardano"
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
          :
          <Row>
            {/* <Col lg={12} md={12} sm={12} xs={12} className="mb-3"> */}

              {this.state.projects.map(function (item, index) {
                return (
                  <Col lg={2} md={12} sm={12} xs={12} className="mb-3">
                    <Card>
                      <CardHeader style={{ color: "#225cb6" }}>{item.project_maintype}</CardHeader>
                      <CardBody>
                        <div >                          
                          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                            <Row style={{ paddingBottom: '5px' }}>
                              {item.projects.map((project) => {
                                return (
                                  <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                                    <Link to={{ pathname: '/projectdetails/' + project.name }}>
                                      <Row>{project.imageUrl != null && project.imageUrl != '' &&
                                        <img style={{ height: '25px', width: '25px', marginRight: '10px' }} src={project.imageUrl} />}
                                        <small>{project.name}</small>
                                      </Row>
                                    </Link>
                                  </Col>
                                )
                              })}
                            </Row>
                          </Col>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })}


            {/* </Col> */}
          </Row>
        }
      </Page>
    );
  }
}
export default Ecosystem;
