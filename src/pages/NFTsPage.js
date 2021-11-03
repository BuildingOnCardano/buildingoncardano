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
import SocialMedia from '../components/SocialMedia';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import FeaturedProjectCard from 'components/FeaturedProjectCard';//RecentlyAddedProjectCard

import { baseUrl, getFeaturedProjectsList } from '../assets/services';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class NFTsPage extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false,
    featuredProjects: null,

  };

  async componentDidMount() {
    await this.getNFTData();


  }

  async getNFTData() {
    try {
      var response = await fetch(baseUrl + getFeaturedProjectsList);
      const getFeaturedProjects = await response.json();
      this.setState({ featuredProjects: getFeaturedProjects });

      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {


    return (

      <Page
        className="AllProjects"
        title="NFTs"
      >


        <Col>

          {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
            :

            <div>
              {this.state.featuredProjects != null && this.state.featuredProjects.length != 0 &&
                <Row style={{ padding: 0, marginBottom: 0, }}>
                  <Col>
                    <h4 className="mb-0">Featured</h4>
                  </Col>                
                </Row>}
              <Row>
                {this.state.featuredProjects.map(function (item, index) {
                  if (index < 4) {
                    return (
                      <Col lg={6} md={10} sm={10} xs={12} className="mb-3">
                        <div className='ProjectCards'>
                          <FeaturedProjectCard
                            img={item.imageUrl}
                            projectDetails={item} />
                        </div>
                      </Col>
                    )
                  }
                })}
              </Row>

            </div>

          }

        </Col>

      </Page >
    );
  }
}
export default NFTsPage;
