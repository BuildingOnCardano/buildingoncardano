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
  Table,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { baseUrl, getProjectsByType } from '../assets/services';
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

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      loading: true,
      totalProjects: null,
      projectTypesAndCount: [],
      smallScreen: false,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (width < 600) {
      this.setState({ smallScreen: true });
    }


    if(this.state.projects == null){
      await this.getProjectsByType();
    }
  }

  async getProjectsByType() {
    try {
      var response = await fetch(
        baseUrl + getProjectsByType + this.props.params.projectType,
      );
      const data = await response.json();

      this.setState({ projects: data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Page
        className="ProjectsPage"
        breadcrumbs={[{ name: `${this.props.params.projectType} Projects`, active: true }]}
      >
        <Row>
          {this.state.loading ? (
            <div>
              <CircleLoader
                loading={this.state.loading}
                css={override}
                size={100}
              />
            </div>
          ) : (
            this.state.projects.map(function (item, index) {
              return (
                <Col lg={3} md={10} sm={10} xs={12} className="mb-3">
                  <div className="ProjectCards">
                    <ProjectCard img={item.imageUrl} projectDetails={item} />
                  </div>
                </Col>
              );
            })
          )}
        </Row>
      </Page>
    );
  }
}
export default withRouter(ProjectsPage);
