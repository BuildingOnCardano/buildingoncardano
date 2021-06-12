import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import ProjectCard from 'components/ProjectCard';
import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table
} from 'reactstrap';
import { getColor } from 'utils/colors';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, getProjectsByType } from '../assets/services';
import SocialMedia from '../components/SocialMedia';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class ProjectsPage extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false

  };

  componentDidMount() {
    this.getProjectsByType();
  }

  async getProjectsByType() {
    try {
      var response = await fetch(baseUrl + getProjectsByType + this.props.projectType);
      const data = await response.json();

      this.setState({ projects: data, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {


    return (
      
      <Page
        className="ProjectsPage"
        title=""
        breadcrumbs={[{ name: 'Projects /' + this.props.projectType, active: true }]}
      >


        <Row>

            {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
              :

              this.state.projects.map(function (item, index) {
                return (
                  <Col lg={3} md={10} sm={10} xs={12} className="mb-3">
                  <div className='ProjectCards'>
                    <ProjectCard
                      img={item.imageUrl}
                      projectDetails={item} />
                  </div>
                  </Col>
                )

              })
            }
         
        </Row>

      </Page >
    );
  }
}
export default ProjectsPage;
